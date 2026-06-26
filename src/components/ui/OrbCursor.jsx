import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const OrbCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      setIsHoveringLink(true);
      gsap.to(follower, {
        scale: 1.5,
        duration: 0.3,
        ease: 'power2.out',
      });
       gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      setIsHoveringLink(false);
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', moveCursor);

    document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);


  return (
    <>
      <div ref={cursorRef} className="orb-cursor__dot"></div>
      <div ref={followerRef} className="orb-cursor__follower"></div>
    </>
  );
};

export default OrbCursor;
