import { forwardRef, useImperativeHandle } from 'react';
import { useStopwatch } from 'react-timer-hook';

const GameTimer = forwardRef((props, ref) => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  useImperativeHandle(ref, () => ({
    start,
    pause,
    reset,
    seconds,
    minutes,
    hours,
  }));

  return (
    <div className="w-1/2">
      <span style={{ textAlign: 'center' }}>
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
});

export default GameTimer;
