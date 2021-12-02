import { readFileSync } from "fs";

function getSteps(file: string) {
    const fileContent = readFileSync(file, "utf-8");
    return fileContent.split("\n");
}

export const steps = getSteps("input/2.txt");

function getPosition() {
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

export const part1 = getPosition();
