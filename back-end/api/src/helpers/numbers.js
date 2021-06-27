module.exports = {

    isInt(n) {
        return Number(n) === n && n % 1 === 0;
    },

    isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }

};