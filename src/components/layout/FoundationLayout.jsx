import { Typography } from "@material-tailwind/react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

/**
 * Outer wrapper of the entire app,
 * places the app content in the center of the screen and sets a top level background
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const FoundationLayout = ({ children }) => {
  const location = useLocation();

  const { bgColor, point, currency } = queryString.parse(location.search);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: `#${bgColor}`,
      }}
    >
      <div className="flex items-center justify-center mt-8 gap-2">
        <img
          src={`/assets/${currency.toLowerCase()}.png`}
          alt="coin"
          className="w-8 h-8"
        />
        <Typography
          className={`rounded-t-md text-center text-dark font-semibold text-white uppercase`}
        >
          Puzzle
        </Typography>
        <img
          src={`/assets/${currency.toLowerCase()}.png`}
          alt="coin"
          className="w-8 h-8"
        />
      </div>
      <Typography
        variant="paragraph"
        className="px-3 text-center my-3 text-white"
      >
        Get up to {point} {currency} for playing the game
      </Typography>
      <div
        className="flex flex-col md:flex-row gap-6 p-4 rounded-lg"
        style={{
          background: `#fff`,
        }}
      >
        {children}
      </div>
      <Typography variant="small" className="px-3 text-center my-3 text-white">
        Version - 2
      </Typography>
    </div>
  );
};

export default FoundationLayout;
