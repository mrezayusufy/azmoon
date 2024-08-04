import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OPTION } from '@/constants';
import { cn } from '@/utils'; 
import { useAppContext } from '@/contexts'; 
type OptionProp = {
  content: string;
  color: string; 
}
export const Option: React.FC<OptionProp> = ({ content, color }: OptionProp) => {
  const {setAnswer, checkAnswer, state} = useAppContext();
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
    setAnswer(content);
  }
  const reverseAnimation = () => {
    tl.current?.reverse();
    checkAnswer(false);
    setAnswer("")
  }
  const playAnimation = () => {
    tl.current?.play();
  }

  return (
    <div className='option' onClick={onChoose}>
      <p ref={textRef} className='z-20'>
        {content}    
      </p>
      <img ref={imgRef} src={OPTION[0]}  alt="frame" className={cn('object-contain', color)} />
    </div>
  );
};
