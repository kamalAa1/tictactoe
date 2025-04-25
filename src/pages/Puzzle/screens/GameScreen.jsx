import React, { useContext } from 'react';
import GameBoard from '../components/board/GameBoard';
import GameControls from '../components/controls/GameControls';
import { GameContext } from '../store/GameContext';

const GameScreen = () => {
  const { game, puzzleImage } = useContext(GameContext);

  return (
    <React.Fragment>
      {game?.startTime && (
        <div className="flex flex-col items-center justify-center m-auto">
          <p className="text-lg text-white mb-1">Target : </p>
          <div className="w-full h-24">
            <img
              src={puzzleImage}
              alt="puzzle_img"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      )}
      <GameBoard />
      <GameControls />
    </React.Fragment>
  );
};

export default GameScreen;
