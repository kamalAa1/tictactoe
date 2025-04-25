import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import React from 'react';

import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import '../Board/GameBoard.css';
import PathNode from '../Board/PathNode';
import Tile from '../Board/Tile';

const HelpModal = ({ useEmoji, closeModal, open }) => {
  const helpImageBoardStyle = {
    fontSize: '7vmin',
    pointerEvents: 'none',
    userSelect: 'none',
  };

  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <Dialog open={open}>
      <DialogHeader className="flex items-center justify-center rounded-t">
        <Typography className="text-center font-semibold uppercase">
          Help
        </Typography>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-2">
          <Typography variant="lead" className="text-center">
            Welcome to Unicode Mahjong Tile Solitaire
          </Typography>
          <div>
            <Typography variant="paragraph" className="text-center my-3">
              The goal is to clear all tiles from the board by clicking or
              tapping two matching tiles.
            </Typography>
            <div
              className={useEmoji ? 'game-board-emoji' : 'game-board-glyph'}
              style={helpImageBoardStyle}
            >
              <div>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile {...{ useEmoji }} />
                  </span>
                  <PathNode node={['L', 'D']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x14} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['L', '-start']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x1d} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['R', '-start']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile {...{ useEmoji }} />
                  </span>
                  <PathNode node={['R', 'D']} fadeout={false} />
                </span>
              </div>
              <div>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x14} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['D', '-end']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x0b} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['D', '-start']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x05} {...{ useEmoji }} />
                  </span>
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile {...{ useEmoji }} />
                  </span>
                  <PathNode node={['D']} fadeout={false} />
                </span>
              </div>
              <div>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x03} {...{ useEmoji }} />
                  </span>
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x0b} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['D', '-end']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile char={0x1d} {...{ useEmoji }} />
                  </span>
                  <PathNode node={['L', '-end']} fadeout={false} />
                </span>
                <span className="game-board-coord">
                  <span className="game-tile">
                    <Tile {...{ useEmoji }} />
                  </span>
                  <PathNode node={['D', 'L']} fadeout={false} />
                </span>
              </div>
            </div>
            <Typography className="my-3 text-center">
              In this type of mahjong solitaire, tiles can only be matched if
              they look the same and if there is an imaginary path of connecting
              lines between them so that the path doesn't touch any other tile.
            </Typography>
          </div>
          <div className="flex items-center justify-center">
            <Button
              onClick={closeModal}
              variant="outlined"
              className="shadow-none hover:shadow-none rounded border"
              style={{
                border: `1px solid #${bgColor}`,
                color: `#${bgColor}`,
              }}
            >
              Return to Game
            </Button>
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default HelpModal;
