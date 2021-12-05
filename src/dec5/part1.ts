import { readFileSync } from "fs";

export function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").trim();
    const lines = fileContent.split("\n");

    return lines.map((string) => {
        const entry = string.split(" -> ");
        return entry.map((item) => item.split(",").map(Number));
    });
}

export function filterInput(input: number[][][]) {
    return input.filter((vent) => {
        return vent[0][0] === vent[1][0] || vent[0][1] === vent[1][1];
    });
}

export function fillPoints(input: number[][][]) {
    return input.map((vent) => {
        const x1 = vent[0][0];
        const x2 = vent[1][0];
        const y1 = vent[0][1];
        const y2 = vent[1][1];

        const deltaX = x2 - x1;
        const deltaY = y2 - y1;

        let xArr: string[] = [];
        let yArr: string[] = [];

        if (Math.abs(deltaX) > 0) {
            xArr = new Array(Math.abs(deltaX) + 1).fill(0).map((_, i) => {
                return `${deltaX > 0 ? x1 + i : x1 - i},${y1}`;
            });
        }
        if (Math.abs(deltaY) > 0) {
            yArr = new Array(Math.abs(deltaY) + 1).fill(0).map((_, i) => {
                return `${x1},${deltaY > 0 ? y1 + i : y1 - i}`;
            });
        }

        return xArr.length ? xArr : yArr;
    });
}

export function countOccurance(vectors: string[][]) {
    let occurance: { [key: string]: number } = {};
    let totalHighOccurance = 0;

    for (const vector of vectors) {
        for (const point of vector) {
            if (occurance[point]) {
                occurance[point]++;
                if (occurance[point] > 1) {
                    totalHighOccurance++;
                }
            } else {
                occurance = { ...occurance, [point]: 1 };
            }
        }
    }

    return totalHighOccurance;
}

export function part1(file: string) {
    // Parse string to number arrays
    const input = getInput(file);

    // Filter out all lines that are diagonal
    const filtered = filterInput(input);

    // Add the points that are in between
    const vectors = fillPoints(filtered);

    // Loop over the points and create an object
    // that counts the occurance of every point
    // Count all the points that occur more than once
    return countOccurance(vectors);
}
