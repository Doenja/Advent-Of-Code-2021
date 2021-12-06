import { getInput, passTime } from "./part1";

export function part2(file: string) {
    const input = getInput(file);

    return passTime(input, 256);
}
