
const getSliceString = (text: string, start: number, length: number) => {

    if (text.length > length) {

        return `${text.slice(start, length)} ...`;
    }

    return text;

}

export const StringHelper = { getSliceString };