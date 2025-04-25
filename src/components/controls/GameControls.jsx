import React, { useContext, useEffect, useState } from 'react';
import { TbClick } from 'react-icons/tb';
import WinModal from '../../pages/Puzzle/Modals/WinModal';
import { GameContext } from '../../store/GameContext';
import ControlButton from './ControlButton';
import GameClock from './GameClock';
import GameInfo from './GameInfo';

const GameControls = () => {
  const { game, start, togglePause, pickNewImage } = useContext(GameContext);

  const [winModalOpen, setWinModalOpen] = useState(false);

  useEffect(() => {
    if (!game?.gameWon) {
      setWinModalOpen(true);
    }
  }, [game?.gameWon]);

  return (
    <React.Fragment>
      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-row md:flex-col gap-4 justify-between">
          <GameInfo label="Moves" icon={<TbClick />}>
            {game?.moves?.length ?? 0}
          </GameInfo>
          <GameClock />
        </div>
        <div className="flex flex-row md:flex-col gap-2">
          {!game?.startTime && [
            <ControlButton onClick={start} key="startGame">
              Start Game
            </ControlButton>,
            <ControlButton onClick={pickNewImage} key="changeImage">
              Change Image
            </ControlButton>,
          ]}
          {!!game?.startTime && !game?.gameWon && (
            <ControlButton onClick={togglePause}>
              {game.pauseTime ? 'Resume' : 'Pause'}
            </ControlButton>
          )}
          {!!game?.startTime && (
            <ControlButton onClick={pickNewImage}>New Game</ControlButton>
          )}
        </div>
      </div>
      {winModalOpen && (
        <WinModal open={winModalOpen} setOpen={setWinModalOpen} />
      )}
    </React.Fragment>
  );
};

export default GameControls;
