// read value of one pixel in every frame for demo purposes
const pgm = require("../util/pgm");
const files = require("../util/files");

const values = [];

for(const file of files) {
    const image = pgm({path: file});
    values.push(image.getPixel(569, 2750));
}

console.log(JSON.stringify(values));