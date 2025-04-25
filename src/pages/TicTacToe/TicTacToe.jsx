import React, { useEffect, useState } from 'react';

import { Typography } from '@material-tailwind/react';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import GameBoard from './Elements/GameBoard';
import ClaimLoseWinModal from './Modals/ClaimLoseWinModal';

const TicTacToe = () => {
  const emptyBoard = ['', '', '', '', '', '', '', '', ''];
  const availableBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  const [gameSquares, setGameSquares] = useState(emptyBoard);
  const [availableSquares, setAvailableSquares] = useState(availableBoard);
  const [hasWon, setHasWon] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userChar, setUserChar] = useState('o');
  const [compChar, setCompChar] = useState('x');
  const [message, setMessage] = useState('');
  const [secondMessage, setSecondMessage] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();

  const { point, currency, bgColor } = queryString.parse(location.search);

  const navigate = useNavigate();

  const maxDepth = 4;
  const decisionTree = new Map();

  // check for board state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkForState = (squares = gameSquares) => {
    const wins = [
      [0, 1, 2], // horizontals
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // verticals
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonals
      [2, 4, 6],
    ];

    if (boardCleared(gameSquares)) {
      return '';
    }

    // check for wins by trio
    for (var win of wins) {
      const sq1 = squares[win[0]];
      const sq2 = squares[win[1]];
      const sq3 = squares[win[2]];
      const winCheck = [sq1, sq2, sq3];

      if (winCheck.every((sq) => sq === winCheck[0] && sq !== '')) {
        return sq1;
      }
    }

    // board is full, no more moves, win check failed, must tie
    if (gameSquares.every((sq) => sq !== '')) {
      return 'tie';
    }

    // board is not full and win check failed
    return '';
  };

  const updateBoard = (idx, asPlayer = true) => {
    asPlayer
      ? updateUsedSquares(idx, userChar)
      : updateUsedSquares(idx, compChar);

    updateAvailableSquares(idx);
  };

  // update filled squares
  const updateUsedSquares = (idx, val) => {
    gameSquares.splice(idx, 1, val);
    setGameSquares([...gameSquares]);
  };

  // update available squares
  const updateAvailableSquares = (idx) => {
    const index = availableSquares.indexOf(idx);
    if (index > -1) {
      availableSquares.splice(index, 1);
    }
    setAvailableSquares([...availableSquares]);
  };

  // board wipe
  const clearBoard = () => {
    setGameSquares(emptyBoard);
    setAvailableSquares(availableBoard);
  };

  // board is empty
  const boardCleared = (board) => board.every((sq) => sq === '');

  // recursive minimax algorithm
  // https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-3-tic-tac-toe-ai-finding-optimal-move/
  // https://www.neverstopbuilding.com/blog/minimax
  // https://en.wikipedia.org/wiki/Minimax
  const findBestMove = (
    forMax = true,
    depth = 0,
    gs = gameSquares,
    as = availableSquares
  ) => {
    // clear if no depth, that means we're starting from square one.
    if (depth === 0) {
      decisionTree.clear();
    }

    // We have proceeded to an endpoint in the currently running scenario.
    // return value of this path.
    if (checkForState(gs) !== '' || depth === maxDepth) {
      // time for some arbitrary decision making
      if (checkForState(gs) === 'o') {
        // if the move benefits o, it is maximized (rated by positivity)
        return 100 - depth;
      } else if (checkForState(gs) === 'x') {
        // if the move benefits x, it is minimized (rated by negativity)
        return -100 + depth;
      } else {
        return 0;
      }
    }

    // if forMax, o benefits, !forMax, x benefits
    // set base minimax value.
    let base = forMax ? -100 : 100;
    const char = forMax ? 'o' : 'x';

    for (var idxAsVal of as) {
      // set up a dummy game board to iterate over all scenarios
      const squares = [...gs];
      const openSquares = [...as];
      // try a move and subsequent recursion
      squares.splice(idxAsVal, 1, char);
      openSquares.splice(idxAsVal, 1);
      const nodeVal = findBestMove(!forMax, depth + 1, squares, openSquares);

      base = forMax ? Math.max(base, nodeVal) : Math.min(base, nodeVal);

      // when we are not recursing, do this.
      if (depth === 0) {
        // If we already have the value, add an index as another possible move
        // at that value.
        const moves = decisionTree.has(nodeVal)
          ? [...decisionTree.get(nodeVal), idxAsVal]
          : [idxAsVal];

        decisionTree.set(nodeVal, moves);
      }
    }

    // when we are not recursing, do this.
    if (depth === 0) {
      // remember that collection of indexes we made when value was the same?
      // now we arbitrarily choose one.

      const moveArr = boardCleared(as)
        ? [0, 2, 4, 6, 8]
        : decisionTree.get(base);
      const move = moveArr[Math.floor(Math.random() * moveArr.length)];

      updateBoard(move, false);
      return move;
    }
    // Else, return the maximized move for the next round of recursion.
    return base;
  };

  useEffect(() => {
    const { point, currency } = queryString.parse(location.search);
    if (!point || !currency) {
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    setHasWon(checkForState());
  }, [checkForState, gameSquares]);

  useEffect(() => {
    if (compChar === 'o' && boardCleared(gameSquares)) {
      findBestMove(false);
    }
  });

  useEffect(() => {
    if (userChar === 'x') {
      setCompChar('o');
    } else if (userChar === 'o') {
      setCompChar('x');
    }
  }, [userChar]);

  useEffect(() => {
    if (hasWon === 'tie') {
      setMessage(`It's a Draw match.\n Play Again!`);
      setIsModalOpen(true);
    } else if (hasWon === 'o') {
      setMessage(`You have successfully won the match`);
      setSecondMessage(`Reward : ${point} ${currency.toLowerCase()}`);
      setIsModalOpen(true);
    } else if (hasWon === 'x') {
      setMessage(`You lose the match!. Play again to get your payment!`);
      setIsModalOpen(true);
    } else if (boardCleared(gameSquares) && userChar === 'o') {
      setMessage('you first');
    } else {
      setMessage('');
    }
  }, [hasWon, gameSquares, userChar, point, currency]);

  return (
    <React.Fragment>
      <div
        className={`h-screen border border-[${bgColor}] flex flex-1 flex-col text-2xl font-outfit`}
        style={{
          border: `1px solid #${bgColor}`,
          background: `#${bgColor}`,
        }}
      >
        <div className="flex items-center justify-center px-5 pt-2 gap-2">
          <img
            src={`/assets/${currency.toLowerCase()}.png`}
            alt="coin"
            className="w-8 h-8"
          />
          <Typography
            className={`rounded-t-md text-center text-dark font-semibold text-white uppercase`}
          >
            tic tac toe
          </Typography>
          <img
            src={`/assets/${currency.toLowerCase()}.png`}
            alt="coin"
            className="w-8 h-8"
          />
        </div>

        <Typography
          variant="paragraph"
          className="px-3 text-center my-3 text-white"
        >
          Get up to {point} {currency} for playing the game
        </Typography>

        <div className="flex flex-1 items-center justify-center flex-row my-4">
          <GameBoard
            done={hasWon}
            findBestMove={findBestMove}
            gameSquares={gameSquares}
            updateBoard={updateBoard}
            userChar={userChar}
          />
        </div>

        <Typography
          variant="small"
          className="px-3 text-center my-3 text-white"
        >
          Note : You have to complete the game to get reward
        </Typography>
      </div>

      {isModalOpen && hasWon && (
        <ClaimLoseWinModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          hasWon={hasWon}
          message={message}
          clearBoard={clearBoard}
          secondMessage={secondMessage}
        />
      )}
    </React.Fragment>
  );
};

export default TicTacToe;
