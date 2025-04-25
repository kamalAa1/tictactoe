import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const GameInfo = ({ icon = null, label = '', children }) => {
  const location = useLocation();

  const { bgColor } = queryString.parse(location.search);

  return (
    <div
      className="flex flex-row md:flex-col justify-center items-center gap-2 py-1 px-2 rounded-lg flex-1 md:flex-none text-white"
      style={{
        background: `#${bgColor}`,
      }}
    >
      <div className="text-xl md:text-5xl font-bold">{icon}</div>
      <div className="flex flex-row items-center gap-2 justify-center text-sm md:text-md">
        <span>{!!label && label + ':'}</span>
        <div className="font-bold">{children}</div>
      </div>
    </div>
  );
};

export default GameInfo;
