import { Day, ERROR_MESSAGE } from "../common";

export default class Day1 extends Day {
  protected readonly dayNumber = 1;

  part1 = async () => {
    const distances = this.getSplitString().map(Number);

    return distances
      .map((dist, index) => {
        if (index === 0) {
          return 0;
        }

        if (distances[index - 1] < dist) {
          return 1;
        }

        return 0;
      })
      .map(Number)
      .reduce((a, b) => a + b);
  };

  part2 = async () => {
    const distances = this.getSplitString().map(Number);

    const reduce = (index: number) =>
      distances.slice(index - 1, index + 2).reduce((a, b) => a + b);

    return distances
      .map((_, index) => {
        if (index < 2 || index === distances.length - 1) {
          return 0;
        }

        const prevThree = reduce(index - 1);
        const currentThree = reduce(index);

        if (prevThree < currentThree) {
          return 1;
        }

        return 0;
      })
      .map(Number)
      .reduce((a, b) => a + b);
  };
}
