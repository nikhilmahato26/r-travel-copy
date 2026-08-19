'use client';
import { useState, useEffect } from 'react';

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const handleVideoEnd = () => {
    setIsFading(true);
    // Remove from DOM after transition completes (500ms duration)
    setTimeout(() => {
      setIsVisible(false);
    }, 500);
  };

  // Fallback in case video fails to load or autoplay is blocked
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!isFading) {
        handleVideoEnd();
      }
    }, 8000); // 8 second fallback maximum

    return () => clearTimeout(fallbackTimer);
  }, [isFading]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ease-in-out ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative w-full h-full max-w-4xl mx-auto flex items-center justify-center p-4">
        <video
          src="https://res.cloudinary.com/dynbpb9u0/video/upload/v1787150040/logo_animation_ktvx6n.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-auto max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
