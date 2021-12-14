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

export function pairInsert(input: { polymerTemplate: string[]; steps: string[] }, steps: number) {
    let polymers = [...input.polymerTemplate];

    for (let i = 1; i < steps + 1; i++) {
        const newTemplate: string[] = [];

        polymers.forEach((element, j) => {
            newTemplate.push(element);

            if (!polymers[i + 1]) return;
            const insert = getInsert(`${element}${polymers[j + 1]}`, input.steps);
            if (!insert) return;
            newTemplate.push(insert);
        });

        polymers = [...newTemplate];
    }

    return polymers;
}

export function countElements(template: string[]) {
    const counter: { [key: string]: number } = {};

    template.forEach((element) => {
        counter[element] ? counter[element]++ : (counter[element] = 1);
    });

    let max = 0;
    let min = Infinity;

    Object.values(counter).forEach((value) => {
        max = Math.max(value, max);
        min = Math.min(value, min);
    });

    return max - min;
}

export function part1(file: string) {
    const input = getInput(file);

    const polymers = pairInsert(input, 10);

    return countElements(polymers);
}
