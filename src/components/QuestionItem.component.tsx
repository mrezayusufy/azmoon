import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ONE_QUESTION_FRAMES, SHORTCUTS } from '@/constants';
import { Title } from './Title.component';
import useSound from 'use-sound'; 
type Props = {
  content: string;
}
export const QuestionItem: React.FC<Props> = ({content}) => {
  const [play] = useSound("/sound/TEXT_OPENER.wav",{
    playbackRate: 1.5,

  });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
          if(index === 0) play();
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
      (event.key === SHORTCUTS.questionPlay.key || event.key === SHORTCUTS.questionPlay.persianKey) &&
        playAnimation();
      (event.key === SHORTCUTS.questionReverse.key || event.key === SHORTCUTS.questionReverse.key) &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  const playAnimation = () => {
    tl.current?.play();
  };

  const reverseAnimation = () => {
    tl.current?.reverse();
  };

  return (
    <section className='question'>
      <div ref={textRef} className='opacity-0'>
        <Title text={content} maxLength={18}/>
      </div>
      <img ref={imgRef} src={ONE_QUESTION_FRAMES[0]} alt="frame"/>
    </section>
  );
};
