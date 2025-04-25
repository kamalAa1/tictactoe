import { Button } from '@material-tailwind/react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const BoardAction = ({ children, onClick }) => {
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <div className="z-20 absolute w-full h-full flex items-center justify-center">
      <div
        className="w-full flex items-center justify-center py-10"
        style={{
          background: `#${bgColor}`,
        }}
      >
        <Button
          className="rounded-lg flex items-center gap-2 shadow-none hover:shadow-none capitalize text-black"
          onClick={onClick}
          style={{
            background: `#fff`,
          }}
        >
          {children}
        </Button>
      </div>
    </div>
  );
};

export default BoardAction;
