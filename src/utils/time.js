export function getTimeLeft(expiryDate) {
  const endMs = expiryDate < 1000000000000 ? expiryDate * 1000 : expiryDate;
  const diff = endMs - Date.now();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}