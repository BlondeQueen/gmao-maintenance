'use client';

import React from 'react';
import Image from 'next/image';

interface DangoteLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const DangoteLogo: React.FC<DangoteLogoProps> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const pixelSizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        <Image
          src="/logo.png"
          alt="Dangote Cement Cameroon Logo"
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="w-full h-full object-contain drop-shadow-sm"
          priority={size === 'lg' || size === 'xl'}
          quality={90}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli/hDhz/ACb+t/4TcrlcrlcrlJ7ufe7n3u7+1" 
        />
      </div>
      
      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-red-600 leading-tight ${textSizes[size]}`}>
            DANGOTE
          </span>
          <span className={`font-semibold text-red-500 leading-tight ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-xs' : 'text-sm'}`}>
            CEMENT
          </span>
          {size !== 'sm' && (
            <span className="text-xs text-gray-500 leading-tight">
              CAMEROON
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DangoteLogo;
