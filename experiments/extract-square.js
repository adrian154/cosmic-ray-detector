// read value of one pixel in every frame for demo purposes
const pgm = require("../util/pgm");
//const file = "H:\\cosmic-ray-data\\_DSC3766.pgm";
const file = "H:\\cosmic-ray-data\\20-Jul-2023\\_DSC3460.pgm";

const values = [];

const image = pgm({path: file});
for(let x = 1000; x < 1100; x++) {
    for(let y = 1000; y < 1100; y++) {
        values.push(image.getPixel(x, y));
    }
}

console.log(JSON.stringify(values));