const timesContainer = document.querySelector(".timesContainer");
const display = document.querySelector(".display");
const allTimes = document.querySelectorAll(".time");
const resetBtn = document.querySelector(".resetButton");

let seconds = 0;
let miliSeconds = 0;
let minutes = 0;

let displayMiliSeconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;

let interval = null;
let status = "stopped";

let timesTable = []; //tablica z czasami xd
let scrambleTable = [] // tablica zez scramblami

let deleteTimeIndex = 0;
let i = 1; //dziłanie spacji

const stats = {
    bestTime: 0,
    worstTime: 0,
    avg5Value: 0,
    avg12Value: 0,
    numberOfTimes: 0,
}

let numberOfChildren = 0;

const statsText = document.querySelectorAll(".mainStats span");
statsText.forEach(element => {
    element.style.color = "#00cc99";
    element.style.marginLeft = "3px"
});
//------------------------------timer------------------------------
const timer = () => {
    miliSeconds++;

    if (miliSeconds / 100 == 1) {
        miliSeconds = 0;
        seconds++;


        if (seconds / 60 == 1) {
            seconds = 0;
            minutes++;
        }
    }

    if (miliSeconds < 10) {
        displayMiliSeconds = "0" + miliSeconds.toString();

    } else {
        displayMiliSeconds = miliSeconds;
    }

    if (seconds < 10 && minutes < 0) {
        displaySeconds = "" + seconds.toString() + ".";
    } else if (seconds < 10 && minutes > 0) {
        displaySeconds = seconds + ".";

    } else {
        displaySeconds = seconds + ".";
    }

    if (minutes < 10 && minutes > 0) {
        displayMinutes = "" + minutes.toString() + ":";
        if (seconds < 10) {
            displaySeconds = "0" + seconds.toString() + ".";
        }
    } else if (minutes == 0) {
        displayMinutes = "";
    } else {
        displayMinutes = minutes + ':';
    }


    document.querySelector(".display").innerHTML = displayMinutes + displaySeconds + displayMiliSeconds;
}

const start = () => {
    if (status = "stopped") {
        reset();
        interval = window.setInterval(timer, 10);
        status = "started";
        i = 2;
    }
}

const stop = () => {
    i = 3;
    if (status = "started") {
        window.clearInterval(interval); //"stopping interval" zatrzymuje odliczanie timera
        status = "stopped";
        resetScramble();
        generateScramble();
        display.style.color = "black";
    }
}

const reset = () => {
    i = 1;
    miliSeconds = 0;
    seconds = 0;
    minutes = 0;
    document.querySelector(".display").innerHTML = "00:00";
}

//-------------------------stats calc--------------------------------
const best = () => {
    stats.bestTime = timesTable.reduce((previus, current) => Number(current) < Number(previus) ? Number(current) : Number(previus));
}

const worst = () => {
    stats.worstTime = timesTable.reduce((previus, current) => Number(current) > Number(previus) ? Number(current) : Number(previus));
}

const avg5 = () => {
    if (stats.numberOfTimes >= 5) {
        stats.avg5Value = 0;
        let bestInAvg = 1000;
        let worstInAvg = 0;
        for (let i = (stats.numberOfTimes - 5); i < stats.numberOfTimes; i++) {

            if (timesTable[i] < bestInAvg) bestInAvg = timesTable[i];
            if (timesTable[i] > worstInAvg) worstInAvg = timesTable[i];

            stats.avg5Value += Number(timesTable[i]);
        }
        stats.avg5Value -= Number(bestInAvg);
        stats.avg5Value -= Number(worstInAvg);
        stats.avg5Value /= 3;
    } else stats.avg5Value = 0;
}

const avg12 = () => {
    if (stats.numberOfTimes >= 12) {
        stats.avg12Value = 0;
        let bestInAvg = 1000;
        let worstInAvg = 0;
        for (let i = (stats.numberOfTimes - 12); i < stats.numberOfTimes; i++) {

            if (timesTable[i] < bestInAvg) bestInAvg = timesTable[i];
            if (timesTable[i] > worstInAvg) worstInAvg = timesTable[i];

            stats.avg12Value += Number(timesTable[i]);
        }
        stats.avg12Value -= Number(bestInAvg);
        stats.avg12Value -= Number(worstInAvg);
        stats.avg12Value /= 10;
    } else stats.avg12Value = 0;
}
//----------------------------updating n deleting times--------------------
const deleteTimeFromTable = (timeIndex) => {
    for (let i = timeIndex; i < stats.numberOfTimes; i++) {
        timesTable[i] = timesTable[i + 1];
    }
}

const updateStats = () => {
    if (timesTable.length !== 0) {
        best();
        worst();
        avg5();
        avg12();
    } else {
        stats.numberOfTimes = 0;
        stats.worstTime = 0;
        stats.bestTime = 0;
        stats.avg5Value = 0;
        stats.avg12Value = 0;
    }
    recolorAllTimesDiv();
    document.querySelector(".mainStats :nth-child(1) span").innerHTML = stats.numberOfTimes; // updatetuje liczbe czasów //usuwanie czasu
    document.querySelector(".mainStats :nth-child(2) span").innerHTML = convertTimeToString(stats.bestTime); // updatetuje najlepszy czas
    document.querySelector(".mainStats :nth-child(3) span").innerHTML = convertTimeToString(stats.worstTime); // updatetuje najgorszy czas
    document.querySelector(".mainStats :nth-child(4) span").innerHTML = convertTimeToString(stats.avg5Value); // updatetuje srednia z 5
    document.querySelector(".mainStats :nth-child(5) span").innerHTML = convertTimeToString(stats.avg12Value); // updatetuje srednia z 5
}

