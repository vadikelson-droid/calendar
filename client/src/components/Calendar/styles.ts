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
  background: #FFFFFF;
  padding: 16px 24px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
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
  color: #1E293B;
  min-width: 220px;
  letter-spacing: -0.5px;
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
  &:hover {
    background: #EFF6FF;
    border-color: #3B82F6;
    color: #3B82F6;
  }
  &:active {
    transform: translateY(0);
  }
`;

export const TodayButton = styled(NavButton)`
  background: #3B82F6;
  border-color: #3B82F6;
  color: #FFFFFF;
  font-weight: 600;
  padding: 8px 18px;
  &:hover {
    background: #2563EB;
    border-color: #2563EB;
    color: #FFFFFF;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  }
`;

export const SearchInput = styled.input`
  padding: 8px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
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
`;

export const CountrySelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  background: #FFFFFF;
  color: #1E293B;
  transition: all 0.2s ease;
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
  transition: all 0.15s ease;

  &:nth-child(7n + 7) {
    border-right: none;
  }

  &:hover {
    background: ${({ $isToday }) =>
      $isToday ? '#DBEAFE' : '#EFF6FF'};
  }

  ${({ $isToday }) =>
    $isToday &&
    `
    box-shadow: inset 0 0 0 2px #3B82F6;
  `}
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
