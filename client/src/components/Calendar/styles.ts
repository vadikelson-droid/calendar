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
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  min-width: 220px;
  letter-spacing: -0.5px;
`;

export const NavButton = styled.button`
  background: #f0f0f5;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #555;
  transition: all 0.2s ease;
  &:hover {
    background: #e4e4ec;
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const TodayButton = styled(NavButton)`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  padding: 8px 18px;
  &:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #5a72d4, #6a4194);
  }
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  width: 220px;
  font-family: inherit;
  transition: all 0.2s ease;
  background: #f8f8fb;
  &:focus {
    outline: none;
    border-color: #667eea;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  }
  &::placeholder {
    color: #aaa;
  }
`;

export const CountrySelect = styled.select`
  padding: 8px 12px;
  border: 2px solid #eee;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  background: #f8f8fb;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

export const DayHeader = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 12px 8px;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const DayCellWrapper = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  min-height: 130px;
  padding: 6px 8px;
  border-right: 1px solid #f0f0f5;
  border-bottom: 1px solid #f0f0f5;
  background: ${({ $isCurrentMonth, $isToday }) =>
    $isToday
      ? 'linear-gradient(135deg, #fff9e6, #fff3cc)'
      : $isCurrentMonth
      ? '#fff'
      : '#f8f8fb'};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:nth-child(7n + 7) {
    border-right: none;
  }

  &:hover {
    background: ${({ $isToday }) =>
      $isToday ? 'linear-gradient(135deg, #fff5d6, #ffedb3)' : '#f3f0ff'};
    z-index: 1;
  }

  ${({ $isToday }) =>
    $isToday &&
    `
    box-shadow: inset 0 0 0 2px #f0a500;
  `}
`;

export const DayNumber = styled.div<{ $isCurrentMonth: boolean; $isToday: boolean }>`
  font-size: 13px;
  font-weight: ${({ $isToday }) => ($isToday ? '700' : '500')};
  color: ${({ $isCurrentMonth, $isToday }) =>
    $isToday ? '#e08800' : $isCurrentMonth ? '#1a1a2e' : '#c0c0d0'};
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ $isToday }) =>
    $isToday &&
    `
    & > span:first-child,
    &::before {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

export const CardCount = styled.span`
  font-size: 10px;
  color: #a0a0b8;
  font-weight: 500;
  background: #f0f0f5;
  padding: 1px 6px;
  border-radius: 8px;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-height: 85px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: #d0d0e0;
    border-radius: 3px;
  }
`;

export const AddTaskArea = styled.div`
  margin-top: 4px;
  animation: ${fadeIn} 0.15s ease;
`;
