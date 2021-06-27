/**
 * @param n Number
 * @returns Number
 */
const roundNumber = (n: number) => {

    const result = Math.floor(n * 100) / 100;
    return result;

}

export const NumberHelper = { roundNumber };