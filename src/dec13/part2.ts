import { fold, getInput } from "./part1";

function drawNumbers(folded: number[][]) {
    let xMax = 0;
    let yMax = 0;

    folded.forEach((coordinate) => {
        xMax = Math.max(coordinate[0], xMax);
        yMax = Math.max(coordinate[1], yMax);
    });

    const board: string[][] = [];
    for (let i = 0; i < xMax + 1; i++) {
        board.push(new Array(yMax + 1).fill(" "));
    }

    folded.forEach((coordinate) => {
        if (!board[coordinate[0]] || !board[coordinate[0]][coordinate[1]]) return;
        board[coordinate[0]][coordinate[1]] = "#";
    });

    return board;
}

export function part2(file: string) {
    const input = getInput(file);
    let folded: number[][] = input.coordinates;
    input.instructions.forEach((instruction) => {
        folded = folded.map((coordinate) => fold(instruction.along, instruction.line, coordinate));
    });

    const board = drawNumbers(folded);

    console.log(board);
    return 0;
}
