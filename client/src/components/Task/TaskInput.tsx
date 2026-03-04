import React, { useState, useRef, useEffect } from 'react';
import { InlineInput, ColorPicker, ColorDot } from './styles';

const COLORS = ['#4dabf7', '#ff6b6b', '#51cf66', '#fcc419', '#cc5de8', '#ff922b'];

interface Props {
  onSubmit: (title: string, color: string) => void;
  onCancel: () => void;
  initialTitle?: string;
  initialColor?: string;
}

const TaskInput: React.FC<Props> = ({ onSubmit, onCancel, initialTitle = '', initialColor = COLORS[0] }) => {
  const [title, setTitle] = useState(initialTitle);
  const [color, setColor] = useState(initialColor);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && title.trim()) {
      onSubmit(title.trim(), color);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div>
      <InlineInput
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (title.trim()) {
            onSubmit(title.trim(), color);
          } else {
            onCancel();
          }
        }}
        placeholder="New task..."
      />
      <ColorPicker>
        {COLORS.map((c) => (
          <ColorDot
            key={c}
            $color={c}
            $active={color === c}
            onMouseDown={(e) => {
              e.preventDefault();
              setColor(c);
            }}
          />
        ))}
      </ColorPicker>
    </div>
  );
};

export default TaskInput;
