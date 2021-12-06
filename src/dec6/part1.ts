import { readFileSync } from "fs";

export function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8");
    return fileContent.trim().split(",").sort();
}

export function passTime(input: string[], days: number) {
    let fishCount: { [fishCount: string]: number } = {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
    };
    for (const fish of input) {
        fishCount[fish] = fishCount[fish] ? fishCount[fish] + 1 : 1;
    }

    for (let day = 1; day <= days; day++) {
        fishCount = {
            "0": fishCount["1"],
            "1": fishCount["2"],
            "2": fishCount["3"],
            "3": fishCount["4"],
            "4": fishCount["5"],
            "5": fishCount["6"],
            "6": fishCount["7"] + fishCount["0"],
            "7": fishCount["8"],
            "8": fishCount["0"],
        };
    }

    return Object.values(fishCount).reduce((cur, prev) => cur + prev);
}

export function part1(file: string) {
    const input = getInput(file);

    return passTime(input, 80);
}
