class UpdadeTimes {
    constructor(stats) {
        this.statsCalc = new StatsCalc();
        this.stats = stats;
    }

    updateStats = () => {
        console.log(this.stats.getTimeTable().length)
        if (this.stats.getTimeTable().length !== 0) {
            this.stats.setBestTime(this.statsCalc.best(this.stats.getTimeTable()));
            this.stats.setWorstTime(this.statsCalc.worst(this.stats.getTimeTable()));
            this.stats.setAvg5(this.statsCalc.avg5(this.stats.getTimeTable(), this.stats.getNumberOfTimes()));
            this.stats.setAvg12(this.statsCalc.avg12(this.stats.getTimeTable(), this.stats.getNumberOfTimes()));
        } else {
            this.stats.statsReset();
        }

        this.recolorAllTimesDiv();
        document.querySelector(".mainStats :nth-child(1) span").innerHTML = this.stats.getNumberOfTimes(); // updatetuje liczbe czasów //usuwanie czasu
        document.querySelector(".mainStats :nth-child(2) span").innerHTML = ConvertTime.convertTimeToString(this.stats.getBestTime()); // updatetuje najlepszy czas
        document.querySelector(".mainStats :nth-child(3) span").innerHTML = ConvertTime.convertTimeToString(this.stats.getWorstTime()); // updatetuje najgorszy czas
        document.querySelector(".mainStats :nth-child(4) span").innerHTML = ConvertTime.convertTimeToString(this.stats.getAvg5()); // updatetuje srednia z 5
        document.querySelector(".mainStats :nth-child(5) span").innerHTML = ConvertTime.convertTimeToString(this.stats.getAvg12()); // updatetuje srednia z 5
    }

    saveTime = (time) => {
        this.stats.pushToTimesTable(ConvertTime.covertTimeToNumber(time[0], time[1], time[2])); //dodaje czas do tablicy
        let tmpSpan = document.createElement("div"); // tworzy diva

        let tmpTime = document.createTextNode(ConvertTime.convertTimeToString(this.stats.getRowFromTimeTable(this.stats.getNumberOfTimes()))); //tworzy text z czasu
        tmpSpan.appendChild(tmpTime); //wkłada do diva text
        tmpSpan.classList.add("time"); //nadaje klase
        document.querySelector(".timesContainer").appendChild(tmpSpan); // wkłada do klasy .times spana
        this.stats.incrementNumberOfTImes();
        this.updateStats();
    }

    recolorAllTimesDiv = () => {
        const allTimes = document.querySelectorAll(".time");
        allTimes.forEach(el => {
            el.classList.remove("timeRedColor");
            el.classList.remove("timeYellowColor");
        })
    }
}