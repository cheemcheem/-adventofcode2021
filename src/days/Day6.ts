import { Day } from "../common";

export default class Day6 extends Day {
  protected readonly dayNumber = 6;

  private static progressDay = (ages: number[]) => {
    const toAppend: number[] = [];
    ages.forEach((age, index, ages) => {
      if (age === 0) {
        toAppend.push(8);
        ages[index] = 6;
      } else {
        ages[index]--;
      }
    });

    ages.push(...toAppend);
    return ages;
  };

  part1 = async () => {
    const state = this.getString().split(",").map(Number);
    Array.from(new Array(80)).forEach(() => Day6.progressDay(state));
    return state.length;
  };

  part2 = async () => {
    const state = new Array(9).fill(0);

    this.getString()
      .split(",")
      .map(Number)
      .forEach((value) => state[value]++);

    for (let i = 0; i < 256; i++) {
      const copy = [...state];
      for (let timer = 1; timer < 9; timer++) {
        state[timer - 1] = state[timer];
      }

      state[6] += copy[0];
      state[8] = copy[0];
    }

    return state.reduce((a, b) => a + b);
  };
}
