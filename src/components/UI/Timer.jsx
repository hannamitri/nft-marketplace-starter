function updateTimer(startTime, expiryTime) {
  let millisElapsed = Date.now() - startTime;
  let milliseconds = expiryTime - millisElapsed;
  if (milliseconds < 0) {
    return { expired: true };
  }
  let seconds = milliseconds / 1000;
  let minutes = seconds / 60;
  let hours = minutes / 60;

  let secondsText = (Math.floor(seconds) % 60).toString().padStart(2, "0");
  let minutesText = (Math.floor(minutes) % 60).toString().padStart(2, "0");
  let hoursText = (Math.floor(hours) % 24).toString().padStart(2, "0");
  return {
    seconds: secondsText,
    minutes: minutesText,
    hours: hoursText,
    expired: false,
  };
}

export default updateTimer;