const saveTime = () => {
    timesTable.push(covertTimeToNumber(displayMinutes, displaySeconds, displayMiliSeconds)); //dodaje czas do tablicy
    let tmpSpan = document.createElement("div"); // tworzy diva
    let tmpTime = document.createTextNode(convertTimeToString(timesTable[stats.numberOfTimes])); //tworzy text z czasu
    tmpSpan.appendChild(tmpTime); //wkłada do diva text
    tmpSpan.classList.add("time"); //nadaje klase

    timesContainer.appendChild(tmpSpan); // wkłada do klasy .times spana
    stats.numberOfTimes++;
    updateStats();
}

const timeDelete = function (target) {

    let ifConfirm = confirm(`Do you want to delete:  ${$(target).index()+1} time`);
    if (ifConfirm) {

        deleteTimeIndex = $('.time').index(target); //sprawdzanie jaki index ma czas i następnie usuwanie go z tablicy
        deleteTimeFromTable(deleteTimeIndex);

        timesContainer.removeChild(target); //usuwanie czasu ze strony
        timesTable.splice((stats.numberOfTimes - 1), 1); //usuwanie ostatniego elementu z tablicy

        stats.numberOfTimes--;
        updateStats();
    }
}

const allTimeDelete = () => {
    let ifConfirm = confirm(`Do you want to delete all times ?`);
    if (ifConfirm) {
        timesTable = [];

        let lastChild = timesContainer.lastElementChild;
        while (lastChild) {
            timesContainer.removeChild(lastChild);
            lastChild = timesContainer.lastElementChild;
        }
        updateStats();
    }
}


const showBestTIme = () => {
    const allTimes = document.querySelectorAll(".time");
    allTimes.forEach(el => {
        if (el.textContent === convertTimeToString(stats.bestTime)) {
            el.classList.toggle("timeYellowColor");
        }
    })
}

const showWorstTIme = () => {
    const allTimes = document.querySelectorAll(".time");
    allTimes.forEach(el => {
        if (el.textContent === convertTimeToString(stats.worstTime)) {
            el.classList.toggle("timeRedColor");
        }
    })
}

const showBestAvg5 = () => {
    const allTimes = document.querySelectorAll(".time");
    allTimes.forEach(el => {
        if (el.textContent === stats.bestTime) {
            el.classList.toggle("timeRedColor");
        }
    })
}

const recolorAllTimesDiv = () => {
    const allTimes = document.querySelectorAll(".time");
    allTimes.forEach(el => {
        el.classList.remove("timeRedColor");
        el.classList.remove("timeYellowColor");
    })
}

const covertTimeToNumber = (minutes = "", seconds = "", miliSeconds) => {
    const returnTime = minutes + seconds + miliSeconds;
    if (returnTime.length > 5) {
        const splitTime = returnTime.split(':');
        const result = Number(splitTime[0]) * 60 + Number(splitTime[1]);
        return (result.toFixed(2));
    } else {
        return Number(returnTime)
    }
}

const convertTimeToString = (time) => {
    let result = 0;
    if (time > 60) {
        const minutes = Math.floor(time / 60);
        const rest = (time - (60 * minutes)).toFixed(2);
        if (rest.length < 4) {
            result = `${minutes}:0${rest}`
        } else result = `${minutes}:${rest}`

        return result

    } else return time.toFixed(2);
}
//-----------------------event listeners--------------------------------------
window.addEventListener("keyup", (e) => { //start czas
    if (e.keyCode == "32" && i == 1) start();
});

window.addEventListener("keydown", (e) => {
    display.style.color = "gold";
    if (e.keyCode == "32" && i == 2) stop(), saveTime(); //stop czas
});

window.addEventListener("keyup", (e) => { //zmiana i
    if (e.keyCode == "32" && i == 3) i = 1;
    if (e.keyCode == "27") stop(), reset();
});

window.addEventListener("click", (e) => { //wykrywanie nacisniętego czasu
    if (e.target.className === "time") {
        timeDelete(e.target);
    }
})

resetBtn.addEventListener("click", allTimeDelete);
document.querySelector(".mainStats :nth-child(2) span").addEventListener("click", showBestTIme);
document.querySelector(".mainStats :nth-child(3) span").addEventListener("click", showWorstTIme);

// const cube = document.querySelector(".cube");
// let degHor = 0;
// let degVer = 0;
// window.addEventListener("keydown", movement)


// function movement(e) {
//     if (e.keyCode == "70") {
//         degHor += 90;
//         cube.style.transform = `translateZ(-100px) rotateY( ${degHor}deg) rotateX( ${degVer}deg)`
//     } else if (e.keyCode == "74") {
//         degHor -= 90;
//         cube.style.transform = `translateZ(-100px) rotateY( ${degHor}deg) rotateX( ${degVer}deg)`
//     } else if (e.keyCode == "73") {
//         degVer += 90;
//         cube.style.transform = `translateZ(-100px) rotateX( ${degVer}deg) rotateY( ${degHor}deg)`
//     } else if (e.keyCode == "75") {
//         degVer -= 90;
//         cube.style.transform = `translateZ(-100px) rotateX( ${degVer}deg) rotateY( ${degHor}deg)`
//     }
//     console.log(degHor, degVer)
// }