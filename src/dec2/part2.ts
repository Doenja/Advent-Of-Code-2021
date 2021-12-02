import { steps } from "./part1";

function getPosition() {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    steps.forEach((step) => {
        const splitStep = step.split(" ");
        const amount = parseInt(splitStep[1]);

        if (!splitStep[0]) {
            return;
        } else if (splitStep[0] === "forward") {
            horizontal += amount;
            depth = depth + aim * amount;
        } else if (splitStep[0] === "down") {
            aim += amount;
        } else {
            aim -= amount;
        }
    });

    return horizontal * depth;
}

export const part2 = getPosition();
