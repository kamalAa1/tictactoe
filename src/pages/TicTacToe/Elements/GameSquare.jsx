import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

const GameSquare = ({ id, char, findBestMove, updateBoard, userChar }) => {
  const [printChar, setPrintChar] = useState('');

  // nicer 'x's and 'o's
  useEffect(() => {
    if (char === 'x') {
      setPrintChar('\u2716');
    } else if (char === 'o') {
      setPrintChar('\u2B58');
    } else {
      setPrintChar(char);
    }
  }, [char]);

  return (
    <div
      style={{
        pointerEvents: char ? 'none' : 'auto',
      }}
      className={`min-h-[100px] min-w-[100px] flex flex-1 justify-center items-center text-2xl font-noto-sans-symbols-2 cursor-pointer border border-gray-500 hover:bg-gray-300`}
      onClick={() => {
        updateBoard(id);
        if (userChar === 'o') {
          // next move is 'x'
          findBestMove(true);
        } else if (userChar === 'x') {
          // next move is 'o'
          findBestMove(false);
        }
      }}
    >
      <span
        style={{ margin: char === 'o' ? '4px 0 -4px' : null }}
        className="font-bold"
      >
        {printChar}
      </span>
    </div>
  );
};

GameSquare.propTypes = {
  id: PropTypes.number,
  char: PropTypes.string,
  findBestMove: PropTypes.func,
  updateBoard: PropTypes.func,
  userChar: PropTypes.string,
};

export default GameSquare;
