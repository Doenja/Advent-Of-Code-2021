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

export function getVectors(input: number[][][]) {
    return input.map((row) => ({
        origin: row[0],
        end: row[1],
        vector: [row[1][0] - row[0][0], row[1][1] - row[0][1]],
    }));
}
export function getDangerous(
    vectors: {
        origin: number[];
        end: number[];
        vector: number[];
    }[],
) {
    let dangerous = 0;

    vectors.forEach((vector) => {
        console.log(vector);

        dangerous = 1;
    });
    return dangerous;
}

export function part1(file: string) {
    // Parse string to number arrays
    const input = getInput(file);

    // Filter out all lines that are diagonal
    const filtered = filterInput(input);

    const vectors = getVectors(filtered);

    // Loop over the points and create an object
    // that counts the occurance of every point
    // Count all the points that occur more than once
    return getDangerous(vectors);
}
