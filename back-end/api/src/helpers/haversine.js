const haversine = require('haversine');

module.exports = {

    /**
     * 
     * @param {Object} start latitude, longitude
     * @param {Object} end latitude, longitude
     * @returns Integer
     */
    async getDistanceBetween2Points(start, end) {
        return Math.round(haversine(start, end) * 100) / 100;
    }
}
