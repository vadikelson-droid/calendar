import React from 'react';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  MonthTitle,
  NavButton,
  TodayButton,
  SearchInput,
  CountrySelect,
} from './styles';

interface Props {
  monthName: string;
  year: number;
  searchQuery: string;
  countryCode: string;
  countries: { countryCode: string; name: string }[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onSearchChange: (query: string) => void;
  onCountryChange: (code: string) => void;
}

const CalendarHeader: React.FC<Props> = ({
  monthName,
  year,
  searchQuery,
  countryCode,
  countries,
  onPrevMonth,
  onNextMonth,
  onToday,
  onSearchChange,
  onCountryChange,
}) => {
  return (
    <Header>
      <HeaderLeft>
        <NavButton onClick={onPrevMonth}>◀</NavButton>
        <MonthTitle>
          {monthName} {year}
        </MonthTitle>
        <NavButton onClick={onNextMonth}>▶</NavButton>
        <TodayButton onClick={onToday}>Today</TodayButton>
      </HeaderLeft>
      <HeaderRight>
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <CountrySelect value={countryCode} onChange={(e) => onCountryChange(e.target.value)}>
          {countries.map((c) => (
            <option key={c.countryCode} value={c.countryCode}>
              {c.name}
            </option>
          ))}
        </CountrySelect>
      </HeaderRight>
    </Header>
  );
};

export default CalendarHeader;
