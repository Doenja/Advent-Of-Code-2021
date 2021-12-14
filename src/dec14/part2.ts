import { countElements, getInput, pairInsert } from "./part1";

export function part2(file: string) {
    const input = getInput(file);

    const polymers = pairInsert(input, 40);

    return countElements(polymers);
}
