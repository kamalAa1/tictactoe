import { Button } from '@material-tailwind/react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const ControlButton = ({ children, ...rest }) => {
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <Button
      {...rest}
      className={`w-full rounded-lg capitalize tracking-wider`}
      style={{
        background: `#${bgColor}`,
      }}
    >
      {children}
    </Button>
  );
};

export default ControlButton;
