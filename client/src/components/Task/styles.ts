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
    $isDragging ? '0 4px 16px rgba(0,0,0,0.25)' : '0 1px 3px rgba(0,0,0,0.12)'};
  transition: all 0.2s ease;
  animation: ${slideIn} 0.2s ease;
  letter-spacing: 0.1px;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    cursor: grabbing;
    transform: scale(1.02);
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
  ${TaskCard}:hover & {
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
  &:hover {
    background: rgba(255, 255, 255, 0.35);
    color: #fff;
  }
`;

export const InlineInput = styled.input`
  width: 100%;
  padding: 5px 8px;
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
  transition: all 0.2s ease;
  &:focus {
    border-color: #764ba2;
    box-shadow: 0 2px 12px rgba(118, 75, 162, 0.2);
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
  border: 2px solid ${({ $active }) => ($active ? '#1a1a2e' : 'transparent')};
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  &:hover {
    transform: scale(1.2);
    border-color: #1a1a2e;
  }
`;
