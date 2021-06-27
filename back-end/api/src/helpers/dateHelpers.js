
module.exports = {

    /**
     * 
     * @param {Integer||String} day 
     * @returns String format Date '2021-03-06'
     */
    getDateBeforeDays(day) {
        const numberOfDaysBefore = parseInt(day);
        const date = new Date(Date.now() - numberOfDaysBefore * 24 * 60 * 60 * 1000);
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }
}