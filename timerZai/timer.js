const timesContainer = document.querySelector(".timesContainer");
const display = document.querySelector(".display");
const allTimes = document.querySelectorAll(".time");

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
    bestTime: 10000,
    worstTime: 0,
    avg5Value: 0,
    numberOfTimes: 0,
}

let numberOfChildren = 0;

const statsText = document.querySelectorAll(".mainStats span");
statsText.forEach(element => {
    element.style.color = "#00cc99";
    element.style.marginLeft = "3px"
});

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
        displayMinutes = "" + minutes.toString() + ":"

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

const best = () => {
    stats.bestTime = timesTable.reduce((previus, current) => previus < current ? previus : current)
}

const worst = () => {
    stats.worstTime = timesTable.reduce((previus, current) => previus > current ? previus : current)
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

const deleteTimeFromTable = (timeIndex) => {
    for (let i = timeIndex; i < stats.numberOfTimes; i++) {
        timesTable[i] = timesTable[i + 1];
    }
}

const updateStats = () => {
    best();
    worst();
    avg5();
    document.querySelector(".mainStats :nth-child(1) span").innerHTML = stats.numberOfTimes; // updatetuje liczbe czasów //usuwanie czasu
    document.querySelector(".mainStats :nth-child(2) span").innerHTML = stats.bestTime; // updatetuje najlepszy czas
    document.querySelector(".mainStats :nth-child(3) span").innerHTML = stats.worstTime; // updatetuje najgorszy czas
    document.querySelector(".mainStats :nth-child(4) span").innerHTML = stats.avg5Value.toFixed(2); // updatetuje srednia z 5
}

const saveTime = () => {
    timesTable.push(displayMinutes + displaySeconds + displayMiliSeconds); //dodaje czas do tablicy
    let tmpSpan = document.createElement("div"); // tworzy diva
    let tmpTime = document.createTextNode(timesTable[stats.numberOfTimes]); //tworzy text z czasu
    tmpSpan.appendChild(tmpTime); //wkłada do diva text
    tmpSpan.classList.add("time"); //nadaje klase
    tmpSpan.onclick = timeDelete; //nadaje funkcje usuwania czasu na kliknięcie

    timesContainer.appendChild(tmpSpan); // wkłada do klasy .times spana
    stats.numberOfTimes++;
    updateStats();
}

const timeDelete = function () {

    let ifConfirm = confirm(`Do you want to delete:  ${$(this).index()+1} time`);
    if (ifConfirm) {

        deleteTimeIndex = $('.time').index(this); //sprawdzanie jaki index ma czas i następnie usuwanie go z tablicy
        deleteTimeFromTable(deleteTimeIndex);

        timesContainer.removeChild(this); //usuwanie czasu ze strony
        timesTable.splice((stats.numberOfTimes - 1), 1); //usuwanie ostatniego elementu z tablicy

        stats.numberOfTimes--;
        updateStats();
    }
}

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

const cube = document.querySelector(".cube");
let degHor = 0;
let degVer = 0;
window.addEventListener("keydown", movement)


// function movement(e) {
//     if (e.keyCode == "70") {
//         degHor += 90;
//         cube.style.transform = `translateZ(-100px) rotateY( ${degHor}deg)`
//     } else if (e.keyCode == "74") {
//         degHor -= 90;
//         cube.style.transform = `translateZ(-100px) rotateY( ${degHor}deg)`
//     } else if (e.keyCode == "73") {
//         degVer += 90;
//         cube.style.transform = `translateZ(-100px) rotateX( ${degVer}deg)`
//     } else if (e.keyCode == "75") {
//         degVer -= 90;
//         cube.style.transform = `translateZ(-100px) rotateX( ${degVer}deg)`
//     }
// }