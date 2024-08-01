import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { OPTION } from '../constants';
import { useQuestionStore } from '../store';
import { cn, contextMenu, preventDefault } from '../utils';
type OptionProp = {
  content: string;
  color: string; 
}
export const Option: React.FC<OptionProp> = ({ content, color }: OptionProp) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const {setSelectedAnswer, setAnswerChecked} = useQuestionStore((_: any) => ({
    setSelectedAnswer: _.setSelectedAnswer, 
    setAnswerChecked: _.setAnswerChecked}));
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const [isPlayingForward, setIsPlayingForward] = useState(true);
 
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    OPTION.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onStart: () => setCurrentFrame(index),
        onUpdate: () => {
          if (imgRef.current) {
            imgRef.current.src = frame;
          }
          if (index >= OPTION.length - 20 && textRef.current) {
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          } else if (index !== OPTION.length - 1 && textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.05 });
          }
        },
      });
    });

    // Cleanup function to kill the timeline on unmount
    return () => {
      if (tl.current) {
        tl.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'a' || event.key === 'ش') {
        playAnimation()
      } else if (event.shiftKey) {
        if (event.key === 'A' || event.key === 'َ') {
          reverseAnimation()
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', preventDefault);
    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('contextmenu', preventDefault);
      window.removeEventListener('keydown', handleKeyDown);
      contextMenu()
    };

  }, [isPlayingForward]);
  const onChoose = () => {
    setSelectedAnswer(content);
  }
  const reverseAnimation = () => {
    setIsPlayingForward(false); 
    setTimeout(() => {
      setAnswerChecked(false);
      setSelectedAnswer("")}, 5000)
    tl.current?.reverse();
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
    }
  }
  const playAnimation = () => {
    setIsPlayingForward(true);
    tl.current?.play();
  }
  return (
    <div className='option-frame' onClick={onChoose}>
      <div ref={textRef} className='content-question'>
        <p>{content}</p>
      </div>
      <img ref={imgRef} src={OPTION[0]}  alt="frame" className={cn('object-contain', color)} />
    </div>
  );
};
