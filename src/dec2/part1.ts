import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8").split("\n");
}

function getPosition(steps: string[]) {
    let horizontal = 0;
    let depth = 0;

    steps.forEach((step) => {
        const splitStep = step.split(" ");
        const amount = parseInt(splitStep[1]);

        if (!splitStep[0]) {
            return;
        } else if (splitStep[0] === "forward") {
            horizontal += amount;
        } else if (splitStep[0] === "down") {
            depth += amount;
        } else {
            depth -= amount;
        }
    });

    return horizontal * depth;
}

export function part1(file: string) {
    const input = getInput(file);

    return getPosition(input);
}
