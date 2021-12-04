import { readFileSync } from "fs";

function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").split("\n");

    const drawnNumbers = fileContent.shift()?.split(",").map(Number);

    let rows: number[][] = [];
    fileContent.forEach((line) => {
        if (line === "") {
            return;
        }
        rows = [...rows, line.split(" ").map(Number)];
    });

    return {
        drawnNumbers,
        rows,
    };
}

const input = getInput("input/4.txt");

let cards: { [key: number]: { x: number[]; y: number[] } } = {};
let winner: number;
let winningNumber: number;

function checkWinningRow(row: number[], cardNr: number, drawnNr: number) {
    let occurances: { [key: number]: number } = {};

    row.forEach((nr) => {
        if (winner) {
            return;
        }
        occurances = {
            ...occurances,
            [nr]: occurances[nr] ? occurances[nr] + 1 : 1,
        };
        if (occurances[nr] > 4) {
            winner = cardNr;
            winningNumber = drawnNr;
        }
    });
}

function markCards(drawnNumber: number) {
    input.rows.forEach((row, i) => {
        const nrIndx = row.findIndex((nr) => nr === drawnNumber);
        if (nrIndx !== -1) {
            const cardNr = Math.floor(i / 5);
            cards = {
                ...cards,
                [cardNr]: {
                    x: cards[cardNr] ? [...cards[cardNr].x, nrIndx] : [nrIndx],
                    y: cards[cardNr] ? [...cards[cardNr].y, i] : [i],
                },
            };

            // When you have a card with 5 marks on the same x or y coordinate,
            // you have a winner
            if (!cards[cardNr]) {
                return;
            } else if (cards[cardNr].x.length > 4) {
                checkWinningRow(cards[cardNr].x, cardNr, drawnNumber);
            } else if (cards[cardNr].y.length > 4) {
                checkWinningRow(cards[cardNr].y, cardNr, drawnNumber);
            }

            if (winner) {
                return;
            }
        }
    });
}

function drawNumbers() {
    if (!input.drawnNumbers) {
        return;
    }
    for (const number of input.drawnNumbers) {
        markCards(number);
        if (winner) {
            console.log("we have a winner!", winner, winningNumber);
            break;
        }
    }
}
drawNumbers();

export const part1 = "not determined yet";
