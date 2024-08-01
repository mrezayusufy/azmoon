import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {QUESTION_FRAMES} from '../constants';
import {Title} from './Title.component';
export const Question = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReversed, setIsReversed] = useState(false); 
  const [showText, setShowText] = useState(false);
  const frameRef = useRef<HTMLImageElement | null>(null);
  const frames = Object.values(QUESTION_FRAMES);
  const totalFrames = QUESTION_FRAMES.length;
  const frameRate = 26; // Number of frames per second
  const duration = totalFrames / frameRate;
  const tl = useRef<GSAPTimeline | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    tl.current = gsap.timeline({
      paused: false,
      repeat: 0,
      onUpdate: () => {
        if (tl.current) {
          console.log("playing")
          const progress = tl.current.progress();
          if(progress < 1) {
            const frameIndex = Math.floor(progress * totalFrames);
            
            if (frameRef.current) {
              frameRef.current.src = QUESTION_FRAMES[frameIndex];
            }
            if (frameIndex === totalFrames - 1) {
              tl.current!.pause();
              setShowText(true);
              gsap.to(".overlay-text", { opacity: 1, duration: 1 });
            }
          }
        }
      },
      onComplete: () => {
        // tl.current!.pause();
      },
    });

    // Create the timeline animation
    tl.current.to({}, { duration, ease: 'none' });

    // Play the animation when the page loads
    tl.current.play();
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === " ") {
        handlePlayPause();
      } else if (e.key === "p" || e.key === "P") {
        if (showText) {
          gsap.to(".overlay-text", { opacity: 0, duration: 1, onComplete: () => setShowText(false) });
          setTimeout(() => handleReverse(), 1000); // Delay reverse to sync with text fade out
        } else {
          handleReverse();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [frames, duration, totalFrames, showText]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      tl.current!.pause();
    } else {
      setIsPlaying(true);
      tl.current!.play(); 
    }
  };

  const handleReverse = () => {
    if (tl.current) {
      if (isReversed) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
      setIsReversed(!isReversed);
      setIsPlaying(true);
    }
  };
  const txt = "سریع ترین سریع ترین سریع ترین سریع ترین حیوان در خشکه کدام یکی از این ها است؟"
  return (
    <div className='relative'>
      <div className='absolute overlay-text bottom-24 right-1/2 translate-x-1/2 text-xl  text-white w-[550px]  text-size'><Title text={txt} maxLength={42}/></div>
      
      <img ref={frameRef} src={frames[0]} alt="Frame" className='w-dvw h-dvh object-contain'/>
      <div className='absolute bottom-0 left-0'>
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={handleReverse}>{isReversed ? 'Play Forward' : 'Reverse'}</button>
      </div> 
    </div>
  );
};

