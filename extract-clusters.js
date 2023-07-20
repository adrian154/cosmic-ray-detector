// extract and render clusters into dark frame corrected images
const colormap = require("./util/colormap");
const config = require("./config.json");
const files = require("./util/files");
const pgm = require("./util/pgm");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const anomalies = require(path.join(config.outputDir, "anomalies.json")),
      clusters = require(path.join(config.outputDir, "clusters.json"));


const chosenClusters = clusters
    .filter(cluster => cluster.length > 4)
    .map(cluster => {
        const converted = cluster.map(idx => anomalies[idx]);
        converted.id = clusters.indexOf(cluster);
        return converted;
    });

const SIZE = 50,
      REALSIZE = SIZE*2 + 1;

const GAMMA = 0.7;

const sums = new Float64Array(fs.readFileSync(path.join(config.outputDir, "sums.bin")).buffer);

// group clusters by file
const clustersByFile = {};
for(const cluster of chosenClusters) {
    const file = cluster[0].file;
    if(!clustersByFile[file]) clustersByFile[file] = [];
    clustersByFile[file].push(cluster);
}

const values = new Array(REALSIZE * REALSIZE);

for(const file in clustersByFile) {

    // extract name
    const filename = path.basename(file);
    const image = pgm({path: file});

    for(const cluster of clustersByFile[file]) {

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

        min = -20, max = 500; // <---- IF YOU DON'T WANT TO  MANUALLY TUNE THIS YOU CAN REMOVE THIS LINE

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
            .toFile(path.join(config.outputDir, "clusters", `${cluster.length}.${filename}.${cluster.id}.png`));

    }

}