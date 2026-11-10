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
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Pre-loaded image objects stored in a ref so they stay cached in memory
  const cachedImagesRef = useRef<HTMLImageElement[]>([]);

  // 1. Preload ALL images into memory on initial mount
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    cachedImagesRef.current = data.map((project) => {
      const img = new window.Image();
      img.src = project.src;
      return img;
    });
  }, [data]);

  const currentProject = data[currentIndex];

  // 2. Pure, constant-interval ticker using pre-cached data
  useEffect(() => {
    if (isPaused || !data || data.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 150);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, data.length]);

  useEffect(() => {
    setMediaLoaded(false);
  }, [currentIndex]);

  const handleTogglePause = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  if (!data || data.length === 0) return null;

  const isVideo = currentProject.media?.match(/\.(mp4|webm|ogg)$/i);
  const shouldShowRichMedia = isPaused && currentProject.media && mediaLoaded;

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
          position: 'relative'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            width: '70vw',
            height: '70vh',
            zIndex: 10,
            cursor: 'pointer'
          }}
          onClick={handleTogglePause}
          onTouchStart={handleTogglePause}
        />

        {isPaused && currentProject.media && !isVideo && (
          <img
            src={currentProject.media}
            onLoad={() => setMediaLoaded(true)}
            style={{ display: 'none' }}
            alt=""
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
              onLoadedData={() => setMediaLoaded(true)}
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
            style={{ 
              width: '55vw', 
              aspectRatio: '16/9', 
              objectFit: 'contain',
              willChange: 'opacity' // Optimizes layer rendering in browser
            }}
          />
        )}
      </div>

      <div className="project-meta-center" style={{ bottom: '30px', zIndex: 20, position: 'absolute' }}>
        <a
          href={currentProject.link}
          className="project-title-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ pointerEvents: isPaused ? 'auto' : 'none', marginRight: '12px' }}
          onClick={(e) => e.stopPropagation()}
        >
          &quot;{currentProject.title}&quot;
        </a>
        <span style={{ opacity: 0.6 }}>{currentProject.role}</span>
      </div>
    </>
  );
}