import React, { useState, useRef, useEffect } from 'react';
import type { Task } from '../../types';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  MonthTitle,
  NavButton,
  TodayButton,
  SearchInput,
  CountrySelect,
  ViewToggle,
  ViewToggleGroup,
  SearchWrapper,
  SearchDropdown,
  SearchResultItem,
  SearchResultDot,
  SearchResultDate,
  SearchResultTitle,
  SearchNoResults,
  UserBadge,
  LogoutBtn,
} from './styles';

export type ViewMode = 'grid' | 'list';

interface SearchResult {
  task: Task;
  dateFormatted: string;
}

function formatTaskDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[d.getMonth()]}`;
}

interface Props {
  monthName: string;
  year: number;
  searchQuery: string;
  countryCode: string;
  countries: { countryCode: string; name: string }[];
  viewMode: ViewMode;
  searchResults: SearchResult[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onSearchChange: (query: string) => void;
  onCountryChange: (code: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
  username: string;
  onLogout: () => void;
}

const CalendarHeader: React.FC<Props> = ({
  monthName,
  year,
  searchQuery,
  countryCode,
  countries,
  viewMode,
  searchResults,
  onPrevMonth,
  onNextMonth,
  onToday,
  onSearchChange,
  onCountryChange,
  onViewModeChange,
  username,
  onLogout,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const handleFocus = () => {
    if (searchQuery.length > 0) setShowDropdown(true);
  };

  return (
    <Header>
      <HeaderLeft>
        <NavButton onClick={onPrevMonth}>◀</NavButton>
        <MonthTitle>
          {monthName} {year}
        </MonthTitle>
        <NavButton onClick={onNextMonth}>▶</NavButton>
        <TodayButton onClick={onToday}>Today</TodayButton>
        <ViewToggleGroup>
          <ViewToggle $active={viewMode === 'grid'} onClick={() => onViewModeChange('grid')} title="Grid view">▦</ViewToggle>
          <ViewToggle $active={viewMode === 'list'} onClick={() => onViewModeChange('list')} title="List view">☰</ViewToggle>
        </ViewToggleGroup>
      </HeaderLeft>
      <HeaderRight>
        <SearchWrapper ref={wrapperRef}>
          <SearchInput
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleFocus}
          />
          {showDropdown && searchQuery.length > 0 && (
            <SearchDropdown>
              {searchResults.length > 0 ? (
                searchResults.map(({ task, dateFormatted }) => (
                  <SearchResultItem key={task._id} $color={task.color}>
                    <SearchResultDot $color={task.color} />
                    <SearchResultDate>{dateFormatted}</SearchResultDate>
                    <SearchResultTitle>{task.title}</SearchResultTitle>
                  </SearchResultItem>
                ))
              ) : (
                <SearchNoResults>No tasks found</SearchNoResults>
              )}
            </SearchDropdown>
          )}
        </SearchWrapper>
        <CountrySelect value={countryCode} onChange={(e) => onCountryChange(e.target.value)}>
          {countries.map((c) => (
            <option key={c.countryCode} value={c.countryCode}>
              {c.name}
            </option>
          ))}
        </CountrySelect>
        <UserBadge>
          {username}
          <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
        </UserBadge>
      </HeaderRight>
    </Header>
  );
};

export { formatTaskDate };
export default CalendarHeader;
