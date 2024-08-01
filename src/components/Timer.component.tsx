import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TIMER } from '../constants';
import { useQuestionStore } from '../store';
type Props = {
  timer: number;
}
export const Timer: React.FC<Props> = ({timer}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlayingForward, setIsPlayingForward] = useState(true);
  const [countdown, setCountdown] = useState(timer); // Countdown timer starts at 30 seconds
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const {checkAnswer} = useQuestionStore();

  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    TIMER.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // Adjust duration as needed
        onStart: () => setCurrentFrame(index),
        onUpdate: () => {
          if (imgRef.current) {
            imgRef.current.src = frame;
          }
          if (index >= TIMER.length - 20 && textRef.current) {
            // Fade in the text when the last frame is reached
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
            startCountdown();
          } else if (index !== TIMER.length - 1 && textRef.current) {
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
      stopCountdown();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 't' || event.key === 'ف' ) {
        if (tl.current?.isActive()) {
          tl.current?.pause();
        } else {
          setIsPlayingForward(true);
          tl.current?.play();
          if (textRef.current) {
            gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
          }
        }
      } else if (event.shiftKey) {
        if (event.key === 'T' || event.key === '،') {
          setIsPlayingForward(false);
          tl.current?.reverse();
          if (textRef.current) {
            gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopCountdown();
    };
  }, [isPlayingForward]);

  const startCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          stopCountdown();
          reverseAnimation();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  const stopCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
      setCountdown(timer)
    }
  };

  const reverseAnimation = () => {
    setIsPlayingForward(false);
    tl.current?.reverse();
    // check answer
    checkAnswer();
  
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 0 }); // Hide the text when animation restarts
      setTimeout(() => {
        setCountdown(timer);
      }, 2000);
    }
  };

  return (
    <div className='relative'>
      <div ref={textRef} className='timer' >
        {countdown > 0 ? `${new Intl.NumberFormat("fa-IR").format(countdown)}` : ''}
      </div>
      <img ref={imgRef} src={TIMER[0]} alt="frame" className='object-contain' />
    </div>
  );
};
