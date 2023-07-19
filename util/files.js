const config = require("../config.json");
const path = require("path");
const fs = require("fs");

module.exports = fs.readdirSync(config.dataDir).filter(file => file.match(/.pgm$/i)).map(file => path.join(config.dataDir, file));