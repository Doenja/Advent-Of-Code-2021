import { readFileSync } from "fs";

export function getInput(file: string) {
    return readFileSync(file, "utf-8");
}

export function part1(file: string) {
    const input = getInput(file);
    console.log(input);

    return 0;
}
