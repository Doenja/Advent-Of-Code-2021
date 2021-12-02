import { readFileSync } from "fs";

function getMeasurements() {
    const fileContent = readFileSync("input/1.txt", "utf-8");
    const numberStrings = fileContent.split("\n");
    return numberStrings.map((string) => parseInt(string));
}

export const measurements = getMeasurements();

export function getIncreases(datapoints: number[]) {
    let increases = 0;
    datapoints.forEach((datapoint, i) => {
        if (i > 0 && datapoint > datapoints[i - 1]) {
            increases++;
        }
    });

    return increases;
}

export const part1 = getIncreases(measurements);
