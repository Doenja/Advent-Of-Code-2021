import { getInput } from "./part1";

export function getDangerous(input: number[][][]) {
    let overlap: { [x: number]: number[] } = [];
    let dangerous = 0;

    input.forEach((vent) => {
        const x1 = Math.min(vent[0][0], vent[1][0]);
        const x2 = Math.max(vent[0][0], vent[1][0]);
        const y1 = Math.min(vent[0][1], vent[1][1]);
        const y2 = Math.max(vent[0][1], vent[1][1]);

        if (x1 === x2) {
            //vertical line
            for (let y = y1; y < y2; y++) {
                const x = x1;
                if (overlap[x] && overlap[x].filter((yVal) => yVal === y1).length === 1) {
                    dangerous++;
                }
                overlap[x] ? overlap[x].push(y) : (overlap = { ...overlap, [x]: [y] });
            }
        } else if (y1 === y2) {
            // horizontal line
            for (let x = x1; x < x2; x++) {
                const y = y1;

                if (overlap[x] && overlap[x].filter((yVal) => yVal === y1).length === 1) {
                    dangerous++;
                }

                overlap[x] ? overlap[x].push(y) : (overlap = { ...overlap, [x]: [y] });
            }
        } else {
            // diagonal line
        }
    });

    return dangerous;
}

export function part2(file: string) {
    // Parse string to number arrays
    const input = getInput(file);

    // Loop over the points and create an object
    // that counts the occurance of every point
    // Count all the points that occur more than once
    return getDangerous(input);
}
