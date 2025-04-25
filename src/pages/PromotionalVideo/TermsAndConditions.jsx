import { Typography } from '@material-tailwind/react';
import React from 'react';

const TermsAndConditions = ({ terms }) => {
  return (
    <div>
      <Typography variant="lead" className="text-center font-semibold">
        Milestones
      </Typography>
      <Typography variant="small" className="text-center mb-2">
        Complete your milestone and get that on completion of every milestone.
      </Typography>
      <ul>
        {terms.map((item, index) => (
          <li
            key={index}
            className="mb-2 bg-purple-50 p-2 rounded flex items-center justify-start gap-3"
          >
            <Typography className="w-9 h-9 flex items-center justify-center bg-purple-100 rounded-full">
              <strong className="font-bold">{item.step}</strong>
            </Typography>
            <div>
              <Typography className="font-semibold text-sm">
                {item.title}
              </Typography>
              <Typography variant="small">{item.message}</Typography>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermsAndConditions;
