import React, { useRef } from 'react';
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

  const handleDownload = async () => {
    if (!posterRef.current) return;
    
    // We'll use html2canvas to convert the poster to image
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(posterRef.current, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
    });
    
    const link = document.createElement('a');
    link.download = `tensor-space-${userName.toLowerCase().replace(/\s+/g, '-')}-poster.png`;
    link.href = canvas.toDataURL();
    link.click();
  };
  return (
    <div className="relative">
      <div 
        ref={posterRef}
        className={`relative w-64 h-64 rounded-[24px] shadow-xl overflow-hidden ${className}`}
        style={{
          background: 'linear-gradient(180deg, #FF1744 0%, #FF5722 35%, #FF9800 65%, #FFC107 100%)'
        }}
      >
        {/* Clean Content Layout */}
        <div className="relative h-full flex flex-col justify-between p-6 text-center">
          
          {/* Top Section */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Main Name - Hero Element */}
            <div className="mb-6">
              <h1 className="text-white font-coolvetica text-4xl font-bold leading-none mb-3 drop-shadow-lg">
                {userName}
              </h1>
              <p className="text-white/90 font-satoshi text-base drop-shadow-sm">
                @{userInstagram}
              </p>
            </div>
            
            {/* Simple Divider */}
            <div className="w-16 h-px bg-white/50 mx-auto mb-6"></div>
            
            {/* Contest Label */}
            <div className="text-white/80 font-satoshi text-sm uppercase tracking-wider mb-2">
              Tensor Space
            </div>
            <div className="text-white/70 font-satoshi text-xs uppercase tracking-wider">
              Naming Contest
            </div>
          </div>
          
          {/* Bottom Logo Section */}
          <div className="flex justify-center pb-2">
            <img 
              src="/poster-bottom-logo.png" 
              alt="Tensor Space Logo"
              className="h-16 w-auto object-contain drop-shadow-lg"
              style={{
                filter: 'brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)'
              }}
            />
          </div>
          
        </div>
        
        {/* Bright overlay for vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-transparent to-black/10 pointer-events-none"></div>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/10 via-transparent to-red-500/10 pointer-events-none"></div>
        
      </div>
      
      {/* Download Button */}
      {showDownloadButton && (
        <button
          onClick={handleDownload}
          className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
          title="Download Poster"
        >
          <Download className="w-5 h-5 text-[#7a4a00]" />
        </button>
      )}
    </div>
  );
};

export default DynamicPoster;