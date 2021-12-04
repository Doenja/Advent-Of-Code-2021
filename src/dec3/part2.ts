import { binary } from "./part1";

const length = binary[0].length;
const collection = new Array(length).fill(0);

function getMostCommon(binaryPosition: number) {
    let total = 0;
    binary.forEach((item) => {
        if (!item) {
            return;
        }
        if (item[binaryPosition] === "1") {
            total++;
        }
    });

    return total / binary.length >= 0.5 ? 1 : 0;
}

function getAnswer() {
    // We start with the whole list of numbers
    // First look at the first position bit of each number
    // Find the most common number of all of them
    // Filter out the numbers that do not start with that common number
    // Repeat untill 1 number left

    const mostCommonNumbers = collection.map((_, i) => {
        return getMostCommon(i);
    });

    const leastCommonNumbers = mostCommonNumbers.map((item) => (item === 1 ? 0 : 1));

    let filtered = [...binary];
    let filteredc02 = [...binary];

    mostCommonNumbers.forEach((number, i) => {
        if (filtered.length === 1) {
            return;
        }
        filtered = filtered.filter((item) => {
            return parseInt(item[i]) === number;
        });
    });

    leastCommonNumbers.forEach((number, i) => {
        if (filteredc02.length === 1) {
            return;
        }
        filteredc02 = filteredc02.filter((item) => {
            return parseInt(item[i]) === number;
        });
    });

    const oxigenGeneratoRating = parseInt(filtered.join(""), 2);
    const c02ScrubberRating = parseInt(filteredc02.join(""), 2);

    return oxigenGeneratoRating * c02ScrubberRating;
}

export const part2 = getAnswer();
