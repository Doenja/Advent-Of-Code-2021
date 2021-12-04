import { getSumUnmarked, input, isWinner } from "./part1";

function drawLastWinner(bingoBalls: number[]) {
    let cards: { [key: number]: { x: number[]; y: number[]; drawn: number[]; winningNumber?: number } } = {};
    let lastWinner = -1;

    for (const drawnNumber of bingoBalls) {
        input.rows.forEach((row, i) => {
            const cardNr = Math.floor(i / 5);

            // Skip cards that already won
            if (cards[cardNr] && cards[cardNr].winningNumber) return;

            const nrIndx = row.findIndex((nr) => nr === drawnNumber);
            if (nrIndx === -1) return;

            if (!cards[cardNr]) {
                cards = { ...cards, [cardNr]: { x: [], y: [], drawn: [] } };
            }
            const card = cards[cardNr];

            card.x.push(nrIndx);
            card.y.push(i);
            card.drawn.push(drawnNumber);

            if (isWinner(card.x) || isWinner(card.y)) {
                card.winningNumber = drawnNumber;
                lastWinner = cardNr;
            }
        });
    }

    return { card: cards[lastWinner], cardNumber: lastWinner };
}

function getAnswer() {
    if (!input.bingoBalls) return;

    const { card, cardNumber } = drawLastWinner(input.bingoBalls);
    if (!card || !card.winningNumber) return;

    return getSumUnmarked(cardNumber, card.drawn) * card.winningNumber;
}

export const part2 = getAnswer();
