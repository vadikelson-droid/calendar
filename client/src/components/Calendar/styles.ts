import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const CalendarWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px;
  animation: ${fadeIn} 0.4s ease;

  @media (max-width: 768px) {
    padding: 8px 4px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
  background: #FFFFFF;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  user-select: none;
  -webkit-user-select: none;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
    margin-bottom: 8px;
    gap: 10px;
    border-radius: 8px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
    width: 100%;
    justify-content: center;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 6px;
  }
`;

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
  min-width: 220px;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 18px;
    min-width: auto;
  }
`;

export const NavButton = styled.button`
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #1E293B;
  transition: all 0.2s ease;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      background: #EFF6FF;
      border-color: #3B82F6;
      color: #3B82F6;
    }
  }
  &:active {
    background: #DBEAFE;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const TodayButton = styled(NavButton)`
  background: #3B82F6;
  border-color: #3B82F6;
  color: #FFFFFF;
  font-weight: 600;
  padding: 8px 18px;
  @media (hover: hover) {
    &:hover {
      background: #2563EB;
      border-color: #2563EB;
      color: #FFFFFF;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
    }
  }
  &:active {
    background: #1D4ED8;
  }
`;

export const ViewToggle = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? '#3B82F6' : '#F8FAFC')};
  border: 1px solid ${({ $active }) => ($active ? '#3B82F6' : '#E2E8F0')};
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: ${({ $active }) => ($active ? '#FFFFFF' : '#64748B')};
  transition: all 0.2s ease;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      background: ${({ $active }) => ($active ? '#2563EB' : '#EFF6FF')};
    }
  }
`;

export const ViewToggleGroup = styled.div`
  display: flex;
  gap: 2px;
  background: #F1F5F9;
  border-radius: 8px;
  padding: 2px;
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  width: 220px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: #FFFFFF;
  color: #1E293B;
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  &::placeholder {
    color: #94A3B8;
  }

  @media (max-width: 768px) {
    flex: 1;
    width: auto;
    min-width: 0;
  }
`;

export const CountrySelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  cursor: pointer;
  background: #FFFFFF;
  color: #1E293B;
  transition: all 0.2s ease;
  touch-action: manipulation;
  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

export const DayHeader = styled.div<{ $isWeekend?: boolean }>`
  background: #F8FAFC;
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: ${({ $isWeekend }) => ($isWeekend ? '#F87171' : '#64748B')};
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #E2E8F0;
  user-select: none;
  -webkit-user-select: none;
`;

export const DayCellWrapper = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean; $isWeekend?: boolean }>`
  min-height: 130px;
  padding: 6px 8px;
  border-right: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  background: ${({ $isCurrentMonth, $isToday }) =>
    $isToday
      ? '#DBEAFE'
      : $isCurrentMonth
      ? '#FFFFFF'
      : '#F8FAFC'};
  position: relative;
  cursor: pointer;
  transition: background 0.15s ease;
  touch-action: manipulation;

  &:nth-child(7n + 7) {
    border-right: none;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ $isToday }) =>
        $isToday ? '#DBEAFE' : '#EFF6FF'};
    }
  }

  ${({ $isToday }) =>
    $isToday &&
    `
    box-shadow: inset 0 0 0 2px #3B82F6;
  `}

  @media (max-width: 768px) {
    min-height: 90px;
    padding: 4px;
  }
`;

export const DayNumber = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean; $isWeekend?: boolean }>`
  font-size: 13px;
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '500')};
  color: ${({ $isCurrentMonth, $isToday, $isWeekend }) =>
    $isToday ? '#3B82F6' : !$isCurrentMonth ? '#94A3B8' : $isWeekend ? '#F87171' : '#1E293B'};
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
`;

export const CardCount = styled.span`
  font-size: 10px;
  color: #94A3B8;
  font-weight: 500;
  background: #F1F5F9;
  padding: 1px 6px;
  border-radius: 8px;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-height: 85px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }
`;

export const AddTaskArea = styled.div`
  margin-top: 4px;
  animation: ${fadeIn} 0.15s ease;
`;

// ListView styles
export const ListViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListDayRow = styled.div<{ $isToday: boolean; $isCurrentMonth: boolean }>`
  background: ${({ $isToday }) => ($isToday ? '#DBEAFE' : '#FFFFFF')};
  border: 1px solid ${({ $isToday }) => ($isToday ? '#3B82F6' : '#E2E8F0')};
  border-radius: 10px;
  padding: 12px 16px;
  opacity: ${({ $isCurrentMonth }) => ($isCurrentMonth ? 1 : 0.5)};
  animation: ${fadeIn} 0.3s ease;

  ${({ $isToday }) =>
    $isToday &&
    `
    box-shadow: 0 0 0 2px #3B82F6;
  `}
`;

export const ListDayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  user-select: none;
  -webkit-user-select: none;
`;

export const ListDayDate = styled.div<{ $isToday: boolean; $isWeekend: boolean }>`
  font-size: 16px;
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '600')};
  color: ${({ $isToday, $isWeekend }) =>
    $isToday ? '#3B82F6' : $isWeekend ? '#F87171' : '#1E293B'};
`;

export const ListDayName = styled.span`
  font-size: 13px;
  color: #94A3B8;
  font-weight: 500;
`;

export const ListTaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ListAddBtn = styled.button`
  background: none;
  border: 1px dashed #CBD5E1;
  border-radius: 6px;
  padding: 8px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 6px;
  width: 100%;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      border-color: #3B82F6;
      color: #3B82F6;
      background: #EFF6FF;
    }
  }
  &:active {
    border-color: #3B82F6;
    color: #3B82F6;
    background: #EFF6FF;
  }
`;

// Search dropdown styles
export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;

  @media (min-width: 769px) {
    flex: none;
    width: 220px;
  }
`;

export const SearchDropdown = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-height: 280px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
  z-index: 100;
  animation: ${fadeIn} 0.15s ease;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    left: -12px;
    right: -12px;
    max-height: 50vh;
  }
`;

export const SearchResultItem = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid #F1F5F9;
  touch-action: manipulation;

  &:last-child {
    border-bottom: none;
  }

  @media (hover: hover) {
    &:hover {
      background: #EFF6FF;
    }
  }
  &:active {
    background: #EFF6FF;
  }
`;

export const SearchResultDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const SearchResultDate = styled.span`
  font-size: 12px;
  color: #94A3B8;
  font-weight: 500;
  white-space: nowrap;
  min-width: 70px;
`;

export const SearchResultTitle = styled.span`
  font-size: 14px;
  color: #1E293B;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SearchNoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #94A3B8;
  font-size: 13px;
`;

export const UserBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
`;

export const LogoutBtn = styled.button`
  background: none;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
  color: #94A3B8;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s;
  touch-action: manipulation;

  @media (hover: hover) {
    &:hover {
      border-color: #EF4444;
      color: #EF4444;
    }
  }
  &:active {
    border-color: #EF4444;
    color: #EF4444;
  }
`;
