import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DecorativeHearts from "@/components/decorative-hearts";

export default function Landing() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [, setLocation] = useLocation();

  const handleConfirmation = () => {
    setIsConfirmed(true);
  };

  const handleNextPage = () => {
    if (isConfirmed) {
      setLocation("/second-page");
    }
  };

  return (
    <div className="min-h-screen gradient-bg font-inter">
      <DecorativeHearts />
      
      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          
          {/* Greeting Card */}
          <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            
            {/* Greeting Message */}
            <div className="mb-16">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--elegant-gray)] mb-8 leading-tight tracking-wide">
                Merhaba <span className="text-[var(--purple-primary)] relative">
                  tatlı kızım
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--purple-accent)] to-transparent opacity-60"></div>
                </span>
              </h1>
              
              {/* Large sparkling purple heart */}
              <div className="text-7xl md:text-8xl heart-decoration mb-10 animate-pulse-soft relative inline-block">
                <div className="shimmer-heart absolute inset-0">♡</div>
                <div className="relative z-10">♡</div>
              </div>
              
              <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-10 rounded-full opacity-70"></div>
              
              <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] leading-relaxed max-w-2xl mx-auto font-normal">
                Bu ve geri kalan sayfalar Berat'ın tarafından senin için özenle tasarlandı. 
                <br className="hidden md:block" />
                <span className="text-[var(--purple-primary)] font-semibold text-xl"> Beni ne kadar çok sevdiğini söylemeden</span> 
                {' '}bir sonraki sayfaya geçemezsin.
              </p>
            </div>

            {/* Interaction Buttons */}
            <div className="space-y-5">
              
              {/* Söyledim Button */}
              <Button 
                onClick={handleConfirmation}
                disabled={isConfirmed}
                className={`relative overflow-hidden px-16 py-5 font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[var(--purple-light)] focus:ring-opacity-40 ${
                  isConfirmed 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-emerald-500/25' 
                    : 'bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white shadow-lg hover:shadow-purple-500/25'
                } hover:shadow-2xl`}
              >
                <span className="relative z-10">
                  {isConfirmed ? 'Ben de seni çok seviyorum ❤️' : 'Söyledim'} 
                </span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
              </Button>

              {/* Diğer Sayfaya Geç Button */}
              <Button 
                onClick={handleNextPage}
                disabled={!isConfirmed}
                className={`relative overflow-hidden px-16 py-5 font-inter font-semibold text-lg rounded-full transition-all duration-500 transform ${
                  isConfirmed 
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white cursor-pointer hover:scale-105 shadow-lg hover:shadow-slate-500/25 hover:shadow-2xl' 
                    : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                }`}
              >
                <span className="relative z-10">
                  Bir sonraki sayfa →
                </span>
                {isConfirmed && (
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                )}
              </Button>
            </div>

            {/* Status Indicator */}
            <div className="mt-10">
              <div className={`transition-all duration-700 transform ${
                isConfirmed 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95'
              }`}>
                {isConfirmed && (
                  <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-primary)]/10 to-[var(--purple-accent)]/10 rounded-full border border-[var(--purple-accent)]/20">
                    <div className="text-xl heart-decoration animate-pulse-soft">♡</div>
                    <p className="font-inter text-base font-medium text-[var(--purple-primary)]">
                      Artık bir sonraki sayfaya geçebilirsin yavruşum.
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Footer Note with decorative heart */}
          <div className="text-center mt-8">
            <div className="text-2xl heart-decoration mb-3 animate-float opacity-60">
              ♡
            </div>
            <p className="font-inter text-sm text-white opacity-75">
              Berat'ın senin için tasarladı güzelim.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
