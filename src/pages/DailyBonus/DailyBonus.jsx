import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from '@material-tailwind/react';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const DailyBonus = () => {
  const [open, setOpen] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(null);

  const location = useLocation();

  const { bgColor, iconColor, point } = queryString.parse(location.search);

  const handleShow = (index) => {
    setClickedIndex(index);
  };

  useEffect(() => {
    if (clickedIndex) {
      setOpen(true);
    }
  }, [clickedIndex]);

  return (
    <React.Fragment>
      <div
        className={`flex items-center justify-center h-screen`}
        style={{
          border: `1px solid #${bgColor}`,
          background: `#${bgColor}`,
        }}
      >
        <div>
          <Typography className="px-4 text-white text-center" variant="h4">
            Daily Bonus
          </Typography>
          <div
            className={`p-4 rounded m-2 grid grid-cols-3 text-white place-items-center gap-3`}
          >
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                className="w-24 h-24 flex items-center justify-center rounded cursor-pointer"
                style={{
                  background: `#${iconColor}`,
                }}
                onClick={() => handleShow(index)}
              >
                <Typography
                  variant="lead"
                  className="flex flex-col items-center justify-center"
                >
                  {clickedIndex === index ? point : <FaQuestion />}
                  {clickedIndex === index && <span>Life</span>}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && <ClaimModal open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
};

export default DailyBonus;

const ClaimModal = ({ open, setOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bgColor, iconColor, point, currency } = queryString.parse(
    location.search
  );

  const navigateHandler = () => {
    navigate('/done', { state: { type: 'daily-bonus' } }, { replace: true });
  };

  return (
    <Dialog open={open} handler={() => setOpen(false)}>
      <DialogHeader
        className="flex items-center justify-center rounded-t"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Typography className="text-center text-white font-semibold uppercase">
          Claim
        </Typography>
      </DialogHeader>
      <DialogBody className="flex flex-col items-center justify-center space-y-3">
        <Typography className="text-center">
          Come back tomorrow for another rewards!
          <br />
          Reward : {point} {currency.toLowerCase()}
        </Typography>
        <Button
          style={{
            background: `#${iconColor}`,
          }}
          className="shadow-none hover:shadow-none rounded-full"
          size="sm"
          onClick={navigateHandler}
        >
          Claim now
        </Button>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};
