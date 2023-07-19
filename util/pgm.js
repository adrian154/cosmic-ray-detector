// extremely bad ad-hoc pgm parser 
// ONLY SUPPORTS 16-BIT PGMs!!
const fs = require("fs");

module.exports = options => {

    let width, height, pixels;

    if(options.path) {

        const data = fs.readFileSync(options.path);
        let offset = 0;

        const readLine = () => {
            for(let i = offset; i < data.length; i++) {
                if(data[i] == 0xA) {
                    const result = data.subarray(offset, i);
                    offset = i + 1;
                    return result.toString("utf-8");
                }
            }
            throw new Error("Unexpectedly reached end of file");
        };

        if(readLine() != "P5") throw new Error("File isn't valid PGM");
        const dimensionsLine = readLine();
        if(dimensionsLine.includes(" ")) {
            [width, height] = dimensionsLine.split(" ").map(Number);
        } else {   
            width = Number(dimensionsLine);
            height = Number(readLine());
        }
        readLine(); // ignore max value line

        const pixelData = Buffer.from(data.subarray(offset));
        pixelData.swap16();
        pixels = new Uint16Array(pixelData.buffer, 0, pixelData.length / 2);
    
    } else {
        if(!options.width || !options.height) {
            throw new Error("missing parameters");
        }
        width = options.width;
        height = options.height;
        pixels = new Uint16Array(width * height);
    }

    return {
        width, 
        height, 
        pixels,
        getPixel: (x, y) => pixels[y * width + x],
        write: path => {
            const buf = Buffer.from(pixels.buffer);
            buf.swap16();
            const stream = fs.createWriteStream(path);
            stream.write(`P5\n${width} ${height}\n65536\n`);
            stream.write(buf);
            stream.close();
        }
    };

};