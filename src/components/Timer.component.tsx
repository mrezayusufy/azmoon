import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { TIMER, TIMER_AUDIO } from '@/constants';
import { useAppContext } from '@/contexts';
import { _p } from '@/utils';
import useSound from 'use-sound';

type Props = {
  timer: number;
}

export const Timer: React.FC<Props> = ({ timer }) => {
  const {checkAnswer}= useAppContext()
  const [countdown, setCountdown] = useState(timer);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null); 
  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    TIMER.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, 
        onUpdate: () => {
          if(index === 0 && audioRef.current) {
            audioRef.current?.play();
          }
          imgRef.current && (imgRef.current.src = frame);
          if (index >= TIMER.length - 20 && textRef.current) {
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
            startCountdown();
          } else if (index !== TIMER.length - 1 && textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.5 });
          }
        },
      });
    });
    const handleKeyDown = (event: KeyboardEvent) => {
       (event.key === 't' || event.key === 'ف') && 
        playAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      tl.current?.kill();
      window.removeEventListener('keydown', handleKeyDown);
      stopCountdown();
    };
  }, []);
 
  const startCountdown = useCallback(() => {
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
  }, []);

  const stopCountdown = useCallback(() => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  const playAnimation = useCallback(() => {
    tl.current?.play();
  }, []);

  const reverseAnimation = useCallback(() => {
    tl.current?.reverse();
    if(audioRef.current) {
      gsap.to(audioRef.current, { volume: 0, duration: 1, onComplete: () => {
        audioRef.current?.pause();
        audioRef.current!.currentTime = 0;
      } });
    }
    setTimeout(() => {
      setCountdown(timer);
    }, 5000);
  }, [timer]);
  
useEffect(() => {
  if (countdown === 0) {
    setTimeout(() => {
      checkAnswer(true);
    }, 5000);
  }
}, [countdown]);
  return (
    <div className='timer'>
      <audio ref={audioRef} loop>
        <source src={TIMER_AUDIO} type="audio/wav"/>
      </audio>
      <div ref={textRef} >
        {countdown > 0 ? `${_p(countdown)}` : ''}
      </div>
      <img ref={imgRef} src={TIMER[0]} alt="frame" className='object-contain' />
    </div>
  );
};
