// silly script to combine selected cosmic rays into collage
const config = require("./config.json");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// crude shuffle
const files = fs.readdirSync(path.join(config.outputDir, "collage"))
                .map(file => [file, Math.random()])
                .sort((a,b) => a[1] - b[1])
                .map(pair => pair[0]);

const TILE_SIZE = 303,
      GRID_SIZE = Math.ceil(Math.sqrt(files.length)),
      MARGIN = 10;

sharp({create: {
    width: (TILE_SIZE +  MARGIN) * GRID_SIZE + MARGIN,
    height: (TILE_SIZE +  MARGIN) * GRID_SIZE + MARGIN,
    channels: 3,
    background: "#000000"
}}).composite(files.map((name, i) => {
    const x = i % GRID_SIZE, y = Math.floor(i / GRID_SIZE);
    return {input: path.join(config.outputDir, "collage", name), left: x * (TILE_SIZE+MARGIN) + MARGIN, top: y * (TILE_SIZE+MARGIN) + MARGIN}
})).toFile(path.join(config.outputDir, "collage.png"));