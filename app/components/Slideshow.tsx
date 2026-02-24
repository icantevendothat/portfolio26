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
  const [pendingIndex, setPendingIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentProject = data[currentIndex];

  const nextImage = React.useCallback(() => {
    setPendingIndex((prev) => (prev + 1) % data.length);
  }, [data.length]);

  useEffect(() => {
    if (pendingIndex === currentIndex) return;
    const img = new Image();
    img.src = data[pendingIndex].src;
    img.onload = () => {
      setCurrentIndex(pendingIndex);
    };
  }, [pendingIndex, data, currentIndex]);

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

  useEffect(() => {
    setMediaLoaded(false);
  }, [currentIndex]);

  // --- THE LOGGING LOGIC ---
  const handleTogglePause = (e: React.MouseEvent | React.TouchEvent) => {
    // This prevents the click from 'bubbling' up to other elements
    e.preventDefault();
    e.stopPropagation();
    
    const newPauseState = !isPaused;
    
    setIsPaused(newPauseState);
  };

  const isVideo = currentProject.media?.match(/\.(mp4|webm|ogg)$/i);
  const shouldShowRichMedia = isPaused && currentProject.media && mediaLoaded;

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
          position: 'relative' // Needed for the hit-box
        }}
      >
        {/* HIT-BOX: An invisible layer over the center that captures all clicks */}
        <div 
          style={{
            position: 'absolute',
            width: '70vw', // Slightly larger than the image for easier clicking
            height: '70vh',
            zIndex: 10,
            cursor: 'pointer'
          }}
          onClick={handleTogglePause}
          onTouchStart={handleTogglePause} // Better response for mobile
        />

        {isPaused && currentProject.media && !isVideo && (
          <img
            src={currentProject.media}
            onLoad={() => {
              console.log("Rich media image loaded.");
              setMediaLoaded(true);
            }}
            style={{ display: 'none' }}
          />
        )}

        {shouldShowRichMedia ? (
          isVideo ? (
            <video
              src={currentProject.media}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => {
                console.log("Rich media video loaded.");
                setMediaLoaded(true);
              }}
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
            key={currentProject.src}
            src={currentProject.src}
            alt={currentProject.title}
            style={{ width: '55vw', aspectRatio: '16/9', objectFit: 'contain' }}
          />
        )}
      </div>

      <div className="project-meta-center" style={{ bottom: '30px', zIndex: 20 }}>
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