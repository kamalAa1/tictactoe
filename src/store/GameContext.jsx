import { createContext, useCallback, useEffect, useState } from 'react';
import { pickRandomImage } from '../pages/Puzzle/data/imageList';
import Game from '../pages/Puzzle/models/Game';

export const GameContext = createContext({
  size: { x: 0, y: 0 },
  game: null,
  board: [],
  start: () => {},
  play: (x, y) => {},
  togglePause: () => {},
  puzzleImage: null,
  pickNewImage: () => {},
});

export const GameContextProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [size, setSize] = useState({ x: 2, y: 2 });

  const [imagePicked, setImagePicked] = useState(() => pickRandomImage());

  const [puzzleImage, setPuzzleImage] = useState(null);

  const [game, setGame] = useState(null);

  const [board, setBoard] = useState(null);

  // sets the dynamic path to the image used for the puzzle
  useEffect(() => {
    if (!imagePicked) return;
    // console.log(`/assets/images/${imagePicked}`);
    setPuzzleImage(`/assets/images/${imagePicked}`);
  }, [imagePicked]);

  // creates an instance of the game,
  // the dependency on the imagePicked is here to force re-render when the image changes
  useEffect(() => {
    setGame(new Game({ size }));
  }, [size, imagePicked]);

  // sets the puzzle board state, the board is what actually gets rendered by react
  useEffect(() => {
    if (!game) return;
    setBoard(game.getBoard());
  }, [game]);

  const start = useCallback(() => {
    if (!game) return;
    game.start();
    setBoard(game.getBoard());
  }, [game]);

  const play = useCallback(
    (x, y) => {
      if (!game) return;
      const isWon = game.play(x, y);
      setBoard(game.getBoard());
      // re-render the board with a delay to allow a css transition
      if (isWon) {
        const timeTaken = game.getElapsedTime(); // in seconds
        game.timeTakenToWin = timeTaken; // Store it in the game state
        setTimeout(() => setBoard(game.getBoard()), 300);
      }
    },
    [game]
  );

  const togglePause = useCallback(() => {
    if (!game) return;
    game.togglePause();
    setBoard(game.getBoard());
  }, [game]);

  const pickNewImage = useCallback(() => {
    setImagePicked(pickRandomImage());
  }, []);

  return (
    <GameContext.Provider
      value={{
        size,
        game,
        board,
        start,
        play,
        togglePause,
        puzzleImage,
        pickNewImage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
