// extract and render clusters into dark frame corrected images
const anomalies = require("./output/anomalies.json"),
      clusters = require("./output/clusters.json")
        .filter(cluster => cluster.length > 4)
        .map(cluster => cluster.map(idx => anomalies[idx]));

const colormap = require("./util/colormap");
const files = require("./util/files");
const pgm = require("./util/pgm");
const sharp = require("sharp");
const fs = require("fs");

const SIZE = 50,
      REALSIZE = SIZE*2 + 1;

const GAMMA = 0.8;

const sums = new Float64Array(fs.readFileSync("output/sums.bin").buffer);

// group clusters by file
const clustersByFile = {};
for(const cluster of clusters) {
    const file = cluster[0].file;
    if(!clustersByFile[file]) clustersByFile[file] = [];
    clustersByFile[file].push(cluster);
}

const values = new Array(REALSIZE * REALSIZE);

for(const file in clustersByFile) {
    
    console.log(file);

    // extract name
    const filename = file.split("\\").pop(); // <---- YOU MAY WANT TO CHANGE THIS TO FORWARD SLASH 
    const image = pgm({path: file});

    for(let i = 0; i < clustersByFile[file].length; i++) {
    
        const cluster = clustersByFile[file][i];

        // compute centroid
        const centerX = Math.round(cluster.reduce((a,c) => a + c.x, 0) / cluster.length),
              centerY = Math.round(cluster.reduce((a,c) => a + c.y, 0) / cluster.length);
    
        // find min and max
        let min = Infinity, max = -Infinity;
        for(let x = centerX - SIZE; x <= centerX + SIZE; x++) {
            for(let y = centerY - SIZE; y <= centerY + SIZE; y++) {
                if(x >= 0 && y >= 0 && x < image.width && y < image.height) {
                    const original = image.getPixel(x, y);
                    const mean = (sums[y*image.width+x] - original) / (files.length - 1);
                    const value = original - mean;
                    if(value < min) min = value;
                    if(value > max) max = value;
                    values[(y - centerY + SIZE) * REALSIZE + (x - centerX + SIZE)] = value;
                }
            }
        }

        min = -20, max = 600; // <---- IF YOU DON'T WANT TO  MANUALLY TUNE THIS YOU CAN REMOVE THIS LINE

        const pixels = Buffer.alloc(REALSIZE*REALSIZE*3);
        for(let x = 0; x < REALSIZE; x++) {
            for(let y = 0; y < REALSIZE; y++) {
                const idx = (y * REALSIZE + x)*3;
                const imgX = centerX + x - SIZE,
                      imgY = centerY + y - SIZE;
                if(imgX >= 0 && imgY >= 0 && imgX < image.width && imgY < image.height) {
                    let val = (values[y * REALSIZE + x] - min) / (max - min);
                    val = Math.min(1, Math.max(0, val));
                    val = Math.pow(val, GAMMA);
                    const [r, g, b] = colormap.map(val, colormap.AFMHOT_10US);
                    pixels[idx] = r * 255;
                    pixels[idx + 1] = g * 255;
                    pixels[idx + 2] = b * 255;
                } else {
                    pixels[idx] = 0;
                    pixels[idx + 1] = 0;
                    pixels[idx + 2] = 0;
                }
            }
        }

        // rescale and write
        sharp(pixels, {raw: {width: REALSIZE, height: REALSIZE, channels: 3}})
            .resize(REALSIZE*3, REALSIZE*3, {kernel: sharp.kernel.nearest})
            .toFile(`output/clusters/${cluster.length}.${filename}.${i}.png`);

    }

}