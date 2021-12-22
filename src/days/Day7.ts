import { Day } from "../common";

export default class Day7 extends Day {
  protected readonly dayNumber = 7;

  part1 = async () => {
    const input = this.getString().split(",").map(Number);

    const unique = Array.from(new Set(input));

    let bestTotal = Number.MAX_SAFE_INTEGER;
    let bestValue = 0;
    for (let best of unique) {
      let total = 0;
      for (let test of input) {
        total += Math.abs(test - best);
      }

      if (total < bestTotal) {
        bestTotal = total;
        bestValue = best;
      }
    }

    return input.map((i) => Math.abs(i - bestValue)).reduce((a, b) => a + b);
  };

  part2 = async () => {
    const input = this.getString().split(",").map(Number);

    const unique = Array.from(
      Array(input.reduce((a, b) => (a < b ? b : a)) + 1)
    ).map((_, i) => i);

    const sumToOne = (total: number) =>
      total === 0
        ? 0
        : Array.from(Array(total))
            .map((_, i) => i + 1)
            .map((a) => {
              // console.log(a);
              return a;
            })
            .reduce((a, b) => a + b);

    let bestTotal = Number.MAX_SAFE_INTEGER;
    let bestValue = 0;

    for (let best of unique) {
      let total = 0;
      for (let test of input) {
        const newTotal = sumToOne(Math.abs(test - best));
        total += newTotal;
      }

      if (total < bestTotal) {
        bestTotal = total;
        bestValue = best;
      }
    }

    console.log({ bestTotal, bestValue });
    return input.map((i) => Math.abs(i - bestValue)).reduce((a, b) => a + b);
  };
}
