import { boolean } from "yargs";
import { Day, ERROR_MESSAGE } from "../common";

// 0 has 6 letters
// 1 has 2 letters
// 2 has 5 letters
// 3 has 5 letters
// 4 has 4 letters
// 5 has 5 letters
// 6 has 6 letters
// 7 has 3 letters
// 8 has 7 letters
// 9 has 6 letters

// 1 has 2 letters

// 7 has 3 letters

// 4 has 4 letters

// 2 has 5 letters
// 3 has 5 letters
// 5 has 5 letters

// 0 has 6 letters
// 6 has 6 letters
// 9 has 6 letters

// 8 has 7 letters

const setDifference = (a: string[], b: string[]) => {
  const difference = new Array<string>();

  const notInA = (val: string) => !a.includes(val);
  const notInB = (val: string) => !b.includes(val);

  a.filter(notInB).forEach((val) => difference.push(val));
  b.filter(notInA).forEach((val) => difference.push(val));

  return difference;
};

const setIntersection = (a: string[], b: string[]) => {
  const intersection = new Set<string>();

  const inA = (val: string) => a.includes(val);
  const inB = (val: string) => b.includes(val);

  a.filter(inB).forEach((val) => intersection.add(val));
  b.filter(inA).forEach((val) => intersection.add(val));

  return Array.from(intersection);
};

const setIsUnion = (a: string[], b: string[]) => {
  const intersection = setIntersection(a, b);
  const difference = setDifference(a, b);

  return (
    a.length === intersection.length &&
    b.length === intersection.length &&
    difference.length === 0
  );
};

const processOne = (line: string) => {
  const [numbers, display] = line.split("|");

  const [one, seven, four, ...others] = numbers
    .trim()
    .split(" ")
    .sort((a, b) => a.length - b.length)
    .map((a) => a.split(""));

  const eight = others.pop()!;

  const numberValues = display
    .trim()
    .split(" ")
    .map((a) => a.split(""));

  const count = numberValues.filter(
    (v) =>
      setIsUnion(one, v) ||
      setIsUnion(four, v) ||
      setIsUnion(seven, v) ||
      setIsUnion(eight, v)
  ).length;

  return count;
};

const processTwo = (line: string) => {
  const [numbers, display] = line.split("|");

  const [one, seven, four, ...others] = numbers
    .trim()
    .split(" ")
    .sort((a, b) => a.length - b.length)
    .map((a) => a.split(""));

  const eight = others.pop()!;
  const lengthFive = others.filter((x) => x.length === 5);
  const two = lengthFive.filter(
    (s) => setIntersection(s, four).length === 2
  )[0];
  const three = lengthFive.filter(
    (s) => setIntersection(s, one).length === 2
  )[0];
  const five = lengthFive.filter(
    (s) => setIntersection(s, four).length === 3 && !setIsUnion(s, three)
  )[0];

  const a = setDifference(one, seven)[0];
  const maybeCF = setIntersection(one, seven);
  const maybeBC = setDifference(three, five);
  const maybeBD = setDifference(four, maybeCF);
  const maybeEG = setDifference(eight, [a, ...four]);
  const maybeEF = setDifference(two, three);
  const e = setIntersection(maybeEF, maybeEG)[0];
  const f = setDifference([e], maybeEF)[0];
  const g = setDifference([e], maybeEG)[0];
  const c = setDifference([f], maybeCF)[0];
  const b = setIntersection(maybeBC, maybeBD)[0];
  const d = setDifference([b], maybeBD)[0];
  const six = [a, b, d, e, f, g];
  const nine = [a, b, c, d, f, g];
  const zero = [a, b, c, e, f, g];
  // console.log({
  //   zero,
  //   one,
  //   two,
  //   three,
  //   four,
  //   five,
  //   six,
  //   seven,
  //   eight,
  //   nine,
  //   // maybeCF,
  //   // maybeBC,
  //   // maybeBD,
  //   // maybeEF,
  //   // maybeEG,
  //   // properA: a,
  //   // properB: b,
  //   // properC: c,
  //   // properD: d,
  //   // properE: e,
  //   // properF: f,
  //   // properG: g,
  // });

  const stringValue = display
    .trim()
    .split(" ")
    .map((a) => a.split(""))
    .map((a) => {
      if (setIsUnion(a, zero)) return 0;
      if (setIsUnion(a, one)) return 1;
      if (setIsUnion(a, two)) return 2;
      if (setIsUnion(a, three)) return 3;
      if (setIsUnion(a, four)) return 4;
      if (setIsUnion(a, five)) return 5;
      if (setIsUnion(a, six)) return 6;
      if (setIsUnion(a, seven)) return 7;
      if (setIsUnion(a, eight)) return 8;
      if (setIsUnion(a, nine)) return 9;
    })
    .map(String)
    .reduce((a, b) => a + b);

  return Number(stringValue);
};
export default class Day8 extends Day {
  protected readonly dayNumber = 8;

  part1 = async () => {
    const input = this.getSplitString();

    const count = input.map(processOne).reduce((a, b) => a + b);

    return count;
  };

  part2 = async () => {
    const input = this.getSplitString();

    const count = input.map(processTwo).reduce((a, b) => a + b);

    return count;
  };
}
