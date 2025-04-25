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

const ClaimLoseWinModal = ({
  open,
  hasWon,
  message,
  clearBoard,
  secondMessage,
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  // const [isClaimed, setIsClaimed] = useState(false);

  // const [responseMessage, setResponseMessage] = useState('');
  // const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const {
    // amount,
    // method,
    // currency,
    bgColor,
    // uid,
    // collection,
    // network,
    // timer,
    // timerId,
  } = queryString.parse(location.search);

  // const data = {
  //   to: to?.trim(),
  //   amount,
  //   currency,
  //   method,
  //   uid,
  //   collection,
  //   network,
  //   timer,
  //   timerId,
  // };

  const navigateHandler = () => {
    navigate('/done', { state: { type: 'tic_tac_toe' } }, { replace: true });
  };

  // const claimHandler = () => {
  //   const config = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: 'https://us-central1-kishan-apps.cloudfunctions.net/expressApi/payment/pay',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: JSON.stringify(data),
  //   };

  //   setIsLoading(true);

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       const res = JSON.stringify(response.data);

  //       const parsedData = JSON.parse(res);

  //       if (parsedData?.status) {
  //         setIsClaimed(true);
  //         setResponseMessage(parsedData?.message);
  //       } else {
  //         setIsClaimed(true);
  //         setResponseMessage(parsedData?.message);
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         setIsError(true);
  //         setResponseMessage(error.response.data.message);
  //       }
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  return (
    <Dialog open={open}>
      <DialogHeader
        className="flex items-center justify-center rounded-t"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Typography className="text-center text-white font-semibold uppercase">
          {hasWon === 'o'
            ? 'You win'
            : hasWon === 'x'
            ? 'you lose'
            : `it's a draw`}
        </Typography>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-2">
          <div className="flex flex-col items-center justify-center">
            {hasWon === 'o' && (
              <img
                src={'/trophy.png'}
                alt="win"
                style={{ width: '70px', height: '70px' }}
              />
            )}
            {/* {hasWon === 'o' && isClaimed && (
              <img
                src={'/check-mark.png'}
                alt="win"
                style={{ width: '70px', height: '70px' }}
              />
            )} */}
            {hasWon === 'x' && (
              <img
                src={'/lose.png'}
                alt="lose"
                style={{ width: '70px', height: '70px' }}
              />
            )}
            {hasWon === 'tie' && (
              <img
                src={'/draw.png'}
                alt="tie"
                style={{ width: '70px', height: '70px' }}
              />
            )}
          </div>
          <Typography
            variant="paragraph"
            style={{ textAlign: 'center' }}
            className="text-center break-words"
          >
            {message}
            <br />
            {secondMessage && secondMessage}
            {/* {!isError && isClaimed && responseMessage
              ? responseMessage
              : !isClaimed && isError && responseMessage
              ? responseMessage
              : message} */}
          </Typography>
          <div className="flex items-center justify-center">
            <Button
              onClick={hasWon === 'o' ? navigateHandler : clearBoard}
              // disabled={isLoading || isClaimed}
              className="mt-2 rounded shadow-none hover:shadow-none"
              size="md"
              style={{
                background: `#${bgColor}`,
              }}
            >
              {hasWon === 'o' ? 'Claim Now' : 'Restart'}
            </Button>

            {/* {isClaimed ? (
              <Button
                onClick={() =>
                  navigate(
                    '/done',
                    { state: { address: to } },
                    { replace: true }
                  )
                }
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
                onClick={hasWon === 'o' ? claimHandler : clearBoard}
                disabled={isLoading || isClaimed}
                className="mt-2 rounded shadow-none hover:shadow-none"
                size="md"
                style={{
                  background: `#${bgColor}`,
                }}
              >
                {isLoading
                  ? 'Loading...'
                  : hasWon === 'o'
                  ? 'Claim'
                  : isClaimed
                  ? 'Okay'
                  : 'RESTART'}
              </Button>
            )} */}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};

export default ClaimLoseWinModal;
