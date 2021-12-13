import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8")
        .split("\n")
        .map((row) => row.split("").map(Number));
}

export function filterHorizontalLows(input: number[][]) {
    const possibleLowPoints: [number, number][] = [];

    input.forEach((row, iRow) => {
        row.forEach((nr, i) => {
            const prevNr = row[i - 1];
            const nextNr = row[i + 1];

            if (
                (prevNr === undefined && nr < nextNr) ||
                (nextNr === undefined && nr < prevNr) ||
                (nr < prevNr && nr < nextNr)
            ) {
                possibleLowPoints.push([i, iRow]);
            }
        });
    });

    return possibleLowPoints;
}

export function filterVerticalLows(input: number[][], horizontalLows: number[][]) {
    horizontalLows.forEach((coordinate) => {
        console.log(coordinate);
    });
    return input;
}

export function part1(file: string) {
    const input = getInput(file);
    const horizontalLows = filterHorizontalLows(input);
    console.log(filterVerticalLows(input, horizontalLows));

    return 0;
}
