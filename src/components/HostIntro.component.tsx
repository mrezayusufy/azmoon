import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { HOST_INTRO } from '../constants';
type Props = {
  title: string;
  subtitle: string;
} 
export const HostIntro: React.FC<Props> = ({title, subtitle}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    HOST_INTRO.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, 
        onUpdate: () => {
          if (imgRef.current) {
            imgRef.current.src = frame;
          }
          if (index >= HOST_INTRO.length - 20 && textRef.current) { 
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          } else if (index !== HOST_INTRO.length - 1 && textRef.current) {
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
      (event.key === 'h' || event.key === 'ا') &&
        tl.current?.play();
      (event.key === 'H' || event.key === 'آ') &&
        tl.current?.reverse();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='relative w-[320px]'>
      <div ref={textRef} className='absolute opacity-0 right-0 top-4 text-white pt-1 pr-36 mr-2 text-right  text-base flex flex-col leading-tight gap-y-1'>
        <div>{title}</div>
        <div>{subtitle}</div>
      </div>
      <img ref={imgRef} src={HOST_INTRO[0]} alt="frame" className='object-contain' />
    </div>
  );
};
