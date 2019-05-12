class StatsGetSet {
    constructor() {
        this.stats = {
            bestTime: 0,
            worstTime: 0,
            avg5Value: 0,
            avg12Value: 0,
            numberOfTimes: 0,
        }
        this.timesTable = [];
    }
    //---------best single-------------------
    getBestTime() {
        return this.stats.bestTime;
    }

    setBestTime(value) {
        this.stats.bestTime = value;
    }
    //---------worst single-------------------
    getWorstTime() {
        return this.stats.worstTime;
    }

    setWorstTime(value) {
        this.stats.worstTime = value;
    }
    //----------------avg5-------------------
    getAvg5() {
        return this.stats.avg5Value;
    }

    setAvg5(value) {
        this.stats.avg5Value = value;
    }
    //----------------avg12--------------------
    getAvg12() {
        return this.stats.avg12Value;
    }

    setAvg12(value) {
        this.stats.avg12Value = value;
    }
    //-----------number of times-------------------
    getNumberOfTimes() {
        return this.stats.numberOfTimes;
    }

    setNumberOfTimes(value) {
        this.stats.numberOfTimes = value;
    }
    incrementNumberOfTImes() {
        this.stats.numberOfTimes++;
    }
    decrementNumberOfTImes() {
        this.stats.numberOfTimes--
    }
    //-------------------timeTable-------------------
    getTimeTable() {
        return this.timesTable;
    }

    getRowFromTimeTable(index) {
        return this.timesTable[index];
    }

    pushToTimesTable(value) {
        this.timesTable.push(value)
    }

    clearTimeTable() {
        this.timesTable = [];
    }

    statsReset() {
        this.stats.bestTime = 0;
        this.stats.worstTime = 0;
        this.stats.avg5Value = 0;
        this.stats.avg12Value = 0;
        this.stats.numberOfTimes = 0;
    }
}