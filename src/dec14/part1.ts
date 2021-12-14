import { readFileSync } from "fs";

export function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").split("\n");

    const polymerTemplate = fileContent.shift() || ""; // get first line
    fileContent.shift(); // remove empty line

    return {
        polymerTemplate: Array.from(polymerTemplate),
        steps: fileContent,
    };
}

export function getInsert(pair: string, steps: string[]) {
    const insertRule = steps.find((step) => step.includes(pair));
    if (!insertRule) return "";

    return insertRule.charAt(insertRule.length - 1);
}

function count(key: string, counter: { [key: string]: number }, factor = 1) {
    counter[key] = counter[key] ? counter[key] + factor : factor;
}

export function pairInsert(input: { polymerTemplate: string[]; steps: string[] }, steps: number) {
    let pairCount: { [pair: string]: number } = {};

    // Count pairs of first polymerTemplate
    input.polymerTemplate.forEach((element, i) => {
        if (!input.polymerTemplate[i + 1]) return;

        count(`${element}${input.polymerTemplate[i + 1]}`, pairCount);
    });

    // For each steps add the pairs
    for (let i = 0; i < steps + 1; i++) {
        const newPairCount: { [pair: string]: number } = {};

        Object.keys(pairCount).forEach((pair) => {
            const insert = getInsert(pair, input.steps);
            const separate = Array.from(pair);
            const factor = newPairCount[pair] || 1;

            count(`${separate[0]}${insert}`, newPairCount, factor);
            count(`${insert}${separate[1]}`, newPairCount, factor);
        });

        pairCount = newPairCount;
    }

    return pairCount;
}

export function countElements(pairCount: { [pair: string]: number }) {
    const counter: { [letter: string]: number } = {};

    Object.keys(pairCount).forEach((pair) => {
        const counterValue = pairCount[pair] ? pairCount[pair] : 1;
        const letters = Array.from(pair);

        count(letters[0], counter, counterValue);
        count(letters[1], counter, counterValue);
    });

    let max = 0;
    let min = Infinity;

    Object.values(counter).forEach((value) => {
        max = Math.max(value, max);
        min = Math.min(value, min);
    });

    console.log(pairCount, counter);

    return max - min;
}

export function part1(file: string) {
    const input = getInput(file);

    const pairCount = pairInsert(input, 10);

    return countElements(pairCount);
}
