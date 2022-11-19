import dayjs from "dayjs";

export function getRemainingUntilMsTimestamp(timestampMs) {

    const timestampDayjs = dayjs(timestampMs)
    const nowDayjs = dayjs();
    // if(timestampDayjs.isBefore(nowDayjs)) {
    //     return {
    //         seconds: "0",
    //         minutes: "0",
    //         hours: "0",
    //     }
    // }

    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
        hours: getRemainingHours(nowDayjs, timestampDayjs)
    }
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return seconds;
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return minutes;
}

function getRemainingHours(nowDayjs, timestampDayjs) {
    const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24;
    return hours;
}