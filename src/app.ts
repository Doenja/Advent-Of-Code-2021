import { part1 } from "./dec7/part1";
import { part2 } from "./dec7/part2";

const day = 7;
const testOutput = {
    part1: 37,
    part2: 168,
};

console.log("Test 1 is", part1(`input/${day}-test.txt`) === testOutput.part1 ? "a success!" : "failing");
console.log("The a nswer to part 1 is", part1(`input/${day}.txt`));

console.log("Test 2 is", part2(`input/${day}-test.txt`) === testOutput.part2 ? "a success!" : "failing");
console.log("The answer to part 2 is", part2(`input/${day}.txt`));
