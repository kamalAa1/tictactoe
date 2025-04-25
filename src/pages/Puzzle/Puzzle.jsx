import queryString from "query-string";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import GameBoard from "../../components/board/GameBoard";
import GameControls from "../../components/controls/GameControls";
import FoundationLayout from "../../components/layout/FoundationLayout";
import { GameContext } from "../../store/GameContext";

const Puzzle = () => {
  const { game, puzzleImage } = useContext(GameContext);
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <div>
      <FoundationLayout>
        <React.Fragment>
          {game?.startTime && (
            <div
              className="flex items-center justify-center p-2 rounded-lg shadow-md w-32 m-auto"
              style={{
                background: `#${bgColor}`,
              }}
            >
              <div className="flex flex-col items-center justify-center m-auto">
                <p className="text-lg mb-1 text-white">Target : </p>
                <div className="w-full h-24">
                  <img
                    src={puzzleImage}
                    alt="puzzle_img"
                    className="w-24 h-24 object-contain"
                  />
                </div>
              </div>
            </div>
          )}
          <GameBoard />
          <GameControls />
        </React.Fragment>
      </FoundationLayout>
    </div>
  );
};

export default Puzzle;
