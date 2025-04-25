/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import {
  generateBoardWithPresolvedShuffle,
  generateBoardWithSimpleShuffle,
  generateRectangularBoardWithPresolvedShuffle,
  generateRectangularBoardWithSimpleShuffle,
} from '../../../util/BoardGenerator';
import {
  checkAllPossibleMatches,
  checkSimplestPath,
} from '../../../util/PathLogic';

import { GameTypes } from '../../../util/GameTypes';

import GameTimer from './GameTimer';

import queryString from 'query-string';
import { IoIosPause } from 'react-icons/io';
import { IoHelpOutline } from 'react-icons/io5';
import { TbPlayerTrackPrev } from 'react-icons/tb';
import GameBoard from '../Board/GameBoard';
import GameWinModal from '../Modals/GameWinModal';
import HelpModal from '../Modals/HelpModal';
import PauseModal from '../Modals/PauseModal';

export default function Game() {
  const gameStateVer = 7;
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  // ----------------
  // Begin State List
  // ----------------

  //
  // Game Settings and Debug Options
  //

  // When enabled, use emojis instead of text glyphs for the game tiles.
  // Automatically determined by the browser capabilities, but can be toggled
  // manually as a debugging option.
  const [useEmoji, setUseEmoji] = useState(false);

  // Replace the Red Dragon tile with another, as some browsers do not support
  // it correctly.
  const [fixRedDragonBugs, setFixRedDragonBugs] = useState(false);

  // Debug / Cheat: Show all tiles matching the currently selected tile.
  const [showMatchingTiles, setShowMatchingTiles] = useState(false);

  // Debug / Cheat: Show all valid matches on the board.
  const [showAllValidMatches, setShowAllValidMatches] = useState(true);

  // Toggles the ability to cycle through a matching pair as a "hint". Currently
  // not available as an option.
  const [canUseHint, setCanUseHint] = useState(true);

  // Determines when the currently-selected tile would be deselected after
  // another click, either when clicking another tile, the same tile, or any
  // tile. Currently not available as an option.
  const DeselectBehavior = {
    ON_ANOTHER_TILE: 'ON_ANOTHER_TILE',
    ON_SAME_TILE: 'ON_SAME_TILE',
    ON_ANY_TILE: 'ON_ANY_TILE',
  };
  const [deselectBehavior, setDeselectBehavior] = useState(
    DeselectBehavior.ON_ANY_TILE
  );

  //
  // Modals
  //

  const GameModals = {
    HELP: 'HELP',
    PAUSE: 'PAUSE',
    // SETTINGS_ADVANCED: 'SETTINGS_ADVANCED',
    // SETTINGS_BACKGROUND: 'SETTINGS_BACKGROUND',
    // LAYOUT_EDIT: 'LAYOUT_EDIT',
    // NEW_BOARD: 'NEW_BOARD',
    GAME_WON: 'GAME_WON',
    // GAME_LOST: 'GAME_LOST',
  };

  // Determines whether or not the modal is displayed.
  const [modalDisplayed, setModalDisplayed] = useState(false);

  // Current modal.
  const [modalState, setModalState] = useState(null);

  // Modal "history" for pressing the back button.
  const [prevModalState, setPrevModalState] = useState(null);

  //
  // Board Generation
  //

  // The type of game being played.
  const [gameType, setGameType] = useState(GameTypes.TWOCORNER);

  // Board dimensions, for use with basic board generation with certain
  // gametypes.
  const [boardWidth, setBoardWidth] = useState(5); // 17
  const [boardHeight, setBoardHeight] = useState(4); // 8

  // The code to represent the tile structure.
  const [layoutCode, setLayoutCode] = useState(null);

  // Determines the "seed" for the randomized tile selection.
  const [seed, setSeed] = useState(1);

  // If enabled, do a faster simple shuffle that does not gaurantee
  // winnable boards, for an extra challenge.
  const [blindShuffle, setBlindShuffle] = useState(false);

  // If enabled, do not force quads in smaller boards, for an extra challenge.
  const [allowSinglePairs, setAllowSinglePairs] = useState(false);

  //
  // Game and Board State
  //

  // Whether or not the game ended.
  const [gameEnded, setGameEnded] = useState(true);

  // The overall tile state. Uses an array of the object
  // {id, char}
  const [tiles, setTiles] = useState([]);

  // The current selected tile.
  const [selectedTile, setSelectedTile] = useState(null);

  // Shortcut for the number of tiles.
  const [numTiles, setNumTiles] = useState(20); // 136

  // The history of each match made in the current game. Uses an array of the
  // object {char, tile1, tile2}, with tile1 and tile2 being ids.
  const [tileHistory, setTileHistory] = useState([]);

  // List of tiles that are currently in its removal animation.
  const [tilesInRemovalAnimation, setTilesInRemovalAnimation] = useState([]);

  // All tiles matching the same char as the selected tile. Used alongside
  // showMatchingTiles.
  const [hintedTiles, setHintedTiles] = useState([]);

  // All matching tile pairs. Uses a multi-dimensional array of the structure
  // [[tile1, tile2], ...], with tile1 and tile2 being ids.
  const [allValidMatchingTiles, setAllValidMatchingTiles] = useState([]);

  // Shuffled version of the above state, for when the player clicks the Hint
  // button to show a random match.
  const [allValidMatchesAtRandom, setAllValidMatchesAtRandom] = useState([]);

  // Determines which match from the shuffled array to display.
  const [allValidMatchesRandomCycle, setAllValidMatchesRandomCycle] =
    useState(0);

  // Determines if one of the matches from the above state are being displayed.
  const [randomMatchDisplayed, setRandomMatchDisplayed] = useState(false);

  // For certain gametypes, this shows the path between two tiles for display as
  // line segments. Uses an array for each tile location, which are arrays showing
  // the segment's direction in strings (which are concatenasted, with "-start"
  // and "-end" to show the endpoints)
  const [pathingTiles, setPathingTiles] = useState([]);

  // --------------
  // End State List
  // --------------

  const [searchParams] = useSearchParams();

  const timerRef = useRef();

  // First time initialization.
  useEffect(() => {
    checkFontCompatibility();

    const gameState = loadGameState(),
      layout = searchParams?.get('g'),
      seed = searchParams?.get('s'),
      blindShuffle = searchParams?.get('ts') !== null,
      allowSinglePairs = searchParams?.get('sp') !== null;

    // Get the initial board, in order of priority:
    // - Create from URL search parameters. (Shared hyperlink)
    // - Recreate from the browser's web storage. (Persistence)
    // - Create basic 17x8 board. (Default)
    if (gameType !== null && layout !== null) {
      resetGameState({
        newGameType: gameType,
        newLayoutCode: layout,
        newSeed: seed,
        newBoardWidth: null,
        newBoardHeight: null,
        newBlindShuffle: blindShuffle,
        newAllowSinglePairs: allowSinglePairs,
      });
    } else if (
      gameState !== null &&
      'v' in gameState &&
      gameState.v === gameStateVer
    ) {
      try {
        setTiles(gameState.tiles);
        setGameType(gameState.gameType);
        setBoardWidth(gameState.boardWidth);
        setBoardHeight(gameState.boardHeight);
        setSeed(gameState.seed);
        setLayoutCode(gameState.layoutCode);
        setBlindShuffle(gameState.blindShuffle);
        setAllowSinglePairs(gameState.allowSinglePairs);
        setNumTiles(gameState.numTiles);
        setTileHistory(gameState.tileHistory);

        const newTimer = new Date();

        newTimer.setSeconds(
          newTimer.getSeconds() +
            gameState.timer.seconds +
            gameState.timer.minutes * 60 +
            gameState.timer.hours * 3600
        );

        timerRef.current.reset(newTimer);

        setGameEnded(false);
      } catch {
        resetGameState({ newSeed: null, newBoardWidth: 6, newBoardHeight: 4 });
      }
    } else {
      resetGameState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get the current game state from the browser's web stoarge.
  function loadGameState() {
    // Check if LocalStorage is active.
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('test', '1');
        if (localStorage.getItem('test') === '1') {
          localStorage.removeItem('test');
        }
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }

    const gameStateJson = localStorage.getItem('gamestate');

    if (gameStateJson !== null) {
      return JSON.parse(gameStateJson);
    } else {
      return null;
    }
  }

  // Save the current game state to the browser's web storage.
  function saveGameState() {
    // Check if LocalStorage is active.
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('test', '1');
        if (localStorage.getItem('test') === '1') {
          localStorage.removeItem('test');
        }
      } catch (e) {
        return;
      }
    } else {
      return;
    }

    localStorage.setItem(
      'gamestate',
      JSON.stringify({
        v: gameStateVer,
        gameType: gameType,
        tiles: tiles,
        boardWidth: boardWidth,
        boardHeight: boardHeight,
        seed: seed,
        layoutCode: layoutCode,
        blindShuffle: blindShuffle,
        allowSinglePairs: allowSinglePairs,
        numTiles: numTiles,
        tileHistory: tileHistory,
        timer: {
          seconds: timerRef.current.seconds,
          minutes: timerRef.current.minutes,
          hours: timerRef.current.hours,
        },
      })
    );
  }

  // Checks with some font issues regarding the Mahjong Tiles Unicode Block.
  function checkFontCompatibility() {
    // Currently, all mahjong tiles are Non-RGI with the exception of Red Dragon,
    // and the only system font that supports all of these tiles as emojis is the
    // Segoe UI Emoji family, included in Windows 10+.
    //
    // It is unlikely that future Unicode Emoji specifications will support
    // all tiles as RGI, and I'm unsure if other system font providers will
    // support them (whether in the proper orientation or just outright).
    // So for now, we'll just assume that only desktop Windows 10+ can run the
    // emoji mode.
    if (navigator.userAgentData)
      // Use the UA-CH API, if able.
      navigator.userAgentData
        .getHighEntropyValues(['platformVersion'])
        .then((ua) => {
          if (ua.platform === 'Windows' && parseInt(ua.platformVersion) >= 1) {
            console.log('Windows 10+ detected, using emoji tiles.');
            setUseEmoji(true);

            // Windows 11+ changes the angle of the Red Dragon emoji.
            // Replace with a different emoji.
            if (parseInt(ua.platformVersion) >= 13) {
              setFixRedDragonBugs(true);
            }
          }
        });
    else if (
      window.navigator &&
      /Windows NT \d{2}/.test(window.navigator.userAgent)
    ) {
      // Check the User Agent directly, if the UA-CH API cannot be accessed.
      console.log('Windows 10+ detected, using emoji tiles.');
      setUseEmoji(true);

      // Windows 11+ changes the angle of the Red Dragon emoji. Although we
      // should only replace it with a different emoji outside of Windows 10,
      // they have chosen not to update the UA in favor of switching over to
      // UA-CH. As it is impossible to use UA to detect modern Windows versions,
      // just replace the emoji for all modern Windows versions.
      setFixRedDragonBugs(true);
    }

    // Chrome for Android has a bug where it'll not respect VS15/U+FE0E and
    // always render the Red Dragon tile as emoji. For now, just replace it
    // with a red version of the blue White Dragon tile.
    if (
      navigator.userAgentData
        ? navigator.userAgentData.brands.some((item) => {
            return item.brand === 'Chromium';
          }) === true && navigator.userAgentData.mobile === true
        : window.navigator &&
          window.navigator.userAgent.includes('Chrome') &&
          window.navigator.userAgent.includes('Mobile')
    ) {
      setFixRedDragonBugs(true);
    }
  }

  // Resets the game state while generating a new board.
  function resetGameState({
    newGameType = GameTypes.TWOCORNER,
    newLayoutCode = layoutCode,
    newSeed,
    newBoardWidth = boardWidth,
    newBoardHeight = boardHeight,
    newBlindShuffle = blindShuffle,
    newAllowSinglePairs = allowSinglePairs,
  } = {}) {
    let generatedBoard;

    if (newLayoutCode != null) {
      // Generate the board based on the provided layout code. Fallback to the
      // default board if it fails.

      if (newBlindShuffle) {
        generatedBoard = generateBoardWithSimpleShuffle(
          newSeed,
          newLayoutCode,
          newAllowSinglePairs
        );
      } else {
        generatedBoard = generateBoardWithPresolvedShuffle(
          newSeed,
          newLayoutCode,
          newAllowSinglePairs
        );
      }

      if (generatedBoard === null) {
        console.error(
          'Invalid generated board, switching to default 17x8 board.'
        );

        generatedBoard = generateRectangularBoardWithPresolvedShuffle(
          null,
          5,
          4
        );
      }
    } else {
      // Generate a basic rectangular board based on the provided width and
      // height.

      if (newBlindShuffle) {
        generatedBoard = generateRectangularBoardWithSimpleShuffle(
          newSeed,
          newBoardWidth,
          newBoardHeight,
          newAllowSinglePairs
        );
      } else {
        generatedBoard = generateRectangularBoardWithPresolvedShuffle(
          newSeed,
          newBoardWidth,
          newBoardHeight,
          newAllowSinglePairs
        );
      }
    }

    if (generatedBoard === null) {
      console.log('Failed to generate board! Cancel board reset.');
      return;
    }

    setTiles(generatedBoard.tiles);
    setBoardWidth(generatedBoard.width);
    setBoardHeight(generatedBoard.height);
    setSeed(generatedBoard.seed);
    setLayoutCode(generatedBoard.layoutCode);
    setBlindShuffle(newBlindShuffle);
    setAllowSinglePairs(newAllowSinglePairs);
    setNumTiles(generatedBoard.numTiles);
    setSelectedTile(null);
    setTileHistory([]);
    setHintedTiles([]);
    setAllValidMatchingTiles([]);
    setAllValidMatchesAtRandom([]);
    setPathingTiles([]);
    setTilesInRemovalAnimation([]);
    setModalDisplayed(false);
    setGameEnded(false);
    timerRef.current.reset();
  }

  // Every time the tile array is updated, save the game state and check the
  // number of valid matches.
  useEffect(() => {
    if (!gameEnded) {
      checkAllValidMatches();
      saveGameState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tiles]);

  // Check all possible matches for the current board. Display them in debugging
  // options, and check the game end state when there are no matches remaining.
  function checkAllValidMatches() {
    const allValidMatches = checkAllPossibleMatches(
      tiles,
      boardWidth,
      boardHeight
    );

    // console.log(`Number of Valid Matches: ${allValidMatches.length}`);

    // Debug: Show all the valid matches in the console.
    if (showAllValidMatches) {
      console.log(
        'Valid Matches: ' +
          allValidMatches.reduce(
            (a, b) =>
              a.concat(
                `[${String.fromCodePoint(0x1f000 + tiles[b[0]].char)}, ${
                  (b[0] % (boardWidth + 2)) - 1 + 1
                },${
                  (b[0] - (b[0] % (boardWidth + 2)) - (boardWidth + 2)) /
                    (boardWidth + 2) +
                  1
                } <-> ${(b[1] % (boardWidth + 2)) - 1 + 1},${
                  (b[1] - (b[1] % (boardWidth + 2)) - (boardWidth + 2)) /
                    (boardWidth + 2) +
                  1
                }] `
              ),
            ''
          )
      );
    }

    setAllValidMatchingTiles([...new Set(allValidMatches.flat())]);

    // Use Fisher-Yates shuffle to shuffle the valid matches array. That way,
    // when the player clicks the hint button, it'll display a random match,
    // with subsequent clicks displaying another random match through the array.
    const allValidMatchesAtRandom = allValidMatches.slice();

    {
      let curIndex = allValidMatchesAtRandom.length,
        randIndex;

      while (curIndex !== 0) {
        randIndex = Math.floor(Math.random() * curIndex);
        curIndex--;

        [
          allValidMatchesAtRandom[curIndex],
          allValidMatchesAtRandom[randIndex],
        ] = [
          allValidMatchesAtRandom[randIndex],
          allValidMatchesAtRandom[curIndex],
        ];
      }
    }

    setAllValidMatchesAtRandom(allValidMatchesAtRandom);
    setAllValidMatchesRandomCycle(0);
    setRandomMatchDisplayed(false);

    // If there are no matching tiles, then we either won or lost the game.
    if (allValidMatches.length === 0) {
      timerRef.current.pause();
      setGameEnded(true);

      if (numTiles - tileHistory.length * 2 > 0)
        showModal(GameModals.GAME_LOST);
      else showModal(GameModals.GAME_WON);
    }
  }

  function handleTileClick(tileId) {
    if (tiles[tileId].char === null) {
      // Clicked an empty space.
      return;
    } else if (selectedTile === tileId) {
      // Clicked the same tile.
      if (
        deselectBehavior === DeselectBehavior.ON_SAME_TILE ||
        deselectBehavior === DeselectBehavior.ON_ANY_TILE
      ) {
        setSelectedTile(null);
        setHintedTiles([]);
      }
    } else if (
      selectedTile !== null &&
      tiles[tileId].char === tiles[selectedTile].char
    ) {
      // Clicked a matching tile.

      const path = checkSimplestPath(
        tileId,
        selectedTile,
        tiles.slice(),
        boardWidth,
        boardHeight
      );

      if (path !== null) {
        // There is a correct path between them. These tiles are matched!

        // Push the match into the tile history stack.
        setTileHistory([
          ...tileHistory,
          {
            char: tiles[tileId].char,
            tile1: tileId,
            tile2: selectedTile,
          },
        ]);

        // Put both tiles in their removal animation.
        setTilesInRemovalAnimation([
          { ...tiles[tileId] },
          { ...tiles[selectedTile] },
        ]);

        // Blank out both tiles.
        const newTiles = tiles.slice();
        newTiles[tileId].char = null;
        newTiles[selectedTile].char = null;
        setTiles(newTiles);

        // Generate the pathing tiles for display.
        const pathingTiles = tiles.map(() => []);

        path.forEach((line) => {
          line.segment.forEach((node) => {
            pathingTiles[node].push(line.dir);
          });
        });

        pathingTiles[tileId].push('-start');
        pathingTiles[selectedTile].push('-end');

        setPathingTiles(pathingTiles);

        setSelectedTile(null);
        setHintedTiles([]);
      } else if (
        deselectBehavior === DeselectBehavior.ON_ANOTHER_TILE ||
        deselectBehavior === DeselectBehavior.ON_ANY_TILE
      ) {
        // There is no correct path. Select it if necessary.

        setSelectedTile(tileId);

        // Update the hinting system, if it's enabled.
        if (showMatchingTiles === true) {
          const hintedTiles = tiles.filter(
            (t) => t.char === tiles[tileId].char
          );

          setHintedTiles(hintedTiles);
        }
      }
    } else if (
      selectedTile === null ||
      deselectBehavior === DeselectBehavior.ON_ANOTHER_TILE ||
      deselectBehavior === DeselectBehavior.ON_ANY_TILE
    ) {
      // Clicked a non-matching tile.
      setSelectedTile(tileId);

      // Update the hinting system, if it's enabled.
      if (showMatchingTiles === true) {
        const hintedTiles = tiles.filter((t) => t.char === tiles[tileId].char);

        setHintedTiles(hintedTiles);
      }
    }
  }

  // Revert the board to the previous state.
  function undoMatch({ doHideModal = false }) {
    if (tileHistory.length > 0) {
      const newTiles = tiles.slice();
      const lastMatch = tileHistory.slice(-1)[0];

      newTiles[lastMatch.tile1].char = lastMatch.char;
      newTiles[lastMatch.tile2].char = lastMatch.char;

      setTiles(newTiles);
      setTileHistory(tileHistory.slice(0, -1));
      setHintedTiles([]);
      setPathingTiles([]);
      setSelectedTile(null);
      setTilesInRemovalAnimation([]);

      if (gameEnded) timerRef.current.start();

      setGameEnded(false);

      if (doHideModal) hideModal();
    }
  }

  //   function showOneMatch() {
  //     if (!canUseHint) return;

  //     setRandomMatchDisplayed(true);

  //     setAllValidMatchesRandomCycle(
  //       (allValidMatchesRandomCycle + 1) % allValidMatchesAtRandom.length
  //     );
  //   }

  function showModal(newState) {
    timerRef.current.pause();

    setModalDisplayed(true);

    if (newState) {
      setPrevModalState(modalState);
      setModalState(newState);
    }
  }

  function hideModal() {
    if (!gameEnded) timerRef.current.start();

    setModalDisplayed(false);
  }

  function generateShareUrls() {
    const layoutUrl = `${window.location.href.split('?')[0]}?g=${layoutCode}`;

    return {
      layoutUrl,
      gameUrl: `${layoutUrl}&s=${seed}${blindShuffle ? '&ts' : ''}${
        allowSinglePairs ? '&sp' : ''
      }`,
    };
  }

  return (
    <React.Fragment>
      <GameBoard
        {...{
          boardWidth,
          boardHeight,
          tiles,
          pathingTiles,
          tilesInRemovalAnimation,
          hintedTiles,
          wholeMatchingTiles: showAllValidMatches
            ? allValidMatchingTiles
            : randomMatchDisplayed
            ? allValidMatchesAtRandom[allValidMatchesRandomCycle]
            : [],
          selectedTile,
          useEmoji,
          fixRedDragonBugs,
          handleTileClick,
        }}
      />

      <div className="!w-full fixed top-0 bg-[#657085]  select-none border-[0.25vmin] border-black shadow-[0_0_0.5em_0_black] z-1000 flex items-center justify-between h-12">
        <GameTimer ref={timerRef} />

        <div className="flex items-center gap-4 w-1/2">
          <button
            className="w-[1.2em] h-[1.2em] text-center leading-none rounded-full border-0 shadow-[0_0_0_0.75vmin_black,0_0_0.5em_0_black] bg-[#cdcdcd] text-black hover:bg-white flex items-center justify-center"
            onClick={() => showModal(GameModals.PAUSE)}
          >
            <IoIosPause className="w-6 h-6" />
          </button>
          <button
            className="text-[4vmin] w-[1.5em] h-[1.5em] text-center leading-none rounded-full border-[0.25vmin] border-black bg-[#cdcdcd] text-black m-[0.5vmin_1vmin] disabled:!bg-[#878787] disabled:!text-[#4a4a4a] flex items-center justify-center"
            onClick={undoMatch}
            disabled={tileHistory.length === 0}
          >
            <TbPlayerTrackPrev className="w-4 h-4" />
          </button>

          {/* <button
            className="text-[4vmin] w-[1.5em] h-[1.5em] text-center leading-none rounded-full border-[0.25vmin] border-black bg-[#cdcdcd] text-black m-[0.5vmin_1vmin] disabled:!bg-[#878787] disabled:!text-[#4a4a4a] flex items-center justify-center hover:bg-white"
            onClick={showOneMatch}
            disabled={!canUseHint}
          >
            <IoEyeOutline className="w-4 h-4" />
          </button> */}
          <button
            className="text-[4vmin] w-[1.5em] h-[1.5em] text-center leading-none rounded-full border-[0.25vmin] border-black bg-[#cdcdcd] text-black m-[0.5vmin_1vmin] disabled:!bg-[#878787] disabled:!text-[#4a4a4a] flex items-center justify-center hover:bg-white"
            onClick={() => showModal(GameModals.HELP)}
          >
            <IoHelpOutline className="w-5 h-5" />
          </button>
        </div>
      </div>

      {modalState === 'GAME_WON' && (
        <GameWinModal
          {...{
            numTiles,
            clearTime: timerRef.current,
            seed,
            layoutCode,
            shareUrls: generateShareUrls(),
            handleResetBoard: resetGameState,
            open: modalDisplayed,
          }}
        />
      )}

      {modalState === 'HELP' && (
        <HelpModal
          {...{ useEmoji, closeModal: hideModal, open: modalDisplayed }}
        />
      )}
      {modalState === 'PAUSE' && (
        <PauseModal
          {...{
            seed,
            layoutCode,
            tilesMatchable: allValidMatchingTiles.length,
            shareUrls: generateShareUrls(),
            resetGameState,
            hideModal,
            handleResetBoard: resetGameState,
            open: modalDisplayed,
          }}
        />
      )}
    </React.Fragment>
  );
}
