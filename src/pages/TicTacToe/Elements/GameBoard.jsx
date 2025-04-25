import PropTypes from 'prop-types';
import React from 'react';
import GameSquare from './GameSquare.jsx';

const GameBoard = ({
  done,
  findBestMove,
  gameSquares,
  updateBoard,
  userChar,
}) => {
  return (
    <div
      style={{
        background: 'white',
      }}
      className="p-2 rounded"
    >
      <div
        className="h-[310px] w-[310px] flex flex-wrap"
        style={{
          pointerEvents: done ? 'none' : 'auto',
        }}
      >
        {gameSquares?.map((char, idx) => {
          return (
            <GameSquare
              key={idx}
              id={idx}
              char={char}
              userChar={userChar}
              updateBoard={updateBoard}
              findBestMove={findBestMove}
            />
          );
        })}
      </div>
    </div>
  );
};

GameBoard.propTypes = {
  done: PropTypes.string,
  findBestMove: PropTypes.func,
  gameSquares: PropTypes.arrayOf(PropTypes.string),
  updateBoard: PropTypes.func,
  userChar: PropTypes.string,
};

export default GameBoard;
