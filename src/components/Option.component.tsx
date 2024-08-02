import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OPTION } from '../constants';
import { useQuestionStore } from '../store';
import { cn, contextMenu, preventDefault } from '../utils';
import { Title } from './Title.component';
type OptionProp = {
  content: string;
  color: string; 
}
export const Option: React.FC<OptionProp> = ({ content, color }: OptionProp) => {
  const {setSelectedAnswer, setAnswerChecked} = useQuestionStore((_: any) => ({
    setSelectedAnswer: _.setSelectedAnswer, 
    setAnswerChecked: _.setAnswerChecked}));
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
 
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    OPTION.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onUpdate: () => {
          (imgRef.current) && (imgRef.current.src = frame);
          (index >= OPTION.length - 20 && textRef.current) && 
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          (index !== OPTION.length - 1 && textRef.current) &&
            gsap.to(textRef.current, { opacity: 0, duration: 0.05 });
        },
      });
    });

    // Cleanup function to kill the timeline on unmount
    return () => {
      (tl.current) && tl.current.kill();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      (event.key === 'a' || event.key === 'ش') &&
        playAnimation();
      (event.shiftKey && (event.key === 'A' || event.key === 'َ')) &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);
  const onChoose = () => {
    setSelectedAnswer(content);
  }
  const reverseAnimation = () => {
    setTimeout(() => {
      setAnswerChecked(false);
      setSelectedAnswer("")}, 5000)
    tl.current?.reverse();
     (textRef.current) &&
      gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
  }
  const playAnimation = () => {
    tl.current?.play();
  }
  return (
    <div className='option' onClick={onChoose}>
      <p ref={textRef}>
        {content}      
      </p>
      <img ref={imgRef} src={OPTION[0]}  alt="frame" className={cn('object-contain', color)} />
    </div>
  );
};
