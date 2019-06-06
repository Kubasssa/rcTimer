class Main {
    constructor() {
        this.timesContainer = document.querySelector(".timesContainer");
        this.display = document.querySelector(".display");
        this.allTimes = document.querySelectorAll(".time");
        this.resetBtn = document.querySelector(".resetButton");
        this.statsText = document.querySelectorAll(".mainStats span");

        this.stats = new StatsGetSet();
        this.statsCalc = new StatsCalc();
        this.timer = new Timer(this.display);
        this.updateTimes = new UpdadeTimes(this.stats);
        this.displayingBests = new DisplayingBests();
        this.deleteTime = new DeleteTime(this.timesContainer, this.updateTimes, this.stats);

        window.addEventListener("keyup", (e) => { //start czas
            if (e.keyCode == "32" && this.timer.getI() == 1) this.timer.start();
        });

        window.addEventListener("keydown", (e) => { //stop czas
            this.display.style.color = "gold";
            if (e.keyCode == "32" && this.timer.getI() == 2) {
                this.timer.stop();
                this.updateTimes.saveTime(this.timer.getTime());
                this.insertToDB();
            }
        });

        window.addEventListener("keyup", (e) => { //zmiana i
            if (e.keyCode == "32" && this.timer.getI() == 3) this.timer.setI(1);
            if (e.keyCode == "27") this.timer.stop(), this.timer.reset();
        });

        window.addEventListener("click", (e) => { //wykrywanie nacisniętego czasu
            if (e.target.classList.contains("time")) {
                this.deleteTime.timeDelete(e.target);
            }
        })

        this.resetBtn.addEventListener("click", this.deleteTime.allTimeDelete);
        document.querySelector(".mainStats :nth-child(2) span").addEventListener("click", () => {
            this.displayingBests.showBestTIme(this.stats.getBestTime())
        });

        document.querySelector(".mainStats :nth-child(3) span").addEventListener("click", () => {
            this.displayingBests.showWorstTIme(this.stats.getWorstTime())
        });


        this.statsText.forEach(element => {
            element.style.color = "#00cc99";
            element.style.marginLeft = "3px"
        });
    }

    updateTimesFromDB() {
        this.allTimes.forEach((el) => {
            this.updateTimes.saveTime(this.convertTimeToTable(el.textContent));
            console.log(el.textContent)
            el.remove();
        })
    }

    convertTimeToTable(time) {
        if (time.length < 6) {
            let result = [];
            result.push("");

            time = time.split(".");
            time[0] += ".";

            result.push(time[0]);
            result.push(Number(time[1]));
            console.log(result);
            return result
        } else if (time.length >= 6) {
            let result = [];

            time = time.split(/[:.]/)
            time[0] += ":";
            time[1] += ".";
            console.log(time)
            result.push(time[0]);
            result.push(time[1]);
            result.push(Number(time[2]));

            console.log(result);

            return result
        }
    }

    insertToDB = async () => {
        const response = await fetch('/insertToDB', {
            method: 'POST',
            body: JSON.stringify({
                task: 5
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }


    getFromDB = async () => {
        const response = await fetch('/getTimesFromDB');
        const json = await response.json();
        console.log(json);
    }

}

const main = new Main();
main.updateTimesFromDB();