import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DecorativeHearts from "@/components/decorative-hearts";

export default function ThirdPage() {
  const [, setLocation] = useLocation();
  const [heartLevel, setHeartLevel] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const messages = {
    25: "Güzel Nisa'm, seni çok seviyorum, çok güzelsin, çok tatlısın.",
    50: "Sen benim akranlarım arasında gördüğüm en mükemmel şeysin. Umarım o güzel ellerini tutabilir, öpebilirim.",
    75: "Bu güzelliğini, tatlılığını bana sakla. Ben sana güzel şeyler saklıyorum. Saklandığın yerden aldığım zaman hayatını güzelleştireceğim.",
    100: "Evet, sayende kalbim seninle doldu."
  };

  const goBackToSecond = () => {
    setLocation("/second-page");
  };

  const goBackToFirst = () => {
    setLocation("/");
  };

  const fillHeart = () => {
    if (heartLevel < 100) {
      const newLevel = Math.min(heartLevel + 25, 100);
      setHeartLevel(newLevel);
      
      const message = messages[newLevel as keyof typeof messages];
      setCurrentMessage(message);
      setShowMessage(true);
      
      // Hide message after 4 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  };

  const resetGame = () => {
    setHeartLevel(0);
    setCurrentMessage("");
    setShowMessage(false);
  };

  return (
    <div className="min-h-screen gradient-bg font-inter">
      <DecorativeHearts />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--elegant-gray)] mb-8">
              ♡
            </h1>
            
            <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-10 rounded-full opacity-70"></div>
            
            <div className="mb-12">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[var(--purple-primary)] mb-6">
                Kalbimi Doldur ♡
              </h2>
              <p className="font-inter text-lg text-[var(--warm-gray)] mb-8">
                Kalbime tıklayarak doldur ve sana olan hislerimi açığa çıkar.
              </p>
            </div>

            {/* Modern Heart Container */}
            <div className="mb-10">
              <div className="relative inline-block">
                
                {/* Magical background effects */}
                <div className="absolute -inset-16 pointer-events-none">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-30"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Modern 3D Heart Container */}
                <div className="relative group">
                  
                  {/* Outer glow ring */}
                  <div className="absolute -inset-8 border-2 border-purple-300/20 rounded-full animate-pulse"></div>
                  <div className="absolute -inset-12 border border-pink-300/10 rounded-full animate-ping"></div>
                  
                  {/* Heart Background - Modern gradient */}
                  <div 
                    className="text-9xl select-none bg-gradient-to-br from-slate-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.3))',
                    }}
                  >
                    ♡
                  </div>
                  
                  {/* Heart Fill - Gradient fill effect */}
                  <div 
                    className="absolute inset-0 text-9xl overflow-hidden transition-all duration-1000 ease-out"
                    style={{
                      clipPath: `inset(${100 - heartLevel}% 0 0 0)`,
                      background: 'linear-gradient(45deg, #ec4899, #a855f7, #3b82f6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))',
                    }}
                  >
                    ♥
                  </div>
                  
                  {/* Sparkle effects around filled areas */}
                  {heartLevel > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping"
                          style={{
                            left: `${40 + Math.sin(i) * 30}%`,
                            top: `${40 + Math.cos(i) * 30}%`,
                            animationDelay: `${i * 0.2}s`,
                            opacity: heartLevel / 100,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Clickable Heart Overlay */}
                  <div 
                    className={`absolute inset-0 text-9xl cursor-pointer transition-all duration-300 group-hover:scale-110 ${
                      heartLevel >= 100 ? 'cursor-default' : 'hover:drop-shadow-2xl'
                    }`}
                    onClick={fillHeart}
                    style={{ 
                      color: 'transparent',
                      filter: heartLevel >= 100 ? 'drop-shadow(0 0 40px rgba(236, 72, 153, 1))' : 'none'
                    }}
                  >
                    ♡
                  </div>
                </div>
              </div>
              
              {/* Modern Progress Indicator */}
              <div className="mt-8">
                <div className="relative w-80 h-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-full mx-auto overflow-hidden border-2 border-purple-500/30 shadow-lg">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-1000 ease-out rounded-full relative"
                    style={{ 
                      width: `${heartLevel}%`,
                      boxShadow: '0 0 20px rgba(236, 72, 153, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse"></div>
                  </div>
                  
                  {/* Progress markers */}
                  {[25, 50, 75, 100].map((mark) => (
                    <div
                      key={mark}
                      className={`absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full border-2 ${
                        heartLevel >= mark ? 'bg-yellow-300 border-yellow-400' : 'bg-slate-600 border-slate-500'
                      }`}
                      style={{ left: `${mark}%`, marginLeft: '-4px' }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between mt-3 text-xs text-purple-300 font-medium">
                  <span>0%</span>
                  <span className="text-lg font-bold text-purple-400">%{heartLevel} ♡</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {showMessage && (
              <div className="mb-8 p-6 bg-gradient-to-r from-[var(--purple-primary)]/10 to-[var(--purple-accent)]/10 rounded-2xl border border-[var(--purple-accent)]/20 animate-fade-in">
                <div className="text-2xl heart-decoration mb-3 animate-pulse-soft">♡</div>
                <p className="font-inter text-lg md:text-xl text-[var(--purple-primary)] font-medium leading-relaxed max-w-3xl mx-auto">
                  {currentMessage}
                </p>
              </div>
            )}

            {/* Current Message Display (Always Visible) */}
            {currentMessage && !showMessage && (
              <div className="mb-8 p-4 bg-[var(--purple-primary)]/5 rounded-xl">
                <p className="font-inter text-base text-[var(--warm-gray)] italic">
                  Son mesaj: "{currentMessage}"
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              {heartLevel >= 100 ? (
                <div className="space-y-4">
                  <div className="mb-6">
                    <div className="text-4xl animate-pulse-soft mb-4">💖✨💖</div>
                    <p className="font-playfair text-2xl text-[var(--purple-primary)] font-bold">
                      Kalbimi doldurdun güzelim ♡
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button 
                      onClick={() => setLocation("/fourth-page")}
                      className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                    >
                      Diğer Sayfaya Geç ♡
                    </Button>
                    
                    <Button 
                      onClick={resetGame}
                      className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      Tekrar Oyna
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="font-inter text-[var(--warm-gray)] text-lg mb-6">
                  Kalbe tıkla ve içimi ısıt.
                </p>
              )}
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button 
                  onClick={goBackToSecond}
                  className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  ← İkinci Sayfaya Dön
                </Button>
                
                <Button 
                  onClick={goBackToFirst}
                  className="px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  ← Ana Sayfaya Dön
                </Button>
              </div>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="text-center mt-8">
            <div className="text-xl heart-decoration mb-2 animate-float opacity-60">♡</div>
            <p className="font-inter text-sm text-white opacity-75">
              Üçüncü sayfa - ♡
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}