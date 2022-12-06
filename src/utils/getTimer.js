export default function getTimer(expirationDateInMilliSeconds) {
  const expirationDate = new Date(expirationDateInMilliSeconds);
  const now = new Date();
  const timeLeft = expirationDate.getTime() - now.getTime();
  const timerString = new Date(timeLeft).toISOString().slice(11, 19);
  return timerString;
}
