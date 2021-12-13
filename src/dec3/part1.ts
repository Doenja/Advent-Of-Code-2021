import { readFileSync } from "fs";

export function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").trim();
    const lines = fileContent.split("\n");

    return lines.map((line) => line.split("").map(Number));
}

export function getMostCommon(input: number[][]) {
    let totals: number[] = [];
    input[0].forEach((_, i) => {
        let total = 0;
        input.forEach((number) => {
            total += number[i];
        });
        totals = [...totals, total];
    });

    return totals.map((total) => (total / input.length >= 0.5 ? 1 : 0));
}

export function part1(file: string) {
    const input = getInput(file);
    const mostCommon = getMostCommon(input);

    const gamma = parseInt(mostCommon.join(""), 2);
    const epsilon = parseInt(mostCommon.map((nr) => (nr === 1 ? 0 : 1)).join(""), 2);

    return gamma * epsilon;
}
