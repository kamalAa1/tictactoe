import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from '@material-tailwind/react';
import queryString from 'query-string';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebook, FaTelegram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    title: 'Facebook',
    icon: <FaFacebook className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'YouTube',
    icon: <FaYoutube className="w-6 h-6" />,
    link: '#',
  },
  {
    title: 'Telegram',
    icon: <FaTelegram className="w-6 h-6" />,
    link: '#',
  },
];

const CouponBonus = () => {
  const [code, setCode] = useState('');
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const { bgColor, iconColor } = queryString.parse(location.search);

  const claimHandler = () => {
    if (code !== '' && code.trim().length <= 6) {
      setOpen(true);
      setCode('');
    } else {
      toast.error('Code should be 6 characters long!');
    }
  };

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
          <div
            className={`p-4 rounded space-y-3 m-2`}
            style={{
              background: `#${iconColor}`,
            }}
          >
            <Typography variant="paragraph" className="text-white my-8">
              Enter your coupon code to receive extra PEPE
            </Typography>
            <Input
              label="Coupon Code"
              type="text"
              className="rounded p-2 text-white uppercase"
              color="white"
              size="lg"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              minLength={6}
            />
            <Button
              fullWidth
              className={`shadow-none hover:shadow-none rounded-full bg-white text-black`}
              onClick={claimHandler}
            >
              Claim
            </Button>

            <Typography variant="small" color="white">
              Note : You can get the coupon code from our social media group
              everyday
            </Typography>
          </div>
          <div
            className="m-2 text-white rounded p-4"
            style={{
              background: `#${iconColor}`,
            }}
          >
            <Typography variant="lead" className="text-center">
              Join Our Social Media
            </Typography>
            <div className="flex items-center justify-center gap-2">
              {items.map((item) => (
                <Link
                  to={item.link}
                  key={item.title}
                  className="flex flex-col items-center justify-center bg-white text-black p-3 rounded"
                  style={{
                    color: `#${iconColor}`,
                  }}
                >
                  <Typography>{item.icon}</Typography>
                  <Typography>{item.title}</Typography>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {open && <ClaimModal open={open} setOpen={setOpen} />}
    </React.Fragment>
  );
};

export default CouponBonus;

const ClaimModal = ({ open, setOpen }) => {
  const location = useLocation();

  const { bgColor, iconColor } = queryString.parse(location.search);

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
          You have claimed your coupon code successfully!
        </Typography>
        <Button
          style={{
            background: `#${iconColor}`,
          }}
          className="shadow-none hover:shadow-none rounded-full"
          size="sm"
        >
          Okay
        </Button>
      </DialogBody>
      <DialogFooter>
        <span></span>
      </DialogFooter>
    </Dialog>
  );
};
