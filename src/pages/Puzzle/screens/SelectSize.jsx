import React, { useContext } from 'react';
import { BsGrid3X2Gap } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import ControlButton from '../components/controls/ControlButton';
import SelectionIconButton from '../components/controls/SelectionIconButton';
import SelectionGroupLayout from '../components/layout/SelectionGroupLayout';
import { GameContext } from '../store/GameContext';

// List of available puzzle sizes to select from

const sizeList = [{ name: 'Easy', sizeOption: '3x3' }];

const SelectSize = () => {
  const navigate = useNavigate();

  const { size } = useContext(GameContext);

  return (
    <React.Fragment>
      <SelectionGroupLayout label="Select Size" className="sm:grid-cols-3">
        {sizeList.map(({ name, sizeOption }) => (
          <SelectionIconButton
            key={sizeOption}
            icon={<BsGrid3X2Gap />}
            text={name}
            active={
              sizeOption ===
              Math.min(size?.x ?? 0, size?.y ?? 0) +
                'x' +
                Math.max(size?.x ?? 0, size?.y ?? 0)
            }
          >
            {sizeOption}
          </SelectionIconButton>
        ))}
      </SelectionGroupLayout>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <ControlButton onClick={() => navigate('/')}>
            Go To Game
          </ControlButton>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SelectSize;
