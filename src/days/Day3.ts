import { Day } from "../common";

export default class Day3 extends Day {
  protected readonly dayNumber = 3;

  private commonValues = () => {
    // e.g. 01010, 10101, ...
    const binary = this.getSplitString();

    // 10, 21, ...
    const decimal = binary.map((x) => Number.parseInt(x, 2));

    // 5
    const rowLength = binary[0].length;

    // 2
    const colLength = binary.length;

    // [0,1,0,1,0] => 10
    const toNumber = (arr: number[]) =>
      Number.parseInt(
        arr.map(String).reduce((a, b) => a + b),
        2
      );

    const columnBitSum = (
      arr: number[] // for each column in binary number
    ) =>
      // from smallest (1s) to biggest (16s)
      Array.from(Array(rowLength)).map((_, col) =>
        // count all 1s in entire binary column
        // e.g. 1s column has 10 1s, 2s column has 2 1s, 4s column has 9 1s etc
        arr
          .map((row) => (row & Math.pow(2, col) ? 1 : 0) as number)
          .reduce((r1, r2) => r1 + r2)
      );

    const gammaArray = columnBitSum(decimal)
      // map each column to whether more 1s or 0s, true if more 1s
      .map((v) => v > colLength - v)
      .map(Number)
      // reverse so it is biggest to smallest like normal binary
      .reverse();

    const epsilonArray = gammaArray.map((x) => (x ? 0 : 1));

    return {
      binary,
      decimal,
      rowLength,
      colLength,
      toNumber,
      columnBitSum,
      gammaArray,
      epsilonArray,
    };
  };

  part1 = async () => {
    const { toNumber, gammaArray, epsilonArray } = this.commonValues();

    const [gamma, epsilon] = [toNumber(gammaArray), toNumber(epsilonArray)];

    return gamma * epsilon;
  };

  part2 = async () => {
    const { decimal, rowLength, columnBitSum } = this.commonValues();

    const bitCriteria = (
      col: number,
      matchingBitArray: number[],
      filteredList: number[]
    ) =>
      filteredList.filter(
        (row) => ((row >>> (rowLength - col - 1)) & 1) === matchingBitArray[col]
      );

    const recursive = (
      bitCriteriaMapper: (_: number) => (_: number) => boolean,
      remaining = decimal,
      column = 0
    ): number => {
      if (remaining.length === 1) {
        return remaining[0];
      }

      const mostCommonBitArray = columnBitSum(remaining)
        .map(bitCriteriaMapper(remaining.length))
        .map(Number)
        .reverse();

      const oxygen = bitCriteria(column, mostCommonBitArray, remaining);
      return recursive(bitCriteriaMapper, oxygen, column + 1);
    };

    const oxygenRating = recursive((length) => (v) => {
      const notV = length - v;
      if (v === notV) {
        return v === 1;
      }
      return v > notV;
    });

    const c02Rating = recursive((length) => (v) => {
      const notV = length - v;
      if (v === notV) {
        return v === 0;
      }
      return v < notV;
    });

    return oxygenRating * c02Rating;
  };
}
