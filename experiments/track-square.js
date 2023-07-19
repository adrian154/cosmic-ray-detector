// read value of one pixel in every frame for demo purposes
const pgm = require("../util/pgm");
const file = require("../util/files").pop();

const values = [];

const image = pgm({path: file});
for(let x = 1000; x < 1100; x++) {
    for(let y = 1000; y < 1100; y++) {
        values.push(image.getPixel(x, y));
    }
}

console.log(JSON.stringify(values));