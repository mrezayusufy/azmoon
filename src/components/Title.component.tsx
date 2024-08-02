import React, { useState, useEffect } from 'react';
type TitleProps = {
  text: string;
  maxLength: number;
}
export const Title = ({ text, maxLength }: TitleProps) => {
  const [fontSize, setFontSize] = useState('16px');

  useEffect(() => {
    if (text.length > maxLength) {
      const newFontSize = Math.max(16 - (text.length - maxLength) * 0.1, 12);
      setFontSize(`${newFontSize}px`);
    } else {
      setFontSize('16px');
    }
  }, [text, maxLength]);

  return <div style={{ fontSize, lineHeight: 1 }}>{text}</div>;
};

