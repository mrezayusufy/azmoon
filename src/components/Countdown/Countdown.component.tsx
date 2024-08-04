import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { TIMER } from '@/constants';

 

const FramePlayer = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const frameDuration = 10; // Duration in seconds for each frame
    const totalFrames = TIMER.length;
    const frameInterval = frameDuration * 1000; // Convert to milliseconds

    let currentFrame = 0;
    let animation : any;

    const playFrames = () => {
      animation = gsap.to(imgRef.current, {
        duration: frameDuration,
        onUpdate: () => {
          
        },
        onComplete: () => {
          currentFrame = (currentFrame + 1) % totalFrames;
          playFrames();
        },
      });
    };

    playFrames();

    // Clean up when component unmounts
    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, []);

  return <img ref={imgRef} src={TIMER[0]} alt="Frame" />;
};

export default FramePlayer;
