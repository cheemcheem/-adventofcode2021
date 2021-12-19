import { Day, ERROR_MESSAGE } from "../common";

export default class Day2 extends Day {
  protected readonly dayNumber = 2;

  part1 = async () => {
    const changes = this.getSplitString().map((v) => {
      const change = Number(v.split(" ")[1]);

      if (v.startsWith("forward")) {
        return [change, 0];
      }

      if (v.startsWith("down")) {
        return [0, change];
      }

      // up
      return [0, -change];
    });

    const [totalForward, totalDepth] = changes.reduce(([f1, d1], [f2, d2]) => [
      f1 + f2,
      d1 + d2,
    ]);

    return totalForward * totalDepth;
  };

  part2 = async () => {
    let aim = 0;

    const changes = this.getSplitString().map((v) => {
      const change = Number(v.split(" ")[1]);

      if (v.startsWith("forward")) {
        return [change, aim * change];
      }

      if (v.startsWith("down")) {
        aim += change;
        return [0, 0];
      }

      // up
      aim -= change;
      return [0, 0];
    });

    const [totalForward, totalDepth] = changes.reduce(([f1, d1], [f2, d2]) => [
      f1 + f2,
      d1 + d2,
    ]);

    return totalForward * totalDepth;
  };
}
