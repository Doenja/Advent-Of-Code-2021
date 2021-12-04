import { readFileSync } from "fs";

function getInput(file: string) {
    const fileContent = readFileSync(file, "utf-8").split("\n");

    const bingoBalls = fileContent.shift()?.split(",").map(Number);

    let rows: number[][] = [];

    fileContent.forEach((line) => {
        if (line === "") {
            return;
        }

        rows = [...rows, line.trim().split(/ +/g).map(Number)];
    });

    return {
        bingoBalls,
        rows,
    };
}

export const input = getInput("input/4.txt");

export function getSumUnmarked(cardNr: number, drawn: number[]) {
    const startingRow = cardNr * 5;

    let numbers: number[] = [];
    for (let i = 0; i < 5; i++) {
        numbers = [...numbers, ...input.rows[startingRow + i]];
    }

    let total = 0;
    numbers.forEach((nr) => {
        if (!drawn.includes(nr)) {
            total = total + nr;
        }
    });

    return total;
}

export function isWinner(coordinates: number[]) {
    // When there are 5 occurances of the same coordinate we have a winner
    if (coordinates.length < 5) return false;

    let occurances: { [key: number]: number } = {};
    let wins = false;

    for (const nr of coordinates) {
        occurances = {
            ...occurances,
            [nr]: occurances[nr] ? occurances[nr] + 1 : 1,
        };
        if (occurances[nr] > 4) {
            wins = true;
            break;
        }
    }

    return wins;
}

function drawWinner(bingoBalls: number[]) {
    let cards: { [key: number]: { x: number[]; y: number[]; drawn: number[]; winningNumber?: number } } = {};
    let winner = -1;

    for (const drawnNumber of bingoBalls) {
        if (winner !== -1) {
            break;
        }

        input.rows.forEach((row, i) => {
            const nrIndx = row.findIndex((nr) => nr === drawnNumber);
            if (nrIndx === -1) return;

            const cardNr = Math.floor(i / 5);

            if (!cards[cardNr]) {
                cards = { ...cards, [cardNr]: { x: [], y: [], drawn: [] } };
            }
            const card = cards[cardNr];

            card.x.push(nrIndx);
            card.y.push(i);
            card.drawn.push(drawnNumber);

            if (isWinner(card.x) || isWinner(card.y)) {
                card.winningNumber = drawnNumber;
                winner = cardNr;
            }
        });
    }

    return { card: cards[winner], cardNumber: winner };
}

function getAnswer() {
    if (!input.bingoBalls) return;

    const { card, cardNumber } = drawWinner(input.bingoBalls);

    if (!card || !card.winningNumber) return;

    return getSumUnmarked(cardNumber, card.drawn) * card.winningNumber;
}

export const part1 = getAnswer();
