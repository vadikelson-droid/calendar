import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-4px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const TaskCard = styled.div<{ $color: string; $isDragging?: boolean; $dimmed?: boolean }>`
  background: ${({ $color }) => $color};
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: grab;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.25 : 1)};
  box-shadow: ${({ $isDragging }) =>
    $isDragging ? '0 4px 16px rgba(0,0,0,0.2)' : '0 1px 2px rgba(0,0,0,0.08)'};
  transition: all 0.2s ease;
  animation: ${slideIn} 0.2s ease;
  letter-spacing: 0.1px;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }
  }

  &:active {
    cursor: grabbing;
  }
`;

export const TaskTitle = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 2px;
  opacity: 0;
  transition: opacity 0.15s ease;

  @media (hover: hover) {
    ${TaskCard}:hover & {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

export const TaskActionBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  padding: 1px 4px;
  font-size: 11px;
  line-height: 1;
  border-radius: 3px;
  transition: background 0.15s;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.35);
      color: #fff;
    }
  }
  &:active {
    background: rgba(255, 255, 255, 0.35);
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 14px;
    min-width: 28px;
    min-height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const InlineInput = styled.input`
  width: 100%;
  padding: 5px 8px;
  border: 2px solid #3B82F6;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  background: #FFFFFF;
  color: #1E293B;
  box-shadow: 0 1px 4px rgba(59, 130, 246, 0.15);
  transition: all 0.2s ease;
  &:focus {
    border-color: #2563EB;
    box-shadow: 0 1px 8px rgba(59, 130, 246, 0.2);
  }
  &::placeholder {
    color: #94A3B8;
  }
`;

export const ColorPicker = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
  padding: 2px 0;
`;

export const ColorDot = styled.button<{ $color: string; $active: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  border: 2px solid ${({ $active }) => ($active ? '#1E293B' : 'transparent')};
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.2);
      border-color: #1E293B;
    }
  }

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }
`;
