import React, { useEffect, useRef } from "react"
import { WINNER_FRAMES } from '@/constants';
import { gsap } from 'gsap';
type Props = {
  content: string;
}
export const WinnerComponent: React.FC<Props> = ({ content }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    WINNER_FRAMES.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onUpdate: () => {
          (imgRef.current) && (imgRef.current.src = frame);
          (index >= WINNER_FRAMES.length - 20 && textRef.current) &&
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          (index !== WINNER_FRAMES.length - 1 && textRef.current) &&
            gsap.to(textRef.current, { opacity: 0, duration: 0.05 });
        },
      });
    });

    // Cleanup function to kill the timeline on unmount
    return () => {
      (tl.current) && tl.current.kill();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      (event.key === 'w' || event.key === 'ص') &&
        playAnimation();
      (event.shiftKey && (event.key === 'W' || event.key === 'ٌ')) &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);
  const reverseAnimation = () => {
    tl.current?.reverse();
  }
  const playAnimation = () => {
    tl.current?.play();
  }
  return <section className="flex flex-col justify-end h-full">
    <div ref={textRef} className='absolute text-lg z-10 text-black bottom-20 mb-1 w-full grid place-content-center '>
      {content}
    </div>
    <img ref={imgRef} src={WINNER_FRAMES[0]} alt="winner frame" className="object-contain z-0" />
  </section>
}