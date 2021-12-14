import { findLows, getAdjacents, getInput } from "./part1";

function mapBasins(input: number[][], lows: { x: number; y: number; nr: number }[]) {
    lows.forEach((low) => {
        const adjacent = getAdjacents(input, low.x, low.y);
        console.log(adjacent);
    });
}

export function part2(file: string) {
    const input = getInput(file);
    input.forEach((row) => console.log(JSON.stringify(row)));

    const lows = findLows(input);

    mapBasins(input, lows);

    return 0;
}
