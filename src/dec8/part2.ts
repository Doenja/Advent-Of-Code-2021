import { getInput } from "./part1";

export function findDigits(input: string[]) {
    const digits: { [display: string]: string[] } = {};

    input.forEach((value) => {
        if (!value) return;

        function getDigit(length: number) {
            const digit = value.split(" ").find((d) => d.length === length);
            return digit?.split("") || [];
        }
        digits["1"] = getDigit(2);
        digits["4"] = getDigit(4);
        digits["7"] = getDigit(3);
        digits["8"] = getDigit(7);
    });

    console.log(digits);

    const segments: { [display: string]: "" | string } = {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
    };

    // Number 7 has a unique segment that should be 'a'
    const a = digits["7"].find((letter) => !digits["1"].includes(letter));
    if (a) segments["a"] = a;

    // Number 6 shares one segment with 1
    // number 9 shares 2 segments with 1
    for (const digit of input) {
        console.log(digit);
    }
    return segments;
}

export function part2(file: string) {
    const input = getInput(file);

    console.log(findDigits(input));

    return 0;
}
