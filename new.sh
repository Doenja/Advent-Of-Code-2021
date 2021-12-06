# Ask for the day
echo What day is it? 
read day 

# Create a new folder with the day name
cd src 
mkdir $day 

# Create new files for part1 and part2
cd $day 
touch part1.ts part2.ts assignment.txt
echo 'import { readFileSync } from "fs";\n\nexport function getInput(file: string){\nreturn readFileSync(file, "utf-8");\n}\n\nexport function part1(file: string) {\nconst input = getInput(file);\nconsole.log(input);\n\nreturn 0;\n}' > part1.ts
echo 'import { readFileSync } from "fs";\n\nexport function getInput(file: string){\nreturn readFileSync(file, "utf-8");\n}\n\nexport function part2(file: string) {\nconst input = getInput(file);\nconsole.log(input);\n\nreturn 0;\n}' > part2.ts
