import React from "react";
import { useCountdown } from "./CustomHooks/useCountDown";

const CountdownTimer = ({ targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  return (
    <div className="de_countdown">
        {`${hours}h : ${minutes}m : ${seconds}s`}
    </div>
  );
};

export default CountdownTimer;
