export const getRemainingTime = (expiryDate) => {
  if (!expiryDate) {
    return { hours: "00", minutes: "00", seconds: "00" };
  }

  const now = new Date().getTime();
  const end = new Date(expiryDate).getTime();
  const distance = end - now;

  if (distance <= 0) {
    return { hours: "00", minutes: "00", seconds: "00" };
  }

  const hours = Math.floor(distance / (1000 * 60 * 60));
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
  };
};
