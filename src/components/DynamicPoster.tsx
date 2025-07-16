import React, { useRef, useEffect, useState } from 'react';
import { Download } from 'lucide-react';

interface DynamicPosterProps {
  userName: string;
  userInstagram: string;
  className?: string;
  showDownloadButton?: boolean;
}

const DynamicPoster: React.FC<DynamicPosterProps> = ({ 
  userName, 
  userInstagram, 
  className = "",
  showDownloadButton = false
}) => {
  const posterRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const userId = localStorage.getItem("userId");
  const profileUrl = userId ? `https://contest.tensorboy.com/users/${userId}` : '';

  const preloadImage = (src: string, crossOrigin?: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      img.src = src;
    });
  };

  const loadFonts = async (): Promise<void> => {
    // Load custom fonts
    const fontPromises = [
      document.fonts.load('normal Coolvetica'),
      document.fonts.load('bold Coolvetica'),
      document.fonts.load('normal Ivalencia'),
      document.fonts.load('normal Satoshi'),
      document.fonts.load('normal TheSeasons'),
    ];

    try {
      await Promise.all(fontPromises);
      console.log('Custom fonts loaded successfully');
    } catch (error) {
      console.warn('Some custom fonts failed to load:', error);
    }
  };

  const handleDownload = async () => {
    if (!posterRef.current) {
      console.error('Poster ref is null');
      return;
    }
    
    setIsExporting(true);
    console.log('Starting export...');
    
    try {
      // Load custom fonts first
      console.log('Loading custom fonts...');
      await loadFonts();
      
      // Preload the background image
      console.log('Preloading background image...');
      const backgroundImg = await preloadImage('/poster-export-bg.png');
      console.log('Background image loaded:', backgroundImg.width, 'x', backgroundImg.height);
      
      // Generate QR code and preload it
      if (!userId) {
        throw new Error('User ID not found');
      }
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}`;
      console.log('Loading QR code...');
      const qrCodeImg = await preloadImage(qrCodeUrl, 'anonymous');
      console.log('QR code loaded:', qrCodeImg.width, 'x', qrCodeImg.height);
      
      // Create canvas manually
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }
      
      // Set canvas size (9:16 ratio)
      canvas.width = 1080;
      canvas.height = 1920;
      
      // Draw background image
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
      
      // Set up text styles
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // TOP SECTION
      // Draw "Vote for" text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '500 100px Coolvetica, Arial, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
      ctx.fillText('VOTE FOR', canvas.width / 2, 450);
      
      // Draw contest name
      ctx.fillStyle = 'white';
      ctx.font = 'bold 160px Coolvetica, Arial, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 6;
      ctx.fillText(`${userName}`, canvas.width / 2, 600);
      
      // CENTER SECTION - QR CODE
      const qrSize = 350;
      const qrX = canvas.width / 2 - qrSize / 2;
      const qrY = 770;
      const borderWidth = 15;
      
      // Draw QR code border (white background with padding)
      ctx.fillStyle = 'white';
      ctx.fillRect(qrX - borderWidth, qrY - borderWidth, qrSize + borderWidth * 2, qrSize + borderWidth * 2);
      
      // Draw QR code
      ctx.drawImage(qrCodeImg, qrX, qrY, qrSize, qrSize);
      
      // BOTTOM SECTION
      // Draw prize text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '500 90px Coolvetica, Arial, sans-serif';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 3;
      
      // Split text into multiple lines if needed
      const prizeText = 'Scan and Get a chance to win EXCLUSIVE ACCESS!';
      const words = prizeText.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > canvas.width - 200 && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);
      
      const lineHeight = 85;
      const startY = 1400 - (lines.length * lineHeight) / 2;
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
      });
      
      // Draw contest branding background (rounded rectangle)
      // const brandingX = canvas.width / 2;
      // const brandingY = 1550;
      // const brandingWidth = 700;
      // const brandingHeight = 120;
      // const radius = 60;
      
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3;
      
      // Draw rounded rectangle
      // ctx.beginPath();
      // ctx.moveTo(brandingX - brandingWidth/2 + radius, brandingY - brandingHeight/2);
      // ctx.lineTo(brandingX + brandingWidth/2 - radius, brandingY - brandingHeight/2);
      // ctx.quadraticCurveTo(brandingX + brandingWidth/2, brandingY - brandingHeight/2, brandingX + brandingWidth/2, brandingY - brandingHeight/2 + radius);
      // ctx.lineTo(brandingX + brandingWidth/2, brandingY + brandingHeight/2 - radius);
      // ctx.quadraticCurveTo(brandingX + brandingWidth/2, brandingY + brandingHeight/2, brandingX + brandingWidth/2 - radius, brandingY + brandingHeight/2);
      // ctx.lineTo(brandingX - brandingWidth/2 + radius, brandingY + brandingHeight/2);
      // ctx.quadraticCurveTo(brandingX - brandingWidth/2, brandingY + brandingHeight/2, brandingX - brandingWidth/2, brandingY + brandingHeight/2 - radius);
      // ctx.lineTo(brandingX - brandingWidth/2, brandingY - brandingHeight/2 + radius);
      // ctx.quadraticCurveTo(brandingX - brandingWidth/2, brandingY - brandingHeight/2, brandingX - brandingWidth/2 + radius, brandingY - brandingHeight/2);
      // ctx.closePath();
      // ctx.fill();
      // ctx.stroke();
      // ctx.restore();
      
      // // Draw contest branding text
      // ctx.fillStyle = 'white';
      // ctx.font = 'bold 68px Coolvetica, Arial, sans-serif';
      // ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      // ctx.shadowBlur = 8;
      // ctx.shadowOffsetX = 0;
      // ctx.shadowOffsetY = 3;
      // ctx.fillText('Tensor Space Contest', brandingX, brandingY);
      
      // // Add subtle overlay
      // const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      // gradient.addColorStop(0, 'rgba(0, 0, 0, 0.02)');
      // gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
      // gradient.addColorStop(1, 'rgba(0, 0, 0, 0.05)');
      // ctx.fillStyle = gradient;
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      console.log('Canvas drawing completed');
      
      // Create download link
      const link = document.createElement('a');
      link.download = `tensor-space-${userName.toLowerCase().replace(/\s+/g, '-')}-poster.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      
      console.log('Download link created, triggering download...');
      link.click();
      
    } catch (error) {
      console.error('Error downloading poster:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Listen for download events from parent components
  useEffect(() => {
    const handleDownloadEvent = () => {
      handleDownload();
    };

    const posterElement = posterRef.current;
    if (posterElement) {
      posterElement.addEventListener('downloadPoster', handleDownloadEvent);
      return () => {
        posterElement.removeEventListener('downloadPoster', handleDownloadEvent);
      };
    }
  }, []);

  return (
    <div className="relative">
      {/* Poster */}
      <div 
        ref={posterRef}
        data-poster-ref
        className={`relative w-64 h-80 rounded-[24px] shadow-xl overflow-hidden ${className}`}
        style={{
          backgroundImage: 'url(/poster-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Content Layout */}
        <div className="relative h-full flex flex-col justify-between items-center p-6 text-center">
          
          {/* Top Section */}
          <div className="flex flex-col items-center space-y-4 pt-0">
            {/* Vote for heading */}
            <div className="text-white/90 font-coolvetica text-lg font-medium uppercase tracking-wider">
              Vote for
            </div>
            
            {/* Contest Name in quotes */}
            <div>
              <h1 className="text-white font-coolvetica text-3xl font-bold leading-none drop-shadow-lg">
                {userName}
              </h1>
            </div>
          </div>
          
          {/* Center Section - QR Code */}
          <div className="flex flex-col items-center pt-2 pb-0 mb-0">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}`}
                  alt="Profile QR Code"
                  className="w-20 h-20"
                />
              </div>
            </div>
          
          {/* Bottom Section */}
          <div className="flex flex-col items-center pt-0 mt-0">
            {/* Prize text */}
            <div className="text-white/90 font-coolvetica text-sm font-medium text-center px-0 pt-0">
              Scan and Get a chance to win EXCLUSIVE ACCESS!
            </div>
          </div>
          
        </div>
        
        {/* Very light overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/2 via-transparent to-black/5 pointer-events-none"></div>
      </div>
      
      {/* Download Button */}
      {showDownloadButton && (
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className={`absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform ${
            isExporting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Download Poster"
        >
          <Download className={`w-5 h-5 text-[#7a4a00] ${isExporting ? 'animate-pulse' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default DynamicPoster;