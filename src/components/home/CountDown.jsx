import { useCountdown } from '../hooks/useCountDown';

const CountDown = ({ expiryDate }) => {
  const [hours, minutes, seconds] = useCountdown(expiryDate);

  return (
    <div className='de_countdown'>{`${hours}h ${minutes}m ${seconds}s`}</div>
  );
};

export default CountDown;
