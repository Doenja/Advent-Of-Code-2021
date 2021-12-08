import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8").split("\n");
}

export function getOutputValues(input: string[]) {
    return input.map((string) => string.split(" | ")[1]);
}

export function countUniqueDigits(outputValues: string[]) {
    let counter = 0;
    outputValues.forEach((value) => {
        if (!value) return;

        value.split(" ").forEach((digit) => {
            if (digit.length !== 5 && digit.length !== 6) {
                counter++;
            }
        });
    });
    return counter;
}

export function part1(file: string) {
    const input = getInput(file);

    const outputValues = getOutputValues(input);

    return countUniqueDigits(outputValues);
}
