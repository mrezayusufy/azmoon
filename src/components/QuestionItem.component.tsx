import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ONE_QUESTION_FRAMES } from '@/constants';
import { Title } from './Title.component';
type Props = {
  content: string;
}
export const QuestionItem: React.FC<Props> = ({content}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    ONE_QUESTION_FRAMES.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onUpdate: () => {
          (imgRef.current) && (imgRef.current.src = frame);
          if (index >= ONE_QUESTION_FRAMES.length - 50 && textRef.current) {
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          } else if (index !== ONE_QUESTION_FRAMES.length - 1 && textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.05 });
          }
        },
      });
    });

    return () => {
      (tl.current) && tl.current.kill();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      (event.key === 'q' || event.key === 'ض') &&
        playAnimation();
      (event.key === 'Q' || event.key === 'ً') &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  const playAnimation = () => {
    tl.current?.play();
    (textRef.current) && gsap.set(textRef.current, { opacity: 1 }); 
  };

  const reverseAnimation = () => {
    tl.current?.reverse();
    (textRef.current) && gsap.set(textRef.current, { opacity: 0 }); 
  };

  return (
    <section className='question'>
      <div ref={textRef}>
        <Title text={content} maxLength={18}/>
      </div>
      <img ref={imgRef} src={ONE_QUESTION_FRAMES[0]} alt="frame"/>
    </section>
  );
};
