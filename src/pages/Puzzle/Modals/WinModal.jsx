import {
  Button,
  Dialog,
  DialogBody,
  Typography,
} from '@material-tailwind/react';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../../store/GameContext';

const WinModal = ({ open, setOpen }) => {
  const { game } = useContext(GameContext);

  const navigate = useNavigate();

  if (!game || !game.gameWon) return null;

  const timeTaken = game.timeTakenToWin;

  const minutes = Math.floor(timeTaken / (60 * 1000));
  const seconds = Math.floor(timeTaken / 1000);

  const time = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <Dialog open={open} handler={() => setOpen(true)}>
      <DialogBody className="flex flex-col items-center justify-center space-y-2">
        <div className="flex flex-col items-center justify-center">
          <img
            src={'/trophy.png'}
            alt="win"
            style={{ width: '70px', height: '70px' }}
          />
        </div>

        <Typography>Duration : {time}</Typography>
        <Typography>Moves : {game?.moves?.length ?? 0}</Typography>
        <Typography className="text-center mb-1">
          You completed the puzzle.
        </Typography>

        <Button
          size="sm"
          className="rounded shadow-none"
          onClick={() =>
            navigate(
              `/puzzle-win?time=${timeTaken}&moves=${game?.moves?.length}`
            )
          }
        >
          Okay
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export default WinModal;
