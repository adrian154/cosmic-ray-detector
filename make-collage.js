// silly script to combine selected cosmic rays into collage
const sharp = require("sharp");
const fs = require("fs");

const files = fs.readdirSync("output/collage")
                .map(file => [file, Math.random()])
                .sort((a,b) => a - b)
                .map(pair => pair[0]);

const SIZE = 65,
      GRID_SIZE = 5,
      MARGIN = 2;

sharp({create: {
    width: (SIZE +  MARGIN) * GRID_SIZE + MARGIN,
    height: (SIZE +  MARGIN) * GRID_SIZE + MARGIN,
    channels: 3,
    background: "#000000"
}}).composite(files.map((name, i) => {
    const x = i % GRID_SIZE, y = Math.floor(i / GRID_SIZE);
    return {input: "output/collage/" + name, left: x * (SIZE+MARGIN) + MARGIN, top: y * (SIZE+MARGIN) + MARGIN}
})).toFile("output/collage.png");