import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import queryString from 'query-string';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PauseModal = ({
  seed,
  resetGameState,
  hideModal,
  handleResetBoard,
  open,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <Dialog open={open}>
      <DialogHeader
        className="flex items-center justify-center rounded-t text-white"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Typography className="text-center font-semibold uppercase">
          Pause
        </Typography>
      </DialogHeader>
      <DialogBody className="flex flex-col items-center justify-center !space-y-4">
        <Button
          onClick={hideModal}
          className="shadow-none hover:shadow-none rounded capitalize"
          style={{
            background: `#${bgColor}`,
          }}
        >
          Return to Game
        </Button>

        <Button
          onClick={handleResetBoard}
          className="shadow-none hover:shadow-none rounded capitalize"
          style={{
            background: `#${bgColor}`,
          }}
        >
          Start New Board
        </Button>

        <Button
          onClick={() => resetGameState({ newSeed: seed })}
          className="shadow-none hover:shadow-none rounded capitalize"
          style={{
            background: `#${bgColor}`,
          }}
        >
          Reset Current Board
        </Button>

        <Button
          variant="outlined"
          className="shadow-none hover:shadow-none rounded border capitalize"
          onClick={() => navigate('/')}
          style={{
            border: `1px solid #${bgColor}`,
            color: `#${bgColor}`,
          }}
        >
          Exit Game
        </Button>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default PauseModal;
