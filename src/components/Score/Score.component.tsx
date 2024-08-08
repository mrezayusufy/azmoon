import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { SCORE as FRAMES, SHORTCUTS } from '@/constants';
import { _p } from '@/utils';
import { TEXT_OPENER_AUDIO } from '@/constants/TEXT_OPENER_AUDIO';
type Props = {
  content: number;
}
export const ScoreComponent: React.FC<Props> = ({content}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); 
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });
    FRAMES.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onUpdate: () => {
          (imgRef.current) && (imgRef.current.src = frame);
          if (index >= FRAMES.length - 30 && textRef.current) {
            gsap.to(textRef.current, { opacity: 1, duration: 0.05,  scale: 1  });
          } else if (index !== FRAMES.length - 1 && textRef.current) {
            gsap.to(textRef.current, { opacity: 0, duration: 0.07,  scale: 0 });
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
      (event.key === SHORTCUTS.pointPlay.key || event.key === SHORTCUTS.pointPlay.persianKey) &&
        playAnimation();
      (event.key === SHORTCUTS.pointReverse.key || event.key === SHORTCUTS.pointReverse.key) &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  const playAnimation = () => {
    tl.current?.play();
    if(audioRef.current){
      audioRef.current.currentTime = 2;
      audioRef.current?.play();
    }
  };

  const reverseAnimation = () => {
    tl.current?.reverse();
    if(audioRef.current) {
      audioRef.current!.currentTime = 2;
      audioRef.current.play();
    }
  };
  const point = "امتیاز"
  return (
    <section className='timer'>
      <audio ref={audioRef}>
        <source src={TEXT_OPENER_AUDIO} type="audio/wav"/>
      </audio>
      <p ref={textRef} className='opacity-0'>
        <span>{_p(content)}</span>
        <span className='text-2xl'>{point}</span>
      </p>
      <img ref={imgRef} src={FRAMES[0]} alt="frame"/>
    </section>
  );
};
