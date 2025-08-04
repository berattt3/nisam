import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DecorativeHearts from "@/components/decorative-hearts";

export default function SecondPage() {
  const [, setLocation] = useLocation();
  const [gameStarted, setGameStarted] = useState(false);
  const [heartPlaced, setHeartPlaced] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const heartRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const goBackToFirst = () => {
    setLocation("/");
  };

  const startGame = () => {
    setGameStarted(true);
    setHeartPlaced(false);
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setHeartPosition({ x: 100, y: 100 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (heartPlaced) return;
    setIsDragging(true);
    setShowErrorMessage(false);
    
    // Kalbin merkezini bul
    const rect = e.currentTarget.getBoundingClientRect();
    const heartCenterX = rect.width / 2;
    const heartCenterY = rect.height / 2;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 60fps için requestAnimationFrame kullan
      requestAnimationFrame(() => {
        setHeartPosition({
          x: moveEvent.clientX - heartCenterX - 250,
          y: moveEvent.clientY - heartCenterY - 200
        });
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      
      // Daha geniş drop zone toleransı
      if (dropZoneRef.current && heartRef.current) {
        const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
        const heartRect = heartRef.current.getBoundingClientRect();
        
        // Çok daha geniş tolerans - 100px
        const isInDropZone = (
          heartRect.left >= dropZoneRect.left - 100 &&
          heartRect.right <= dropZoneRect.right + 100 &&
          heartRect.top >= dropZoneRect.top - 100 &&
          heartRect.bottom <= dropZoneRect.bottom + 100
        );

        if (isInDropZone) {
          setHeartPlaced(true);
          setShowSuccessMessage(true);
          // Otomatik olarak merkeze yerleştir
          setHeartPosition({
            x: dropZoneRect.left + dropZoneRect.width / 2 - 40 - 250,
            y: dropZoneRect.top + dropZoneRect.height / 2 - 40 - 200
          });
          // Başarı mesajını 4 saniye sonra gizle
          setTimeout(() => setShowSuccessMessage(false), 4000);
        } else {
          // Daha nazik hata mesajları
          const errorMessages = [
            "Biraz daha yaklaştır sevgilim...",
            "Neredeyse tamam, bir deneme daha...",
            "Çok yaklaştın, devam et..."
          ];
          setErrorMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
          setShowErrorMessage(true);
          setTimeout(() => setShowErrorMessage(false), 2500);
        }
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen gradient-bg font-inter">
        <DecorativeHearts />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-3xl">
            <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--elegant-gray)] mb-8">
                ♡
              </h1>
              
              <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-10 rounded-full opacity-70"></div>
              
              <div className="mb-10">
                <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] leading-relaxed max-w-2xl mx-auto mb-8">
                  Oyunu başlattıktan sonra gördüğün kalp benim.
                </p>
                
                <p className="font-inter text-lg md:text-xl text-[var(--purple-primary)] font-semibold leading-relaxed max-w-2xl mx-auto">
                  Kalbimi bana getirdin,şimdi kalbimi güzel ellerini kullanarak yerine koy ve devam et.
                </p>
              </div>
              
              <div className="space-y-6">
                <Button 
                  onClick={startGame}
                  className="relative overflow-hidden px-16 py-5 font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white shadow-lg hover:shadow-purple-500/25 hover:shadow-2xl"
                >
                  <span className="relative z-10">Oyunu Başlat ♡</span>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </Button>
                
                <Button 
                  onClick={goBackToFirst}
                  className="px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  ← Geri Dön
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--purple-primary)] via-indigo-800 to-purple-900 font-inter overflow-hidden relative">
      
      {/* Modern floating orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm animate-float"
            style={{
              width: `${80 + Math.random() * 100}px`,
              height: `${80 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      
      <DecorativeHearts />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 rounded-[2.5rem] p-10 md:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] animate-fade-in relative overflow-hidden">
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 animate-pulse"></div>
            
            {!heartPlaced ? (
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[var(--elegant-gray)] mb-6">
                  Kalbimi Yerine Koy
                </h2>
                <p className="font-inter text-lg text-[var(--warm-gray)] mb-8">
                  Kalbi sürükleyerek aşağıdaki kutucuğa yerleştir
                </p>
              </div>
            ) : (
              <div className="text-center mb-8">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[var(--purple-primary)] mb-6">
                  Mükemmel! ♡
                </h2>
                <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] leading-relaxed max-w-3xl mx-auto">
                  Sayende onun ritmini artırıyorsun, onun çalışma hızını etkiliyorsun. 
                  Adrenalin veya asetilkolin... çok daha farklı bir şeysin.
                </p>
              </div>
            )}

            {/* Modern Interactive Game Area */}
            <div className="relative w-full max-w-3xl mx-auto h-96 mb-8">
              
              {/* Elegant Game Container */}
              <div className="relative h-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden">
                
                {/* Animated Background */}
                <div className="absolute inset-0">
                  {/* Floating particles */}
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-40"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
                </div>
                
                {/* Interactive Drop Zone */}
                <div 
                  ref={dropZoneRef}
                  className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-40 h-40 transition-all duration-500 ${
                    isDragging 
                      ? 'border-4 border-pink-400 bg-pink-400/20 scale-110' 
                      : 'border-3 border-purple-400/60 bg-purple-400/10'
                  } border-dashed rounded-full flex flex-col items-center justify-center backdrop-blur-sm`}
                  style={{
                    boxShadow: isDragging 
                      ? '0 0 40px rgba(236, 72, 153, 0.6), inset 0 0 20px rgba(236, 72, 153, 0.2)' 
                      : '0 0 25px rgba(147, 51, 234, 0.4), inset 0 0 15px rgba(147, 51, 234, 0.1)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2 animate-bounce">💜</div>
                    <span className={`font-inter text-sm font-semibold transition-colors duration-300 ${
                      isDragging ? 'text-pink-200' : 'text-purple-200'
                    }`}>
                      Kalbimi Buraya Koy
                    </span>
                  </div>
                  
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 border-2 border-purple-300/40 rounded-full animate-ping"></div>
                  <div className="absolute -inset-4 border-2 border-purple-300/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Optimized Draggable Heart - 60fps Performance */}
                {!heartPlaced && (
                  <div
                    ref={heartRef}
                    className={`absolute transform ${
                      isDragging 
                        ? 'cursor-grabbing scale-125 z-50 rotate-12' 
                        : 'cursor-grab hover:scale-110 hover:-rotate-3 transition-transform duration-200'
                    }`}
                    style={{
                      left: `${heartPosition.x}px`,
                      top: `${heartPosition.y}px`,
                      userSelect: 'none',
                      willChange: 'transform',
                      filter: isDragging 
                        ? 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))' 
                        : 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))',
                    }}
                    onMouseDown={handleMouseDown}
                    draggable={false}
                  >
                    <div className="relative">
                      {/* Heart with modern styling */}
                      <div 
                        className="text-7xl font-bold bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
                        style={{
                          textShadow: isDragging 
                            ? '0 0 30px rgba(236, 72, 153, 0.8)' 
                            : '0 0 15px rgba(147, 51, 234, 0.6)',
                        }}
                      >
                        ♡
                      </div>
                      
                      {/* Optimized sparkles - Reduced for better performance */}
                      {!isDragging && Array.from({ length: 4 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping opacity-60"
                          style={{
                            left: `${30 + Math.sin(i) * 35}px`,
                            top: `${30 + Math.cos(i) * 35}px`,
                            animationDelay: `${i * 0.4}s`,
                            willChange: 'opacity, transform',
                          }}
                        />
                      ))}
                      
                      {/* Optimized magic trail effect */}
                      {isDragging && (
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 animate-pulse"
                          style={{ willChange: 'opacity' }}
                        ></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Successfully Placed Heart */}
                {heartPlaced && (
                  <div
                    className="absolute z-30"
                    style={{
                      left: `${heartPosition.x}px`,
                      top: `${heartPosition.y}px`
                    }}
                  >
                    <div className="relative">
                      {/* Victory heart with celebration */}
                      <div 
                        className="text-7xl font-bold bg-gradient-to-br from-pink-400 via-red-500 to-purple-600 bg-clip-text text-transparent animate-pulse"
                        style={{
                          textShadow: '0 0 40px rgba(236, 72, 153, 1)',
                        }}
                      >
                        ♥
                      </div>
                      
                      {/* Optimized celebration sparkles */}
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full animate-bounce opacity-80"
                          style={{
                            left: `${20 + Math.sin(i * 0.7) * 45}px`,
                            top: `${20 + Math.cos(i * 0.5) * 45}px`,
                            animationDelay: `${i * 0.15}s`,
                            willChange: 'transform',
                          }}
                        />
                      ))}
                      
                      {/* Success glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-40 animate-pulse scale-150"></div>
                    </div>
                  </div>
                )}
                
                {/* Magical floating elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-40"
                      style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + Math.sin(i) * 60}%`,
                        animationDelay: `${i * 0.8}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
                
                {/* Ethereal glow rings */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-purple-300/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-pink-300/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              </div>
            </div>

            {/* Enhanced Error Message - Daha Görünür */}
            {showErrorMessage && (
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 mb-6 p-8 bg-gradient-to-r from-orange-400/90 to-red-500/90 border-4 border-orange-300 rounded-3xl animate-fade-in backdrop-blur-lg shadow-2xl">
                <div className="flex items-center justify-center space-x-4">
                  <div className="text-4xl animate-bounce">💭</div>
                  <p className="font-inter text-white font-bold text-center text-xl drop-shadow-lg">
                    {errorMessage}
                  </p>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl opacity-20 animate-pulse"></div>
                
                {/* Close button */}
                <button 
                  onClick={() => setShowErrorMessage(false)}
                  className="absolute top-2 right-2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white font-bold transition-all duration-200"
                >
                  ×
                </button>
              </div>
            )}

            {/* Success Message - Romantic Text */}
            {showSuccessMessage && (
              <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 p-8 bg-gradient-to-r from-pink-500/95 to-purple-600/95 border-4 border-pink-300 rounded-3xl animate-fade-in backdrop-blur-lg shadow-2xl max-w-lg">
                <div className="text-center space-y-4">
                  <div className="text-5xl animate-bounce">💖</div>
                  <h3 className="font-playfair text-2xl font-bold text-white mb-4">
                    Mükemmel! ♡
                  </h3>
                  <p className="font-inter text-white text-lg leading-relaxed drop-shadow-lg">
                    Sayende onun ritmini artırıyorsun, onun çalışma hızını etkiliyorsun. 
                    Adrenalin veya asetilkolin... çok daha farklı bir şeysin.
                  </p>
                  
                  {/* Heart pulse effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl opacity-20 animate-pulse"></div>
                  
                  {/* Floating hearts around message */}
                  {Array.from({ length: 6 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute text-pink-200 text-lg animate-bounce opacity-70"
                      style={{
                        left: `${-20 + Math.sin(i * 1.2) * 120}px`,
                        top: `${-10 + Math.cos(i * 0.8) * 80}px`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      💕
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="text-center space-y-4">
              {heartPlaced ? (
                <div className="space-y-4">
                  <Button 
                    onClick={() => setLocation("/third-page")}
                    className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    Diğer Sayfaya Geç ♡
                  </Button>
                  <Button 
                    onClick={goBackToFirst}
                    className="px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    ← Geri Dön
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setGameStarted(false)}
                  className="px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  ← Geri Dön
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
