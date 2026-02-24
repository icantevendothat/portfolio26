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
  // Track the "next" index we want to show
  const [pendingIndex, setPendingIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // We derive the project from the index that is CONFIRMED loaded
  const currentProject = data[currentIndex]; 

  // Timer only moves the PENDING index
  const nextImage = React.useCallback(() => {
    setPendingIndex((prev) => (prev + 1) % data.length);
  }, [data.length]);

  // Synchronizer: When pendingIndex changes, wait for that image to load
  useEffect(() => {
    if (pendingIndex === currentIndex) return;

    const img = new Image();
    img.src = data[pendingIndex].src;
    img.onload = () => {
      // ONLY update the real index once the image is in browser cache
      setCurrentIndex(pendingIndex);
    };
  }, [pendingIndex, data, currentIndex]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    // Note: 150ms is VERY fast. If images are large, they may skip beats 
    // to keep up with the titles.
    timerRef.current = setInterval(nextImage, 150);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextImage]);

  const handleTogglePause = () => setIsPaused(!isPaused);
  
  const showRichMedia = isPaused && currentProject.media;
  const isVideo = currentProject.media?.match(/\.(mp4|webm|ogg)$/i);

  if (!data || data.length === 0) return null;

  return (
    <>
      <div 
        className="main-viewport"
        style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        onClick={handleTogglePause}
      >
        {showRichMedia ? (
          isVideo ? (
            <video src={currentProject.media} autoPlay loop muted playsInline style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }} />
          ) : (
            <img src={currentProject.media} alt={currentProject.title} style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }} />
          )
        ) : (
          <img 
            key={currentProject.src} // KEY is vital here to force a clean swap
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
          style={{ pointerEvents: isPaused ? 'auto' : 'none', marginRight: '12px' }}
          onClick={(e) => e.stopPropagation()} 
        >
          "{currentProject.title}"
        </a>
        <span style={{ opacity: 0.6 }}>{currentProject.role}</span>
      </div>
    </>
  );
}