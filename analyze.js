const config = require("./config.json");
const files = require("./util/files");
const pgm = require("./util/pgm");
const fs = require("fs");

const sums = new Float64Array(fs.readFileSync("output/sums.bin")),
      sumSquareDiffs = new Float64Array(fs.readFileSync("output/sumSquareDiffs.bin"));

const allAnomalies = [];
const allClusters = [];

// check an anomaly for neighboring anomalies
const search = (anomaly, anomalies, cluster) => {

    anomaly.cluster = cluster;
    cluster.push(anomaly);

    for(const other of anomalies) {
        if(other.cluster) continue;
        if((other.x - anomaly.x)**2 + (other.y - anomaly.y)**2 < config.clusteringRadius**2) {
            search(other, anomalies, cluster);
        }
    }

};

const findClusters = anomalies => {
    const clusters = [];
    for(const anomaly of anomalies) {

        // if the anomaly is already labeled, skip it
        if(anomaly.cluster) continue;

        const cluster = [];
        search(anomaly, anomalies, cluster);
        if(cluster.length > 1) {
            clusters.push(cluster);
        }

    }
    return clusters;
};

for(const file of files) {
    
    console.log(file);

    const image = pgm({path: file});
    const anomalies = [];

    for(let i = 0; i < image.pixels.length; i++) {
        
        const sum = sums[i], sumSquareDiff = sumSquareDiffs[i];
        const value = image.pixels[i];

        // compute sample statistics, excluding contribution of this sample
        const mean = (sum - value) / (files.length - 1);
        const stddev = Math.sqrt((sumSquareDiff - (value - sum / files.length)**2) / (files.length - 2));
        const z = (value - mean) / stddev;

        // anomaly detected!
        if(Math.abs(z) > config.confidenceLevel) {
            anomalies.push({
                file,
                x: i % config.width,
                y: Math.floor(i / config.width),
                z,
                stddev,
                value: value - mean
            });
        }

    }

    allAnomalies.push(...anomalies);
    allClusters.push(...findClusters(anomalies));

}

fs.writeFileSync("output/anomalies.json", JSON.stringify(anomalies));
fs.writeFileSync("output/clusters.json", JSON.stringify(clusters.map(anomaly => anomalies.indexOf(anomaly))));

// write anomalies to CSV for easy viewing
fs.writeFileSync("output/anomalies.csv", "file,x,y,z,stddev,value,cluster\n" + anomalies.map(a => `${a.file},${a.x},${a.y},${a.z},${a.stddev},${a.value},${a.cluster ? clusters.indexOf(a.cluster) : ""}\n`))