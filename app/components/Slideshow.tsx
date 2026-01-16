"use client";

import React, { useState, useEffect, useRef } from "react";

type Project = {
  src: string;
  media?: string;
  title: string;
  role: string;
  link: string;
};

export default function Slideshow({ data }: { data: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(nextImage, 150);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextImage]);

  const handleTogglePause = () => setIsPaused(!isPaused);

  const currentProject = data[currentIndex];
  
  const showRichMedia = isPaused && currentProject.media;
  const isVideo = currentProject.media?.match(/\.(mp4|webm|ogg)$/i);

  if (!data || data.length === 0) return null;

  return (
    <>
      <div 
        className="main-viewport"
        style={{ 
          height: '100vh', 
          width: '100vw', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={handleTogglePause}
      >
        {showRichMedia ? (
          isVideo ? (
            <video
              src={currentProject.media}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }}
            />
          ) : (
            <img 
              src={currentProject.media} 
              alt={currentProject.title} 
              style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }} 
            />
          )
        ) : (
          <img 
            src={currentProject.src} 
            alt={currentProject.title} 
            style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }} 
          />
        )}
      </div>
  
      <div className="project-meta-center" style={{ bottom: '30px' }}>
        <a 
          href={currentProject.link} 
          className="project-title-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            pointerEvents: isPaused ? 'auto' : 'none',
            marginRight: '12px' 
          }}
          onClick={(e) => e.stopPropagation()} 
        >
          "{currentProject.title}"
        </a>
        <span style={{ opacity: 0.6 }}>{currentProject.role}</span>
      </div>
    </>
  );
}