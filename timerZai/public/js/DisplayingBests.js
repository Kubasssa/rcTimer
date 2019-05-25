class DisplayingBests {
    constructor() {}

    showBestTIme = (bestTime) => {
        const allTimes = document.querySelectorAll(".time");
        allTimes.forEach(el => {
            if (el.textContent === ConvertTime.convertTimeToString(bestTime)) {
                el.classList.toggle("timeYellowColor");
            }
        })
    }

    showWorstTIme = (worstTime) => {
        const allTimes = document.querySelectorAll(".time");
        allTimes.forEach(el => {
            if (el.textContent === ConvertTime.convertTimeToString(worstTime)) {
                el.classList.toggle("timeRedColor");
            }
        })
    }

    // showBestAvg5 = () => {
    //     const allTimes = document.querySelectorAll(".time");
    //     allTimes.forEach(el => {
    //         if (el.textContent === stats.bestTime) {
    //             el.classList.toggle("timeRedColor");
    //         }
    //     })
    // }
}