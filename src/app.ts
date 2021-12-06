import { part1 } from "./dec3/part1";
// import { part2 } from "./dec3/part2";

const day = 3;
const testOutput = {
    part1: 198,
    part2: 230,
};

console.log("Test 1 is", part1(`input/${day}-test.txt`) === testOutput.part1 ? "a success!" : "failing");
console.log("The answer to part 1 is", part1(`input/${day}.txt`));

// console.log("Test 2 is", part2(`input/${day}-test.txt`) === testOutput.part2 ? "a success!" : "failing");
// console.log("The answer to part 2 is", part2(`input/${day}.txt`));
