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

const ClaimModal = ({ open, score, questions }) => {
  const percentage = Math.floor((score / questions) * 100);

  // const [isLoading, setIsLoading] = useState(false);

  // const [isClaimed, setIsClaimed] = useState(false);

  // const [responseMessage, setResponseMessage] = useState('');
  // const [isError, setIsError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { point, bgColor, currency } = queryString.parse(location.search);

  const message = `🎉 Congratulations! You scored ${percentage}%. You're a quiz master! 🏆`;

  const navigateHandler = () => {
    navigate('/done', { state: { type: 'quiz' } }, { replace: true });
  };

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
          win
        </Typography>
      </DialogHeader>
      <DialogBody>
        <div className="space-y-2 text-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={'/trophy.png'}
              alt="win"
              style={{ width: '70px', height: '70px' }}
            />
          </div>
          <br />

          <Typography
            variant="paragraph"
            style={{ textAlign: 'center' }}
            className="text-center break-words"
          >
            {message}
            <br />
            Reward : {point} {currency?.toLowerCase()}
            {/* {!isError && isClaimed && responseMessage
              ? responseMessage
              : !isClaimed && isError && responseMessage
              ? responseMessage
              : message} */}
          </Typography>
        </div>
      </DialogBody>
      <DialogFooter className="flex items-center justify-center">
        <Button
          onClick={navigateHandler}
          // disabled={isLoading || isClaimed}
          className="mt-2 rounded shadow-none hover:shadow-none capitalize"
          size="md"
          style={{
            background: `#${bgColor}`,
          }}
        >
          Claim now
        </Button>

        {/* {isClaimed ? (
          <Button
            onClick={() =>
              navigate('/done', { state: { address: to } }, { replace: true })
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
            onClick={claimHandler}
            disabled={isLoading || isClaimed}
            className="mt-2 rounded shadow-none hover:shadow-none"
            size="md"
            style={{
              background: `#${bgColor}`,
            }}
          >
            {isLoading ? 'Loading...' : 'Claim'}
          </Button>
        )} */}
      </DialogFooter>
    </Dialog>
  );
};

export default ClaimModal;
