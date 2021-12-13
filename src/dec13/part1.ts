import { readFileSync } from "fs";

export function getInput(file: string) {
    const lines = readFileSync(file, "utf-8").split("\n");

    const coordinates: number[][] = [];
    let instructions: { along: string; line: number }[] = [];
    lines.forEach((line) => {
        if (!line) return;
        if (line.includes("fold")) {
            const last = line.split(" ")[2].split("=");
            instructions = [...instructions, { along: last[0], line: Number(last[1]) }];
        } else {
            const coordinate = line.split(",").map(Number);
            coordinates.push([coordinate[0], coordinate[1]]);
        }
    });

    return { coordinates, instructions };
}

export function fold(along: string, line: number, coordinate: number[]) {
    if (along === "x" && coordinate[0] > line) {
        // When you fold across a x-coordinate, you take all the coordinates that have a higher x coordinate
        // and you invert their x coordinates
        const newX = coordinate[0] - 2 * (coordinate[0] - line);
        return [newX, coordinate[1]];
    } else if (along === "y" && coordinate[1] > line) {
        // When you fold across a y-coordinate, you take all the coordinates that have a higher y coordinate
        // and you invert their y coordinates
        const newY = coordinate[1] - 2 * (coordinate[1] - line);
        return [coordinate[0], newY];
    } else {
        return coordinate;
    }
}

export function countCoordinates(coordinates: number[][]) {
    let counter: { [key: string]: number } = {};

    coordinates.forEach((coordinate) => {
        const key = `${coordinate[0]},${coordinate[1]}`;
        counter[key] ? (counter = { ...counter, [key]: counter[key] + 1 }) : (counter = { ...counter, [key]: 1 });
    });

    return counter;
}

export function part1(file: string) {
    const input = getInput(file);

    const instruction = input.instructions[0];
    const folded = input.coordinates.map((coordinate) => fold(instruction.along, instruction.line, coordinate));

    const counter = countCoordinates(folded);
    return Object.keys(counter).length;
}
