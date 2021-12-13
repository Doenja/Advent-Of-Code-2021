import { readFileSync } from "fs";

export function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8");
    return fileContent.split("\n").map(Number);
}

export function getIncreases(datapoints: number[]) {
    let increases = 0;
    datapoints.forEach((datapoint, i) => {
        if (i > 0 && datapoint > datapoints[i - 1]) {
            increases++;
        }
    });

    return increases;
}

export function part1(file: string) {
    const input = getInput(file);
    return getIncreases(input);
}
