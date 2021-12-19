import { number } from "yargs";
import { Day, ERROR_MESSAGE } from "../common";

export default class Day4 extends Day {
  protected readonly dayNumber = 4;

  isSolved = (numberGrid: number[][]) => (drawnNumbers: number[]) => {
    const length = numberGrid.length;
    const arrayMatches = (array: number[]) =>
      array.filter((item) => drawnNumbers.includes(item)).length === length;

    for (const row of numberGrid) {
      if (arrayMatches(row)) {
        return numberGrid;
      }
    }

    for (let colI = 0; colI < length; colI++) {
      const col = numberGrid.map((row) => row[colI]);
      if (arrayMatches(col)) {
        return numberGrid;
      }
    }

    return false;
  };

  part1 = async () => {
    const { numberGrids, drawNumbers } = this.getInputs();

    let solved: undefined | number[][] = undefined;
    const checkGridsSolved = numberGrids.map(this.isSolved);
    let currentDrawIndex = 0;
    for (
      ;
      currentDrawIndex < drawNumbers.length && !solved;
      currentDrawIndex++
    ) {
      const currentDraw = drawNumbers.slice(0, currentDrawIndex);
      for (let checkGrid of checkGridsSolved) {
        const checkResult = checkGrid(currentDraw);
        if (checkResult) {
          solved = checkResult;
          break;
        }
      }
    }

    if (solved) {
      const drawnNumbers = drawNumbers.slice(0, currentDrawIndex - 1);
      return this.calculateScore(drawnNumbers, solved);
    }

    return 0;
  };

  part2 = async () => {
    const { numberGrids, drawNumbers } = this.getInputs();

    const checkGridsSolved = numberGrids.map(this.isSolved);
    let currentDrawIndex = 0;
    const boardsWonIndex = new Map<number[][], number>();

    for (; currentDrawIndex < drawNumbers.length; currentDrawIndex++) {
      const currentDraw = drawNumbers.slice(0, currentDrawIndex);
      for (let checkGrid of checkGridsSolved) {
        const checkResult = checkGrid(currentDraw);
        if (checkResult) {
          if (boardsWonIndex.has(checkResult)) {
            continue;
          }
          boardsWonIndex.set(checkResult, currentDrawIndex);
        }
      }
    }

    if (boardsWonIndex.size > 0) {
      const [solved, solvedDrawIndex] = Array.from(boardsWonIndex).reduce(
        (a, b) => (a[1] > b[1] ? a : b)
      );
      const drawnNumbers = drawNumbers.slice(0, solvedDrawIndex);
      return this.calculateScore(drawnNumbers, solved);
    }

    return 0;
  };

  private getInputs() {
    const [input, ...grids] = this.getDoubleSplitString();

    const drawNumbers = input.split(",").map(Number);

    const numberGrids = grids.map((grid) =>
      grid.split("\n").map((row) =>
        row
          .split("  ")
          .flatMap((s) => s.trim().split(" "))
          .map(Number)
      )
    );
    return { numberGrids, drawNumbers };
  }

  private calculateScore(drawnNumbers: number[], solved: number[][]) {
    const sum = solved
      .flatMap((s) => s)
      .filter((s) => !drawnNumbers.includes(s))
      .reduce((a, b) => a + b);
    const lastDrawn = drawnNumbers[drawnNumbers.length - 1];
    return sum * lastDrawn;
  }
}
