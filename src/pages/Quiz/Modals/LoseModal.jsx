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
import { useLocation } from 'react-router-dom';

const LoseModal = ({ open, setOpen, score, questions }) => {
  const percentage = Math.floor((score / questions) * 100);

  const location = useLocation();
  const { bgColor } = queryString.parse(location.search);

  let message;
  if (percentage >= 50) {
    message = `👍 Good job! You scored ${percentage}%. Keep practicing, and you'll be a champion in no time! 💪`;
  } else {
    message = `😢 Don't give up! You scored ${percentage}%. Every mistake is a step closer to success. Try again! 🔥`;
  }

  return (
    <Dialog open={open}>
      <DialogHeader
        className="flex items-center justify-center rounded-t"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Typography className="text-center text-white font-semibold uppercase">
          Lose
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-3 flex flex-col items-center justify-center">
        <img
          src={'/lose.png'}
          alt="win"
          style={{ width: '70px', height: '70px' }}
        />
        <Typography className="text-center">{message}</Typography>
      </DialogBody>
      <DialogFooter className="flex items-center justify-center">
        <Button
          className="rounded shadow-none hover:shadow-none"
          onClick={() => {
            setOpen(false);
            window.location.reload();
          }}
          style={{
            background: `#${bgColor}`,
          }}
        >
          Play Again
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default LoseModal;
