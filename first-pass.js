const config = require("./config.json");
const files = require("./util/files");
const pgm = require("./util/pgm");
const path = require("path");
const fs = require("fs");

const sum = new Float64Array(config.width * config.height),
      sumSquareDiffs = new Float64Array(config.width * config.height);

console.log("computing sums...");

for(const file of files) {
    const image = pgm({path: file});
    console.log(file);
    for(let i = 0; i < image.pixels.length; i++) {
        sum[i] += image.pixels[i];
    }
}

console.log("computing squared differences...")

for(const file of files) {
    const image = pgm({path: file});
    console.log(file);
    for(let i = 0; i < image.pixels.length; i++) {
        sumSquareDiffs[i] += (image.pixels[i] - sum[i] / files.length)**2;
    }
}

fs.writeFileSync(path.join(config.outputDir, "sums.bin"), sum);
fs.writeFileSync(path.join(config.outputDir, "sumSquareDiffs.bin"), sumSquareDiffs);