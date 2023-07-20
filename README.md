# cosmic-ray-detector

![collage of cosmic rays](title.png)

Use your DSLR to detect cosmic rays! [Read about it here](https://blog.bithole.dev/blogposts/cosmic-ray/)

This repo is a very messy, there's a lot of ad hoc junk. Please don't hesitate to reach out if you have any questions, you can find my contacts [here](https://bithole.dev/).

Procedure:
- Place all your raw images in some directory.
- Convert the images to PGM using [dcraw](https://www.dechifro.org/dcraw/), using `dcraw -4 -D ...`
- Create an output directory, the scripts will save some temporary files and the analysis data here.
- Set up `config.json`. I included the config.json that I used in the repo as an example, you can just copy this and replace the paths with your own.
- Run `first-pass.js`, then `analyze.js`. This will identify anomalous pixels, cluster them, and produce a .CSV output.
- You can render the cosmic rays using `extract-clusters.js`. Make sure to create a `clusters` folder in the output directory first.

My code depends on the [sharp](https://sharp.pixelplumbing.com/) module for image output, which can be installed by running `npm install` from anywhere in the repo.

The colormap used for plotting is taken from [ehtplot](https://github.com/liamedeiros/ehtplot). It's the same one that the EHT's first black hole picture used :-)