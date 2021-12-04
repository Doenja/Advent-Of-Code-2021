import { readFileSync } from "fs";

function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").split("\n");

    const bingoBalls = fileContent.shift()?.split(",").map(Number);

    let rows: number[][] = [];
    fileContent.forEach((line) => {
        if (line === "") {
            return;
        }
        rows = [...rows, line.split(" ").map(Number)];
    });

    return {
        bingoBalls,
        rows,
    };
}

const input = getInput("input/4.txt");

let cards: { [key: number]: { x: number[]; y: number[] } } = {};
let drawnNumbers: number[] = [];
let winner: number;
let winningNumber: number;

function markCards(drawnNumber: number) {
    input.rows.forEach((row, i) => {
        if (winner) {
            return;
        }

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
                checkWinningCoordinates(cards[cardNr].x, cardNr, drawnNumber);
            } else if (cards[cardNr].y.length > 4) {
                checkWinningCoordinates(cards[cardNr].y, cardNr, drawnNumber);
            }
        }
    });
}

function checkWinningCoordinates(coordinates: number[], cardNr: number, drawnNr: number) {
    let occurances: { [key: number]: number } = {};

    for (const nr of coordinates) {
        if (winner) {
            break;
        }
        occurances = {
            ...occurances,
            [nr]: occurances[nr] ? occurances[nr] + 1 : 1,
        };
        console.log(occurances);

        if (occurances[nr] > 4) {
            winner = cardNr;
            winningNumber = drawnNr;
        }
    }
}

function getSumUnmarked(cardNr: number) {
    const startingRow = cardNr * 5;

    let numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
        numbers = [...numbers, ...input.rows[startingRow + i]];
    }

    let total = 0;
    numbers.forEach((nr) => {
        if (!drawnNumbers.includes(nr)) {
            total = total + nr;
        }
    });

    return total;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
function drawBalls(): number | undefined {
    if (!input.bingoBalls) {
        return;
    }

    for (const number of input.bingoBalls) {
        drawnNumbers = [...drawnNumbers, number];
        markCards(number);

        if (winner) {
            return winningNumber * getSumUnmarked(winner);
        }
    }
}

export const part1 = drawBalls();
