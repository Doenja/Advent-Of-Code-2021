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

export function getDangerous(input: number[][][]) {
    let overlap: { [x: number]: number[] } = [];
    let dangerous = 0;

    input.forEach((vent) => {
        const x1 = vent[0][0];
        const x2 = vent[1][0];
        const y1 = vent[0][1];
        const y2 = vent[1][1];

        if (x2 > x1) {
            for (let x = x1; x < x2 + 1; x++) {
                if (overlap[x] && overlap[x].filter((yVal) => yVal === y1).length === 1) {
                    dangerous++;
                }

                if (overlap[x]) {
                    overlap[x].push(y1);
                } else {
                    overlap = { ...overlap, [x]: [y1] };
                }
            }
        }
        if (x1 > x2) {
            for (let x = x1; x > x2 - 1; x--) {
                if (overlap[x] && overlap[x].filter((yVal) => yVal === y1).length === 1) {
                    dangerous++;
                }
                if (overlap[x]) {
                    overlap[x].push(y1);
                } else {
                    overlap = { ...overlap, [x]: [y1] };
                }
            }
        }
        if (y2 > y1) {
            for (let y = y1; y < y2 + 1; y++) {
                if (overlap[x1] && overlap[x1].filter((yVal) => yVal === y).length === 1) {
                    dangerous++;
                }
                if (overlap[x1]) {
                    overlap[x1].push(y);
                } else {
                    overlap = { ...overlap, [x1]: [y] };
                }
            }
        }
        if (y1 > y2) {
            for (let y = y1; y > y2 - 1; y--) {
                if (overlap[x1] && overlap[x1].filter((yVal) => yVal === y).length === 1) {
                    dangerous++;
                }
                if (overlap[x1]) {
                    overlap[x1].push(y);
                } else {
                    overlap = { ...overlap, [x1]: [y] };
                }
            }
        }
    });

    return dangerous;
}

export function part1(file: string) {
    // Parse string to number arrays
    const input = getInput(file);

    // Filter out all lines that are diagonal
    const filtered = filterInput(input);

    // Loop over the points and create an object
    // that counts the occurance of every point
    // Count all the points that occur more than once
    return getDangerous(filtered);
}
