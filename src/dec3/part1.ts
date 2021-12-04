import { readFileSync } from "fs";

function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8");

    return fileContent.split("\n");
}

export const binary = getInput("input/3.txt");

const length = binary[0].length;

const collection = new Array(length).fill(0);

function fillCollection() {
    collection.forEach((_, i) => {
        let total = 0;
        binary.forEach((item) => {
            if (item[i] === "1") {
                total++;
            }
        });

        collection[i] = total;
    });
}

function getAnswer() {
    fillCollection();

    const gamma = collection.map((item) => (item / binary.length > 0.5 ? 1 : 0));
    const epsilon = gamma.map((item) => (item === 1 ? 0 : 1));

    return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

export const part1 = getAnswer();
