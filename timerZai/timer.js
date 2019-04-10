const times = document.querySelector(".times");
const display = document.querySelector(".display");
const timesFromDatabase = document.querySelectorAll(".delete");



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

let bestTime = 10000;
let worstTime = 0;
let avg5Value = 0;

let bestInAvg = 1000;
let worstInAvg = 0;

let deleteTimeIndex = 0;
let i = 1; //dziłanie spacji
let k = 0; //iterator tablicy do zapisywania czasów
let numberOfTimes = 0; //ilosc wszystkich czasów

let numberOfChildren = 0;

function timer() {
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

function valuesFromDatabase() {
    numberOfChildren = times.childElementCount;

    for (let i = 0; i < numberOfChildren; i++) {
        timesTable[k] = timesFromDatabase[i].textContent;
        numberOfTimes++;
        best();
        worst();
        if (numberOfTimes >= 5) avg5();
        updateStats();
        k++;
    }

}

// function insertToDatabase() {
//     let lastTIme = document.querySelector(".times: nth-last-child(1)").innerHTML;
//     let httpr = new XMLHttpRequest();
//     httpr.open("POST", "insert.php", true);
//     httpr.setRequestHeader("Content-type", "application");
//     httpr.onreadystatechange = function () {
//         if () {

//         }
//     }
// }
function getTime() {
    var req = new XMLHttpRequest();
    req.open('GET', 'uploadTimes.php?time=' + parseFloat(timesTable[k]).toFixed(2) + '&scramble=' + scramble, true);

    req.onload = function () {
        if (req.status == 200) {
            console.log(req.response);
            name = req.response;
        } else {
            console.log(req.statusText);
        }
    }
    req.onerror = function () {
        console.log("chujnia cos jeblo");
    }
    req.send();
}

function saveTime() {
    timesTable[k] = displayMinutes + displaySeconds + displayMiliSeconds; //dodaje czas do tablicy
    let tmpSpan = document.createElement("div"); // tworzy diva
    let tmpTime = document.createTextNode(timesTable[k]); //tworzy text z czasu
    tmpSpan.appendChild(tmpTime); //wkłada do diva text
    tmpSpan.classList.add("delete"); //nadaje klase
    tmpSpan.onclick = timeDelete; //nadaje funkcje usuwania czasu na kliknięcie

    times.appendChild(tmpSpan); // wkłada do klasy .times spana
    numberOfTimes++;
    best();
    worst();
    if (numberOfTimes >= 5) avg5();
    getTime();
    updateStats();
    k++;
    // insertToDatabase();
}


function start() {
    if (status = "stopped") {
        reset();
        interval = window.setInterval(timer, 10);
        status = "started";
        i = 2;
    }
}

function stop() {
    i = 3;
    if (status = "started") {
        window.clearInterval(interval); //"stopping interval" zatrzymuje odliczanie timera
        status = "stopped";
        resetScramble();
        generateScramble();
        display.style.color = "black";
    }
}

function reset() {
    i = 1;
    miliSeconds = 0;
    seconds = 0;
    minutes = 0;
    document.querySelector(".display").innerHTML = "00:00";
}


window.addEventListener("keyup", function (e) { //start czas
    if (e.keyCode == "32" && i == 1) start();
});

window.addEventListener("keydown", function (e) {
    display.style.color = "gold";
    if (e.keyCode == "32" && i == 2) stop(), saveTime(); //stop czas
});

window.addEventListener("keyup", function (e) { //zmiana i
    if (e.keyCode == "32" && i == 3) i = 1;
    if (e.keyCode == "27") stop(), reset();
});

// window.addEventListener("keyup", function (e) { ///reset czasu
//     if (e.keyCode == "27") stop(), reset();
// });

function timeDelete() {

    let ifConfirm = confirm("Do you wanna delete?" + $(this).index());
    if (ifConfirm == true) {

        deleteTimeIndex = $('.delete').index(this); //sprawdzanie jaki index ma czas i następnie usuwanie go z tablicy
        deleteTimeFromTable(deleteTimeIndex);

        times.removeChild(this); //usuwanie czasu ze strony
        timesTable.splice((numberOfTimes - 1), 1); //usuwanie ostatniego elementu z tablicy

        k--;
        numberOfTimes--;
        if (numberOfTimes >= 5) avg5();
        updateStats();
    }
}


document.querySelector(".statsButton").addEventListener("click", function () {
    document.querySelector(".mainStats").classList.toggle("mainStatsClick");
})


function best() {
    for (let i = 0; i < numberOfTimes; i++) {
        if (timesTable[i] < bestTime) bestTime = timesTable[i];
    }
}

function worst() {
    for (let i = 0; i < numberOfTimes; i++) {
        if (timesTable[i] > worstTime) worstTime = timesTable[i];
    }
}

function avg5() {
    avg5Value = 0;
    bestInAvg = 1000;
    worstInAvg = 0;
    for (let i = (numberOfTimes - 5); i < numberOfTimes; i++) {

        if (timesTable[i] < bestInAvg) bestInAvg = timesTable[i];
        if (timesTable[i] > worstInAvg) worstInAvg = timesTable[i];

        avg5Value += Number(timesTable[i]);
    }
    avg5Value -= Number(bestInAvg);
    avg5Value -= Number(worstInAvg);
    avg5Value /= 3;
}

function deleteTimeFromTable(x) {

    for (let i = x; i < numberOfTimes; i++) {
        timesTable[i] = timesTable[i + 1];
        //timesTable[x] = 6;
    }
}


function updateStats() {
    document.querySelector(".mainStats :nth-child(1) span").innerHTML = numberOfTimes; // updatetuje liczbe czasów //usuwanie czasu
    document.querySelector(".mainStats :nth-child(2) span").innerHTML = bestTime; // updatetuje najlepszy czas
    document.querySelector(".mainStats :nth-child(3) span").innerHTML = worstTime; // updatetuje najgorszy czas
    document.querySelector(".mainStats :nth-child(4) span").innerHTML = avg5Value.toFixed(2); // updatetuje srednia z 5
}
// if (k > 0) {
//     const deleteTime = document.querySelector(".delete");
//     deleteTime.addEventListener("click", function () {
//         times.style.backgroundColor = "red";
//     });
// }