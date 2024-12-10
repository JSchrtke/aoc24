test();
main();

function main() {
  console.log("Hello, World!");
}

function solve(input) {
  const lines = input.split("\n");
  const firstColumn = new Array(lines.length);
  const secondColumn = new Array(lines.length);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineValues = line.split("   ");
    firstColumn[i] = parseInt(lineValues[0]);
    secondColumn[i] = parseInt(lineValues[1]);
  }
  firstColumn.sort();
  secondColumn.sort();
  let sum = 0;
  for (let i = 0; i < firstColumn.length; i++) {
    sum += Math.abs(firstColumn[i] - secondColumn[i]);
  }
  return sum;
}

function test() {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`
  const expected = 11;
  const actual = solve(input);
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
