import { useEffect, useState } from 'react'

const TimerCountDown = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const intervalID = setInterval(() => {
       const timeRemaining = calculateTimeLeft()
       setTimeLeft(timeRemaining)

       if (timeRemaining.total <= 0){
         clearInterval(intervalID)
       }
    }, 1000);

    return () => clearInterval(intervalID)
 }, [endTime])

 function calculateTimeLeft() {
   const difference = new Date(endTime) - new Date();
   let timeLeft = {};

   if (difference > 0) {
     timeLeft = {
       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
       minutes: Math.floor((difference / 1000 / 60) % 60),
       seconds: Math.floor((difference / 1000) % 60),
       total: difference,
     };
   } else {
     timeLeft = {
       days: 0,
       hours: 0,
       minutes: 0,
       seconds: 0,
       total: 0,
     };
   }

   return timeLeft;
 }
  

  return (
    <div className='de_countdown'>
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  )
}

export default TimerCountDown