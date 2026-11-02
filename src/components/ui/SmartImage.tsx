/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface SmartImageProps {
  src: string;
  secondarySrc?: string;
  alt: string;
  aspectRatio?: '4:5' | '16:10' | '1:1' | 'auto';
  placeholderColor?: '#FBDDE8' | '#FBE9A0' | '#DCE3FA' | string;
  fallbackTitle?: string;
  className?: string;
  priority?: boolean;
  onHoverSwap?: boolean;
}

export function SmartImage({
  src,
  secondarySrc,
  alt,
  aspectRatio = '4:5',
  placeholderColor = '#FBE9A0',
  fallbackTitle,
  className = '',
  priority = false,
  onHoverSwap = false,
}: SmartImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const aspectClass =
    aspectRatio === '4:5'
      ? 'aspect-[4/5]'
      : aspectRatio === '16:10'
      ? 'aspect-[16/10]'
      : aspectRatio === '1:1'
      ? 'aspect-square'
      : '';

  const handleError = () => {
    if (secondarySrc && currentSrc !== secondarySrc) {
      setCurrentSrc(secondarySrc);
    } else {
      setHasError(true);
    }
  };

  const displaySrc = onHoverSwap && isHovered && secondarySrc ? secondarySrc : currentSrc;

  return (
    <div
      className={`relative overflow-hidden w-full ${aspectClass} select-none ${className}`}
      style={{ backgroundColor: placeholderColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!hasError ? (
        <img
          src={displaySrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-300 momo-img ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <span className="font-accent italic text-lg text-[#14183A] leading-tight">
            {fallbackTitle || alt}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#14183A]/70 mt-1">
            MOMO Object
          </span>
        </div>
      )}
    </div>
  );
}
