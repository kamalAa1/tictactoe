import { useWindowSize } from '@react-hook/window-size';
import queryString from 'query-string';
import { useContext, useEffect, useState } from 'react';
import { BsPauseBtn, BsPlayCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { GameContext } from '../../store/GameContext';
import BoardAction from './BoardAction';
import BoardCell from './BoardCell';

const GameBoard = () => {
  const { board, game, start, togglePause, size } = useContext(GameContext);

  const [windowWidth, windowHeight] = useWindowSize();

  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  /**
   * The cellSize, in pixels, is calculated based on the browser window size and the number of columns and row
   * that the puzzle has.
   */
  const [cellSize, setCellSize] = useState(/** @type {?number}*/ null);

  // calculates the optimal cellSize for the puzzle to be as large as possible while still fitting
  // inside the browser window
  useEffect(() => {
    // upon first render, the puzzle size is not yet defined
    if (!size) return;

    // check if wa are at the tailwind xs screen size breakpoint
    const isXsScreen = windowWidth < 639;

    // check if wa are at the tailwind xs screen size breakpoint
    const isSmScreen = windowWidth < 768;

    // figure out the maximum size that is available in the browser window after deducting
    // the space needed for the control menu
    const maxBoardX = windowWidth - (isXsScreen ? 50 : isSmScreen ? 100 : 220);
    const maxBoardY = windowHeight - (isSmScreen ? 160 : 60);

    // calculate the optimal cellSize for the individual puzzle pieces
    const maxCellX = Math.floor(maxBoardX / (size?.x || 1));
    const maxCellY = Math.floor(maxBoardY / (size?.y || 1));
    setCellSize(Math.min(maxCellX, maxCellY));
  }, [size, windowWidth, windowHeight]);

  if (!size || !board) return null;

  return (
    <div
      className="flex items-center justify-center p-1 rounded"
      style={{
        background: `#${bgColor}`,
      }}
    >
      <div
        className="relative "
        style={{
          width: size.x * cellSize,
          height: size.y * cellSize,
          background: '#fff',
        }}
      >
        {!!board &&
          !game.pauseTime &&
          board.map((cell) => (
            // render the individual puzzle pieces
            <BoardCell key={cell.id} {...cell} cellSize={cellSize} />
          ))}
        {!game.startTime && (
          // render the overlay with the "Start" button when game is not yet started
          <BoardAction onClick={start}>
            Click Here to Play
            <BsPlayCircle className="text-xl" />
          </BoardAction>
        )}
        {!!game.pauseTime && (
          // render the "Resume" button is the game is paused
          <BoardAction onClick={togglePause}>
            Resume Game Pause
            <BsPauseBtn className="text-xl" />
          </BoardAction>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
