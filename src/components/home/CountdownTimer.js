function updateTime(date) {
  let time = []

  let millisLeft = date - Date.now();

  if (millisLeft < 0) {
    millisLeft = 0;
  }

  // Convert to time units
  let totalSeconds = Math.floor(millisLeft / 1000);
  let seconds = totalSeconds % 60;

  let totalMinutes = Math.floor(totalSeconds / 60);
  let minutes = totalMinutes % 60;

  let hours = Math.floor(totalMinutes / 60);

  // Pad values
  let hoursText = hours.toString().padStart(1, "0");
  let minutesText = minutes.toString().padStart(2, "0");
  let secondsText = seconds.toString().padStart(2, "0");

  time[0] = hoursText;
  time[1] = minutesText;
  time[2] = secondsText;

  return `${time[0]}h ${time[1]}m ${time[2]}s`

}

export default updateTime;
