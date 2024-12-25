import { readFileSync } from 'node:fs';

test();
main();

function main() {
    const input = readFileSync("./day2.input", { encoding: "utf-8" });
    assert(input !== undefined);
    assert(input !== null);

    console.log(countSafeReports(input));
}

function countSafeReports(rawReports) {
    assert(rawReports !== undefined);
    assert(rawReports !== null);

    const reports = parseReports(rawReports);
    assert(reports !== undefined);
    assert(reports !== null);

    let safeReportCount = 0;
    for (let report of reports) {
        assert(report !== undefined);
        assert(report !== null);

        if (isSafe(report)) {
            safeReportCount++;
        }
    }
    return safeReportCount;
}

function parseReports(rawReports) {
    assert(rawReports !== undefined);
    assert(rawReports !== null);

    const reports = rawReports.split('\n').filter((v) => v !== '');
    assert(reports.length !== 0);

    const cleanReports = new Array();
    for (let i = 0; i < reports.length; i++) {
        const report = reports[i];
        assert(report !== undefined);
        assert(report !== null);
        assert(typeof report === "string");
        assert(report != '');

        const cleanReport = new Array();
        const levels = report.split(' ');
        assert(levels.length !== 0);

        for (let level of levels) {
            assert(level !== undefined);
            assert(level !== null);

            const l = parseInt(level);
            assert(typeof l === "number");
            assert(l !== NaN);

            cleanReport.push(l);
        }
        assert(cleanReport.length !== 0);

        cleanReports.push(cleanReport);
    }
    assert(cleanReports.length !== 0);

    return cleanReports
}

function isSafe(report) {
    assert(report !== undefined);
    assert(report !== null);
    assert(report.length !== 0);
    for (let x of report) {
        assert(x !== undefined);
        assert(x !== null);
        assert(typeof x === "number");
        assert(x !== NaN);
    }

    let allIncreasing = true;
    let allDecreasing = true;
    for (let i = 1; i < report.length;i++) {
        const current = report[i];
        assert(i-1 >= 0);
        const previous = report[i-1]
        assert(previous !== undefined);
        assert(previous !== null);

        const diff = Math.abs(previous - current);
        if (diff < 1) {
            return false;
        }
        if (diff > 3) {
            return false;
        }

        if (current <= previous) {
            allIncreasing = false;
        }
        if (current >= previous) {
            allDecreasing = false;
        }
    }

    if (allIncreasing) {
        assert(allDecreasing === false);
    }
    if (allDecreasing) {
        assert(allIncreasing === false);
    }

    return allIncreasing || allDecreasing;
}

function test() {
    checkIsSafe();
    checkSafetyCount();
}

function checkIsSafe() {
    checkSafe([7, 6, 4, 2, 1], true);
    checkSafe([1, 2, 7, 8, 9], false);
    checkSafe([9, 7, 6, 2, 1], false);
    checkSafe([1, 3, 2, 4, 5], false);
    checkSafe([8, 6, 4, 4, 1], false);
    checkSafe([1, 3, 6, 7, 9], true);
}

function checkSafe(input, expected) {
    check(expected, isSafe(input));
}

function checkSafetyCount() {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
1 2 3 4 5 6`;
    const expected = 3;
    const actual = countSafeReports(input);
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

function assert(condition) {
    if (!condition) {
        throw new Error('assertion failed');
    }
}

