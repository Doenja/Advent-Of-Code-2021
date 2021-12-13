import { getInput, getMostCommon } from "./part1";

function filterRating(input: number[][], filterFunction: (input: number[][]) => number[]) {
    let filtered = input;
    for (let i = 0; i < input[0].length + 1; i++) {
        if (filtered.length === 1) break;

        const mostCommon = filterFunction(filtered);
        filtered = filtered.filter((number) => number[i] === mostCommon[i]);
    }

    return filtered[0];
}

export function part2(file: string) {
    const input = getInput(file);

    const oxiFiltered = filterRating(input, getMostCommon);
    const c02Filtered = filterRating(input, (input) => getMostCommon(input).map((nr) => (nr === 1 ? 0 : 1)));

    const oxigenGeneratorRating = parseInt(oxiFiltered.join(""), 2);
    const c02ScrubberRating = parseInt(c02Filtered.join(""), 2);

    return oxigenGeneratorRating * c02ScrubberRating;
}
