class ConvertTime {
    constructor() {}

    static covertTimeToNumber = (minutes = "", seconds = "", miliSeconds) => {

        const returnTime = minutes + seconds + miliSeconds;
        if (returnTime.length > 5) {
            const splitTime = returnTime.split(':');
            const result = Number(splitTime[0]) * 60 + Number(splitTime[1]);
            return (result.toFixed(2));
        } else {
            return Number(returnTime)
        }
    }

    static convertTimeToString = (time) => {
        // console.log(time)
        let result = 0;
        if (time > 60) {
            const minutes = Math.floor(time / 60);
            const rest = (time - (60 * minutes)).toFixed(2);
            // console.log(rest)
            if (rest.length < 5) {
                result = `${minutes}:0${rest}`
            } else result = `${minutes}:${rest}`

            return result

        } else return time.toFixed(2);
    }
}