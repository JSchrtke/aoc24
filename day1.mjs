import { readFileSync } from 'node:fs';

test();
main();

function main() {
    const input = readFileSync("./day1.input", { encoding: "utf-8" });
    console.log(`total list distance is '${totalDistance(input)}; similarity score is '${similarityScore(input)}'`);
}

function totalDistance(input) {
    let { locationsA, locationsB } = parseLocationsLists(input);

    locationsA.sort();
    locationsB.sort();

    let distance = 0;
    for (let i = 0; i < locationsA.length; i++) {
        distance += Math.abs(locationsA[i] - locationsB[i]);
    }
    return distance;
}

function parseLocationsLists(input) {
    const lines = input.split("\n");

    const locationsA = new Array();
    const locationsB = new Array();
    for (let line of lines) {
        if (line === "") {
            continue;
        }
        const locationIds = line.split("   ");
        locationsA.push(parseInt(locationIds[0]));
        locationsB.push(parseInt(locationIds[1]));
    }
    return { locationsA, locationsB };
}

function similarityScore(input) {
    let { locationsA, locationsB } = parseLocationsLists(input);
    let totalScore = 0;
    for (let locationA of locationsA) {
        let locationCount = 0;
        for (let locationB of locationsB) {
            if (locationA === locationB) {
                locationCount++;
            }
        }
        totalScore += locationA * locationCount;
    }

    return totalScore;
}

function test() {
    checkTotalDistance();
    checkSimilarityScore();
}

function checkTotalDistance() {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`
    const expected = 11;
    const actual = totalDistance(input);
    check(expected, actual);
}

function checkSimilarityScore() {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
    const expected = 31;
    const actual = similarityScore(input);
    check(expected, actual);
}

function check(expected, actual) {
    if (expected === null || expected === undefined) {
        throw new Error(`test failure, expected some expected value, but got '${expected}'`);
    }
    if (expected === null || expected === undefined) {
        throw new Error(`test failure, expected some actual value, but got '${actual}'`);
    }

    const expectedType = typeof expected;
    const actualType = typeof actual;
    if (expectedType !== actualType) {
        throw new Error(`test failure, expected type of expected and actual to match, but got '${expectedType}' and '${actualType}'`);
    }

    if (expected !== actual) {
        throw new Error(`test failure: expected '${expected}', but got '${actual}'`);
    }
}
