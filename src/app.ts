import { part1 } from "./dec6/part1";
import { part2 } from "./dec6/part2";

console.log("Test 1 is", part1("input/6-test.txt") === 5934 ? "a success!" : "failing");
console.log("The answer to part 1 is", part1("input/6.txt"));

console.log("Test 2 is", part2("input/6-test.txt") === 26984457539 ? "a success!" : "failing");
console.log("The answer to part 2 is", part2("input/6.txt"));
