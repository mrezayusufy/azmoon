import React, { useEffect, useRef, useState } from 'react';

const persianCharMap: { [key: string]: string } = {
  'a': 'ش', 'b': 'ذ', 'c': 'ز', 'd': 'ی', 'e': 'ث', 'f': 'ب', 'g': 'ل',
  'h': 'ا', 'i': 'ه', 'j': 'ت', 'k': 'ن', 'l': 'م', 'm': 'ئ', 'n': 'د',
  'o': 'خ', 'p': 'ح', 'q': 'ض', 'r': 'ق', 's': 'س', 't': 'ف', 'u': 'ع',
  'v': 'ر', 'w': 'ص', 'x': 'ط', 'y': 'غ', 'z': 'ظ', ' ': ' ', '0': '۰',
  '1': '۱', '2': '۲', '3': '۳', '4': '۴', '5': '۵', '6': '۶', '7': '۷',
  '8': '۸', '9': '۹', '[': 'ج', ']': 'چ', ';': 'ک', "\\": "پ", ',': 'و', 
  "/": "ژ", "'": "گ"
};
type Props = { 
  name: string;
}
export const PersianInput: React.FC<Props> = ({ name}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const englishInput = event.target.value;
    let persianOutput = '';

    for (const char of englishInput) {
      persianOutput += persianCharMap[char] || char;
    }

    setInputValue(persianOutput); 
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
   if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  
  useEffect(() => {
    // @ts-ignore
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <input
      type="text"
      value={inputValue}
      name={name}
      onChange={handleInputChange}
      className='persian-input'
      onKeyDown={handleKeyDown}
      placeholder="جواب"
      style={{direction: "rtl"}}
    />
  );
}; 
