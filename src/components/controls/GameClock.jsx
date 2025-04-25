import { useContext, useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { GameContext } from '../../store/GameContext';
import GameInfo from './GameInfo';

const GameClock = () => {
  const { game } = useContext(GameContext);

  const [clock, setClock] = useState('00:00.000');

  useEffect(() => {
    const updateClock = () => {
      if (!game || !game.startTime) {
        setClock('00:00.000');
        return null;
      }
      const elapsed = game.getElapsedTime(); // This should return time in milliseconds

      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      const milliseconds = elapsed % 1000;

      setClock(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
      );
    };

    if (!game || !game?.startTime || game.pauseTime || game.gameWon) {
      updateClock();
      return;
    }

    let interval = setInterval(updateClock, 10);

    return () => clearInterval(interval);
  }, [game, game?.startTime, game?.pauseTime, game?.gameWon]);

  return (
    <GameInfo label="time" icon={<IoMdTime />}>
      {clock}
    </GameInfo>
  );
};

export default GameClock;
