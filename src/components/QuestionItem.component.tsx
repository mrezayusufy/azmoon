import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ONE_QUESTION_FRAMES } from '../constants';
import { Title } from './Title.component';
type Props = {
  content: string;
}
export const QuestionItem: React.FC<Props> = ({content}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const [isPlayingForward, setIsPlayingForward] = useState(true);
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    ONE_QUESTION_FRAMES.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onStart: () => setCurrentFrame(index),
        onUpdate: () => {
          if (imgRef.current) {
            imgRef.current.src = frame;
          }
          if (index >= ONE_QUESTION_FRAMES.length - 50 && textRef.current) {
            // Fade in the text when the last frame is reached
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          } else if (index !== ONE_QUESTION_FRAMES.length - 1 && textRef.current) {
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
      if(event.key === 'q' || event.key === 'ض')
        playAnimation();
      else if(event.key === 'Q' || event.key === 'ً')
        reverseAnimation()
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, [isPlayingForward]);

  const playAnimation = () => {
    setIsPlayingForward(true);
    tl.current?.play();
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
    }
  };

  const reverseAnimation = () => {
    setIsPlayingForward(false);
    tl.current?.reverse();
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
    }
  };

  return (
    <div className='relative'>
      <div ref={textRef} className='opacity-0 grid px-6 pt-2 place-content-center inset-0 transition-opacity duration-100 absolute text-wrap text-white w-full'>
        <Title text={content} maxLength={18}/>
      </div>
      <img ref={imgRef} src={ONE_QUESTION_FRAMES[0]} alt="frame" className='object-contain'/>
    </div>
  );
};
