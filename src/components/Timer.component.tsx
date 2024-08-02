import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TIMER } from '@/constants';
import { useQuestionStore } from '@/store';

type Props = {
  timer: number;
}

export const Timer: React.FC<Props> = ({ timer }) => {
  const [countdown, setCountdown] = useState(timer);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  const checkAnswer = useQuestionStore(_ => _.checkAnswer);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    TIMER.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, 
        onUpdate: () => {
          imgRef.current && (imgRef.current.src = frame);
          if (index >= TIMER.length - 20 && textRef.current) {
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
            startCountdown();
          } else if (index !== TIMER.length - 1 && textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.05 });
          }
        },
      });
    });

    return () => {
      tl.current?.kill();
      stopCountdown();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
       (event.key === 't' || event.key === 'ف') && 
        playAnimation();
      
      (event.shiftKey && (event.key === 'T' || event.key === '،')) &&
        reverseAnimation();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopCountdown();
    };
  }, []);

  const startCountdown = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    countdownRef.current = setInterval(() => {
      setCountdown(prevCountdown => {
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
    }
  };

  const playAnimation = () => {
    tl.current?.play();
    textRef.current && gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
  };

  const reverseAnimation = () => {
    tl.current?.reverse();
    checkAnswer(); 
    textRef.current && gsap.to(textRef.current, { opacity: 0, duration: 0.5 });
    setTimeout(() => {
      setCountdown(timer);
    }, 5000);
  };

  return (
    <div className='timer'>
      <div ref={textRef} className='timer'>
        {countdown > 0 ? `${new Intl.NumberFormat('fa-IR').format(countdown)}` : ''}
      </div>
      <img ref={imgRef} src={TIMER[0]} alt="frame" className='object-contain' />
    </div>
  );
};
