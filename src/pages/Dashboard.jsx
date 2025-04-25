import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  {
    title: 'Puzzle',
    link: `/puzzle?point=10&currency=eth&iconColor=7483c7&bgColor=5968bb`,
    // hoverBg: '#5968bb',
  },
  {
    title: 'Tic Tac Toe (Ethereum)',
    link: `/game?point=10&currency=eth&iconColor=7483c7&bgColor=5968bb`,
    // hoverBg: '#5968bb',
  },
  {
    title: 'Tic Tac Toe (Bitcoin)',
    link: `/game?point=13&currency=bnb&iconColor=ef8e19&bgColor=c08645`,
    // hoverBg: '#f89215',
  },
  {
    title: 'mahjong',
    link: `/mahjong?point=13&currency=bnb&iconColor=ef8e19&bgColor=c08645`,
    // hoverBg: '#03451d',
  },
  {
    title: 'Quiz',
    link: `/quiz?point=13&currency=bnb&iconColor=008080&bgColor=22d3ee`,
    // hoverBg: '#03451d',
  },
  {
    title: 'Coupon Bonus',
    link: `/coupon-bonus?point=13&currency=bnb&iconColor=3fa0a1&bgColor=008080`,
    // hoverBg: '#136a8a',
  },
  {
    title: 'Daily Bonus',
    link: `/daily-bonus?point=13&currency=bnb&iconColor=5eead4&bgColor=14b8a6`,
    // hoverBg: '#237675',
  },
  {
    title: 'Promotional Video',
    link: `/promotional-video?uid=C8O4m00IeGS21CSibOfNEeVt9FD3&collection=R1_Multicoin_Faucet`,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center m-auto h-screen relative">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-center gap-4">
            <img src="/btc.png" alt="coin" className="w-6 h-6" />
            <Typography>Explore Games</Typography>
            <img src="/btc.png" alt="coin" className="w-6 h-6" />
          </div>
          <Typography>Play games and win amazing rewards</Typography>
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5 max-h-[400px]">
          {navItems.map((item, index) => {
            const { link, title } = item;
            return (
              <div
                key={index}
                className={`w-64 h-14 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-200`}
                onClick={() => {
                  navigate(link);
                }}
              >
                <Typography className="uppercase font-semibold text-sm">
                  {title}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-4 bg-gray-100 w-full">
        <ul className="flex space-x-2">
          <li>
            <Link
              to={'/services'}
              className="text-teal-400 hover:underline w-auto"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to={'/terms-conditions'}
              className="text-teal-400 hover:underline w-auto"
            >
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link
              to={'/privacy-policy'}
              className="text-teal-400 hover:underline w-auto"
            >
              Privacy policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
