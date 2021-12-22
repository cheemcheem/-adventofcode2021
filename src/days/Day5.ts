import { Day, ERROR_MESSAGE } from "../common";

type Points = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
export default class Day5 extends Day {
  protected readonly dayNumber = 5;

  private static getPoints = (inputRow: string) => {
    const [first, second] = inputRow.split(" -> ");
    const [x1, y1] = first.split(",").map(Number);
    const [x2, y2] = second.split(",").map(Number);
    return { x1, y1, x2, y2 };
  };

  private static getLine = ({ x1, x2, y1, y2 }: Points) => {
    const getPoint = (a1: number, a2: number, b: number, aIsX: boolean) => {
      const aDiff = Math.abs(a1 - a2);
      const aMin = Math.min(a1, a2);
      const steps = Array.from(Array(aDiff + 1)).map((_, aIncr) => {
        return aIsX ? [aMin + aIncr, b] : [b, aMin + aIncr];
      });
      const oriented = a1 < a2 ? steps : steps.reverse();
      return oriented as [number, number][];
    };

    if (x1 === x2) {
      return getPoint(y1, y2, x1, false);
    }

    if (y1 === y2) {
      return getPoint(x1, x2, y1, true);
    }

    return undefined;
  };

  private static getLineDiagonal = ({ x1, x2, y1, y2 }: Points) => {
    const xMin = Math.min(x1, x2);
    const xMax = Math.max(x1, x2);
    const [xStart, xEnd, xIncrement] =
      x1 === xMin ? [xMin, xMax, 1] : [xMax, xMin, -1];

    const yMin = Math.min(y1, y2);
    const yMax = Math.max(y1, y2);
    const [yStart, yEnd, yIncrement] =
      y1 === yMin ? [yMin, yMax, 1] : [yMax, yMin, -1];

    let [xCurrent, yCurrent] = [xStart, yStart];
    const result: [number, number][] = [];
    while (xCurrent !== xEnd && yCurrent !== yEnd) {
      result.push([xCurrent, yCurrent]);
      xCurrent += xIncrement;
      yCurrent += yIncrement;
    }
    result.push([xCurrent, yCurrent]);

    return result;
  };

  part1 = async () => {
    const input = this.getSplitString()
      .map(Day5.getPoints)
      .map(Day5.getLine)
      .filter((v) => v)
      .map((v) => v as [number, number][]);

    // input.forEach((v) => console.log(v));
    const grid = new Map<number, Map<number, number>>();
    input
      .flatMap((line) => line)
      .forEach(([X, Y]) => {
        const row = grid.get(X) ?? new Map();
        row.set(Y, (row.get(Y) ?? 0) + 1);
        grid.set(X, row);
      });

    const result = Array.from(grid)
      .flatMap(([X, row]) => Array.from(row).map(([Y, val]) => [X, Y, val]))
      .filter(([, , val]) => val > 1);

    return result.length;
  };

  part2 = async () => {
    const input = this.getSplitString()
      .map(Day5.getPoints)
      .map((points) => Day5.getLine(points) ?? Day5.getLineDiagonal(points));

    // input.forEach((v) => console.log(v));
    const grid = new Map<number, Map<number, number>>();
    input
      .flatMap((line) => line)
      .forEach(([X, Y]) => {
        const row = grid.get(X) ?? new Map();
        row.set(Y, (row.get(Y) ?? 0) + 1);
        grid.set(X, row);
      });

    const result = Array.from(grid)
      .flatMap(([X, row]) => Array.from(row).map(([Y, val]) => [X, Y, val]))
      .filter(([, , val]) => val > 1);

    return result.length;
  };
}
