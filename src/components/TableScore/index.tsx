import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TABLE_SCORE } from '@/constants';
import { useAppContext } from '@/contexts';
import { ITeam } from '@/interfaces';
import { _p } from '@/utils';
type Props = {
  item: ITeam;

}
export const TableScore: React.FC<Props> = ({ item }) => {
  const {setAnswer, checkAnswer, state} = useAppContext();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);
 
  useEffect(() => {
    // Initialize GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    TABLE_SCORE.forEach((frame, index) => {
      tl.current!.to(imgRef.current, {
        duration: 0.04, // adjust duration as needed
        onUpdate: () => {
          (imgRef.current) && (imgRef.current.src = frame);
          (index >= TABLE_SCORE.length - 20 && textRef.current) && 
            gsap.to(textRef.current, { opacity: 1, duration: 0.5 });
          (index !== TABLE_SCORE.length - 1 && textRef.current) &&
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
      (event.key === 's' || event.key === 'س') &&
        playAnimation();
      (event.shiftKey && (event.key === 'S' || event.key === 'ُ')) &&
        reverseAnimation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []); 
  const reverseAnimation = () => {
    tl.current?.reverse();
    checkAnswer(false);
    setAnswer("")
  }
  const playAnimation = () => {
    tl.current?.play();
  }
  return (
    <div className='relative w-[330px]' >
      <div ref={textRef} className='absolute gap-x-4 grid-cols-8 text-white inset-0 grid grid-flow-col px-4 py-2 mt-0.5'>
        <span className='col-span-1 text-center'>{_p(item.teamId)}</span>
        <span className='col-span-5'>{item.name}</span>
        <span className='col-span-2'>{_p(item.score)}</span>  
      </div>
      <img ref={imgRef} src={TABLE_SCORE[0]}  alt="frame" className="object-contain" />
    </div>
  );
};
