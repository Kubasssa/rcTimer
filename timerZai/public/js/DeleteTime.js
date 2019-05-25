class DeleteTime {
    constructor(timesContainer, updateTimes, stats) {
        this.timesContainer = timesContainer;
        this.updateTimes = updateTimes;
        this.stats = stats;
    }

    deleteTimeFromTable = (timeIndex, numberOfTimes, timesTable) => {
        for (let i = timeIndex; i < numberOfTimes; i++) {
            timesTable[i] = timesTable[i + 1];
        }
    }

    timeDelete = function (target) {
        let deleteTimeIndex = 0;
        let ifConfirm = confirm(`Do you want to delete:  ${$(target).index()+1} time`);
        if (ifConfirm) {

            deleteTimeIndex = $('.time').index(target); //sprawdzanie jaki index ma czas i następnie usuwanie go z tablicy
            this.deleteTimeFromTable(deleteTimeIndex, this.stats.getNumberOfTimes(), this.stats.getTimeTable());

            this.timesContainer.removeChild(target); //usuwanie czasu ze strony
            this.stats.getTimeTable().splice((this.stats.getNumberOfTimes() - 1), 1); //usuwanie ostatniego elementu z tablicy

            this.stats.decrementNumberOfTImes();
            this.updateTimes.updateStats();
        }
    }

    allTimeDelete = () => {
        let ifConfirm = confirm(`Do you want to delete all times ?`);
        if (ifConfirm) {
            this.stats.clearTimeTable();

            let lastChild = this.timesContainer.lastElementChild;
            while (lastChild) {
                this.timesContainer.removeChild(lastChild);
                lastChild = this.timesContainer.lastElementChild;
            }
            this.updateTimes.updateStats();
        }
    }

}