import React from 'react';
import type { Holiday } from '../../types';
import { HolidayBadgeWrapper } from './styles';

interface Props {
  holidays: Holiday[];
}

const HolidayBadge: React.FC<Props> = ({ holidays }) => {
  return (
    <>
      {holidays.map((h, i) => (
        <HolidayBadgeWrapper key={i} title={h.name}>
          {h.localName}
        </HolidayBadgeWrapper>
      ))}
    </>
  );
};

export default HolidayBadge;
