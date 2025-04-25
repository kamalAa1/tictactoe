import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import queryString from 'query-string';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GameWinModal = ({ handleResetBoard, open }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isClaimed, setIsClaimed] = useState(false);

  const [responseMessage, setResponseMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const {
    to,
    amount,
    method,
    currency,
    bgColor,
    uid,
    collection,
    network,
    timer,
    timerId,
  } = queryString.parse(location.search);

  const data = {
    to: to?.trim(),
    amount,
    currency,
    method,
    uid,
    collection,
    network,
    timer,
    timerId,
  };

  const claimHandler = () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://us-central1-kishan-apps.cloudfunctions.net/expressApi/payment/pay',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    setIsLoading(true);

    axios
      .request(config)
      .then((response) => {
        const res = JSON.stringify(response.data);

        const parsedData = JSON.parse(res);

        if (parsedData?.status) {
          setIsClaimed(true);
          handleResetBoard();
          navigate('/done', { replace: true });
        } else {
          setIsClaimed(true);
          handleResetBoard();
          setResponseMessage(parsedData?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={open}>
      <DialogHeader
        className="flex items-center justify-center rounded-t"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Typography className="text-center font-semibold uppercase text-white">
          YOU WIN
        </Typography>
      </DialogHeader>
      <DialogBody className="space-y-2">
        <Typography
          variant="paragraph"
          style={{ textAlign: 'center' }}
          className="text-center break-words"
        >
          {isClaimed && responseMessage
            ? responseMessage
            : `Your payment of ${amount} ${currency} will be credited to ${method} account with ${
                method === 'binance' ? 'wallet address' : 'email address'
              } ${to}`}
        </Typography>

        <div className="flex items-center justify-center">
          {isClaimed ? (
            <Button
              onClick={() => navigate('/success', { replace: true })}
              className="rounded shadow-none hover:shadow-none"
              size="md"
              style={{
                background: `#${bgColor}`,
              }}
            >
              Okay
            </Button>
          ) : (
            <Button
              onClick={claimHandler}
              disabled={isLoading || isClaimed}
              className="mt-2 rounded shadow-none hover:shadow-none"
              size="md"
              variant="outlined"
              style={{
                border: `1px solid #${bgColor}`,
                color: `#${bgColor}`,
              }}
              loading={isLoading}
            >
              {isClaimed ? 'Okay' : 'Claim'}
            </Button>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default GameWinModal;
