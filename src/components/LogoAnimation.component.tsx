import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { LOGO_FRAMES } from '../constants';
 
export const LogoAnimation: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    LOGO_FRAMES.forEach((frame) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, 
        onUpdate: () => {
          if (imgRef.current)
            imgRef.current.src = frame;
        },
      });
    });
    tl?.current.play(); 

    const handleNavigation = () => {
      tl.current && tl.current.reverse();
      
    };

    // Add the event listener to handle navigation
    window.addEventListener('beforeunload', handleNavigation);
 
    return () => {
      window.removeEventListener('beforeunload', handleNavigation);
      tl.current && tl.current.kill();
    };
  }, []);

  return <div className='login'>
      <img ref={imgRef} src={LOGO_FRAMES[0]} alt="frame" className='object-contain w-[250px]' />
    </div>
};
