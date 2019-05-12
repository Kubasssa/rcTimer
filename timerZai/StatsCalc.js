class StatsCalc {
    constructor() {}

    best = (timesTable) => {
        return timesTable.reduce((previus, current) => Number(current) < Number(previus) ? Number(current) : Number(previus));
    }

    worst = (timesTable) => {
        return timesTable.reduce((previus, current) => Number(current) > Number(previus) ? Number(current) : Number(previus));
    }

    avg5 = (timesTable, numberOfTimes) => {
        if (numberOfTimes >= 5) {
            let avg5Value = 0;
            let bestInAvg = 1000;
            let worstInAvg = 0;
            for (let i = (numberOfTimes - 5); i < numberOfTimes; i++) {

                if (timesTable[i] < bestInAvg) bestInAvg = timesTable[i];
                if (timesTable[i] > worstInAvg) worstInAvg = timesTable[i];

                avg5Value += Number(timesTable[i]);
            }
            avg5Value -= Number(bestInAvg);
            avg5Value -= Number(worstInAvg);
            return avg5Value /= 3;
        } else return 0;
    }

    avg12 = (timesTable, numberOfTimes) => {
        if (numberOfTimes >= 12) {
            let avg12Value = 0;
            let bestInAvg = 1000;
            let worstInAvg = 0;
            for (let i = (numberOfTimes - 12); i < numberOfTimes; i++) {

                if (timesTable[i] < bestInAvg) bestInAvg = timesTable[i];
                if (timesTable[i] > worstInAvg) worstInAvg = timesTable[i];

                avg12Value += Number(timesTable[i]);
            }
            avg12Value -= Number(bestInAvg);
            avg12Value -= Number(worstInAvg);
            return avg12Value /= 10;
        } else return 0;
    }
}