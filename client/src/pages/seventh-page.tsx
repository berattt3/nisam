import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function SeventhPage() {
  const [, setLocation] = useLocation();
  const [showInitialQuestion, setShowInitialQuestion] = useState(true);
  const [showSadMessage, setShowSadMessage] = useState(false);
  const [startCinematic, setStartCinematic] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [showFinalQuestion, setShowFinalQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [showExplosion, setShowExplosion] = useState(false);
  const [firstNoButtonVisible, setFirstNoButtonVisible] = useState(true);
  const [firstShowExplosion, setFirstShowExplosion] = useState(false);
  const [firstHoverCount, setFirstHoverCount] = useState(0);
  const [firstNoButtonPosition, setFirstNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinalStory, setShowFinalStory] = useState(false);
  const [storyFadeIn, setStoryFadeIn] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const firstNoButtonRef = useRef<HTMLButtonElement>(null);

  // Film sahnesi metinleri
  const cinematicTexts = [
    "Güzel kızım,",
    "seni çok seviyorum.",
    "Artık söylemenin vakti geldi,",
    "evet sen de beni uzun zamandır bekliyorsun farkındayım,",
    "fakat ben de istemezdim.",
    "Seni daha fazla bekletmemin bir lüzmu yok.",
    "Artık bir isim koymanın vakti geldi,",
    "o güzel gözlerine,",
    "yüzüne bakmaya doyamayışımı",
    "artık bir isim koyarak",
    "söylemenin vakti geldi."
  ];

  // Final hikaye metinleri
  const finalStoryTexts = [
    "Nisa evet dedi,",
    "Berat güzel kızına kavuştu.",
    "Bir isim konuldu,",
    "nisa beratın olundu.",
    "Bu mutlu son burda biter mi,",
    "her şeyim benim olur geçer mi,",
    "tatlı nisam beni bi öpse,",
    "dudaklarıma şeker bi sürse,",
    "ah ne güzel olurdu,",
    "nisam bebeğim olurdu.",
    "baktık bir isim yok,",
    "buldum bi isim güzel çok.",
    "Nisa çok güzeldi,",
    "benim oldu çok hoşuma giderdi."
  ];

  const handleNoClick = () => {
    setShowInitialQuestion(false);
    setShowSadMessage(true);
    setTimeout(() => {
      setLocation("/");
    }, 3000);
  };

  // İlk Hayır butonunun hafif hareket etmesi ve 3. hover'da imha olması
  const handleFirstNoButtonHover = () => {
    if (!firstNoButtonRef.current) return;
    
    setFirstHoverCount(prev => {
      const newCount = prev + 1;
      
      if (newCount < 3) {
        // 1. ve 2. hover'da sadece hafif hareket
        const currentRect = firstNoButtonRef.current?.getBoundingClientRect();
        if (currentRect) {
          const moveDistance = 50 + (newCount * 30); // Her hover'da biraz daha uzağa
          const randomDirection = Math.random() * 2 * Math.PI;
          const newX = Math.max(100, Math.min(window.innerWidth - 200, 
            currentRect.left + Math.cos(randomDirection) * moveDistance));
          const newY = Math.max(100, Math.min(window.innerHeight - 200, 
            currentRect.top + Math.sin(randomDirection) * moveDistance));
          
          setFirstNoButtonPosition({ x: newX, y: newY });
        }
      } else {
        // 3. hover'da imha et
        setTimeout(() => {
          setFirstShowExplosion(true);
          setFirstNoButtonVisible(false);
          setTimeout(() => setFirstShowExplosion(false), 1500);
        }, 300);
      }
      
      return newCount;
    });
  };

  const handleYesClick = () => {
    setShowInitialQuestion(false);
    setStartCinematic(true);
    setTimeout(() => setFadeIn(true), 1000);
  };

  // Sinematik metin animasyonu
  useEffect(() => {
    if (startCinematic && fadeIn) {
      const timer = setInterval(() => {
        setCurrentTextIndex(prev => {
          if (prev < cinematicTexts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setShowFinalQuestion(true);
            }, 3000);
            return prev;
          }
        });
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [startCinematic, fadeIn, cinematicTexts.length]);

  // Hayır butonunun agresif kaçması
  const handleNoButtonHover = () => {
    if (!noButtonRef.current) return;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Her kaçışta daha uzağa gitmesi için faktör
    const escapeDistance = 200 + Math.random() * 300;
    
    // Rastgele yeni pozisyon - daha agresif
    const newX = Math.random() * (windowWidth - 200);
    const newY = Math.random() * (windowHeight - 200);
    
    setNoButtonPosition({ x: newX, y: newY });
    
    // 3. kaçıştan sonra butonu kaybet
    setTimeout(() => {
      if (Math.random() > 0.4) { // %60 ihtimal ile kaybolsun
        setShowExplosion(true);
        setNoButtonVisible(false);
        setTimeout(() => setShowExplosion(false), 1500);
      }
    }, 100);
  };

  const handleFinalYes = () => {
    setShowConfetti(true);
    // 3 saniye sonra final hikayeyi başlat
    setTimeout(() => {
      setShowFinalStory(true);
      setTimeout(() => setStoryFadeIn(true), 1000);
    }, 3000);
  };

  // Final hikaye animasyonu
  useEffect(() => {
    if (showFinalStory && storyFadeIn) {
      const timer = setInterval(() => {
        setCurrentStoryIndex(prev => {
          if (prev < finalStoryTexts.length - 1) {
            return prev + 1;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setLocation("/");
            }, 5000);
            return prev;
          }
        });
      }, 2500);

      return () => clearInterval(timer);
    }
  }, [showFinalStory, storyFadeIn, finalStoryTexts.length, setLocation]);

  // Konfetti efekti
  const generateConfetti = () => {
    const confettiItems = ['🎉', '♡', '💖', '✨', '🌟', '💕', '🎊', '❤️'];
    return Array.from({ length: 100 }, (_, i) => (
      <div
        key={i}
        className="absolute pointer-events-none"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${16 + Math.random() * 24}px`,
          animation: `confettiFall ${3 + Math.random() * 4}s ease-out ${Math.random() * 2}s infinite, confettiSpin ${2 + Math.random() * 3}s linear infinite`,
        }}
      >
        {confettiItems[Math.floor(Math.random() * confettiItems.length)]}
      </div>
    ));
  };

  // Floating hearts efekti
  const generateFloatingHearts = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <div
        key={`heart-${i}`}
        className="absolute pointer-events-none text-pink-300"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${20 + Math.random() * 30}px`,
          animation: `heartFloat ${4 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite, heartPulse ${1 + Math.random()}s ease-in-out infinite`,
          opacity: 0.7 + Math.random() * 0.3,
        }}
      >
        💖
      </div>
    ));
  };

  if (showSadMessage) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="text-6xl mb-6">😢</div>
          <h1 className="text-3xl font-bold text-white mb-4">:(</h1>
          <p className="text-xl text-gray-300">Sayfa kapanıyor...</p>
        </div>
      </div>
    );
  }

  // Final hikaye sahnesi
  if (showFinalStory) {
    return (
      <div className={`min-h-screen bg-black flex items-center justify-center transition-all duration-2000 ${storyFadeIn ? 'bg-gradient-to-br from-indigo-900/30 via-black to-purple-900/30' : ''}`}>
        {/* Romantik yıldızlar arka plan */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-pulse opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="text-center max-w-6xl px-8 relative z-10">
          <div className="space-y-16">
            {finalStoryTexts.slice(0, currentStoryIndex + 1).map((text, index) => (
              <div
                key={index}
                className="relative"
                style={{
                  animation: `finalStoryGlow 1.5s ease-out ${index * 0.4}s forwards`,
                  opacity: 0,
                }}
              >
                <p
                  className={`font-playfair text-white leading-relaxed transition-all duration-1000 ${
                    index === currentStoryIndex 
                      ? 'text-3xl md:text-4xl lg:text-5xl opacity-100' 
                      : 'text-2xl md:text-3xl opacity-75'
                  }`}
                  style={{
                    textShadow: index === currentStoryIndex 
                      ? '0 0 25px rgba(255, 255, 255, 0.9), 0 0 50px rgba(138, 43, 226, 0.7), 0 0 75px rgba(255, 20, 147, 0.5)' 
                      : '0 0 15px rgba(255, 255, 255, 0.4)',
                    letterSpacing: '0.08em',
                    lineHeight: '1.6',
                  }}
                >
                  {text}
                </p>
                
                {/* Romantik kalp efekti aktif metin için */}
                {index === currentStoryIndex && (
                  <div className="absolute -inset-6 pointer-events-none">
                    {Array.from({ length: 8 }, (_, heartIndex) => (
                      <div
                        key={heartIndex}
                        className="absolute text-pink-300 animate-ping opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${heartIndex * 0.3}s`,
                          fontSize: '16px',
                        }}
                      >
                        💕
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Typing cursor efekti */}
                {index === currentStoryIndex && (
                  <span className="inline-block w-0.5 h-10 bg-pink-300 ml-3 animate-pulse" />
                )}
              </div>
            ))}
          </div>
          
          {/* Final mesaj tamamlandığında gösterilecek */}
          {currentStoryIndex >= finalStoryTexts.length - 1 && (
            <div 
              className="mt-16"
              style={{
                animation: 'finalEndGlow 2s ease-out 2s forwards',
                opacity: 0,
              }}
            >
              <div className="text-6xl mb-6">💖👑💖</div>
              <p 
                className="text-2xl md:text-3xl font-playfair text-pink-200"
                style={{
                  textShadow: '0 0 30px rgba(255, 182, 193, 0.8)',
                }}
              >
                ~ SON ~
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (startCinematic) {
    return (
      <div className={`min-h-screen bg-black flex items-center justify-center transition-all duration-2000 ${fadeIn ? 'bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30' : ''}`}>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {/* Main confetti layer */}
            <div className="absolute inset-0">
              {generateConfetti()}
            </div>
            
            {/* Floating hearts layer */}
            <div className="absolute inset-0">
              {generateFloatingHearts()}
            </div>
            
            {/* Explosion burst effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={`burst-${i}`}
                    className="absolute"
                    style={{
                      width: '4px',
                      height: '40px',
                      background: `linear-gradient(to top, #ff1493, #ff69b4, #ffc0cb)`,
                      transform: `rotate(${i * 18}deg)`,
                      transformOrigin: '50% 100%',
                      animation: `burstExplosion 1.5s ease-out ${Math.random() * 0.5}s forwards`,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Rainbow explosion rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={`ring-${i}`}
                  className="absolute border-4 rounded-full"
                  style={{
                    borderColor: ['#ff1493', '#ff69b4', '#ffc0cb', '#ffb6c1', '#ffe4e1'][i],
                    animation: `ringExpansion 2s ease-out ${i * 0.2}s forwards`,
                    opacity: 0,
                  }}
                />
              ))}
            </div>
            
            {/* Background glow pulse */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-red-500/30 animate-pulse" />
          </div>
        )}
        
        {/* Twinkling stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="text-center max-w-5xl px-8 relative z-10">
          {!showFinalQuestion ? (
            <div className="space-y-12">
              {cinematicTexts.slice(0, currentTextIndex + 1).map((text, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{
                    animation: `textGlow 1s ease-out ${index * 0.3}s forwards, slideInFromBottom 1.2s ease-out ${index * 0.3}s forwards`,
                    opacity: 0,
                  }}
                >
                  <p
                    className={`font-playfair text-white leading-relaxed transition-all duration-1000 ${
                      index === currentTextIndex 
                        ? 'text-3xl md:text-4xl lg:text-5xl opacity-100 text-shadow-glow' 
                        : 'text-2xl md:text-3xl opacity-80'
                    }`}
                    style={{
                      textShadow: index === currentTextIndex 
                        ? '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(147, 51, 234, 0.6)' 
                        : '0 0 10px rgba(255, 255, 255, 0.3)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {text}
                  </p>
                  
                  {/* Typing cursor effect for current text */}
                  {index === currentTextIndex && (
                    <span className="inline-block w-0.5 h-8 bg-white ml-2 animate-pulse" />
                  )}
                  
                  {/* Sparkle effect for current text */}
                  {index === currentTextIndex && (
                    <div className="absolute -inset-4 pointer-events-none">
                      {Array.from({ length: 5 }, (_, sparkleIndex) => (
                        <div
                          key={sparkleIndex}
                          className="absolute text-yellow-200 animate-ping"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${sparkleIndex * 0.2}s`,
                            fontSize: '12px',
                          }}
                        >
                          ✨
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="relative"
              style={{
                animation: 'finalQuestionEntrance 2s ease-out forwards',
                opacity: 0,
              }}
            >
              {/* Romantic background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-red-500/20 rounded-full filter blur-3xl animate-pulse" />
              
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white mb-16 relative z-10"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.9), 0 0 60px rgba(147, 51, 234, 0.8), 0 0 90px rgba(236, 72, 153, 0.6)',
                  letterSpacing: '0.1em',
                  animation: 'heartbeat 2s ease-in-out infinite',
                }}
              >
                Nisa'm, Benim olur musun?
              </h1>
              
              <div className="flex justify-center space-x-8 relative">
                <Button
                  onClick={handleFinalYes}
                  className="px-16 py-6 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-inter font-bold text-2xl rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl animate-pulse-soft"
                >
                  Evet ♡
                </Button>
                
                {noButtonVisible && (
                  <Button
                    ref={noButtonRef}
                    onMouseEnter={handleNoButtonHover}
                    onFocus={handleNoButtonHover}
                    onMouseMove={handleNoButtonHover}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNoButtonHover();
                      return false;
                    }}
                    className="px-16 py-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-red-600 hover:to-red-700 text-white font-inter font-bold text-2xl rounded-full transition-all duration-200 fixed z-50 cursor-not-allowed animate-bounce"
                    style={{
                      left: `${noButtonPosition.x}px`,
                      top: `${noButtonPosition.y}px`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    }}
                  >
                    Hayır 😈
                  </Button>
                )}
                
                {showExplosion && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl animate-ping">💥</div>
                  </div>
                )}
              </div>
              
              {showConfetti && (
                <div className="mt-8 space-y-6 relative z-10">
                  <div 
                    className="text-8xl"
                    style={{
                      animation: 'celebrationBounce 1s ease-out infinite alternate, celebrationGlow 2s ease-in-out infinite',
                    }}
                  >
                    💖✨💖
                  </div>
                  <p 
                    className="text-3xl md:text-4xl text-white font-playfair"
                    style={{
                      textShadow: '0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(255, 192, 203, 0.8)',
                      animation: 'celebrationText 1.5s ease-in-out infinite alternate',
                    }}
                  >
                    Seni çok seviyorum Nisa! ♡
                  </p>
                  
                  {/* Additional celebration elements */}
                  <div className="flex justify-center space-x-4 mt-6">
                    {['💕', '🌹', '💍', '👑', '💐'].map((emoji, index) => (
                      <div
                        key={index}
                        className="text-4xl"
                        style={{
                          animation: `celebrationIcons 2s ease-in-out ${index * 0.2}s infinite`,
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg font-inter">
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl">
          <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--elegant-gray)] mb-8">
              Son Sayfa
            </h1>
            
            <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-10 rounded-full opacity-70"></div>
            
            {showInitialQuestion && (
              <div className="mb-12">
                <div className="text-6xl heart-decoration mb-8 animate-pulse-soft">♡</div>
                
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[var(--purple-primary)] mb-8">
                  Bu sayfayı görmek için heyecanlı mısın?
                </h2>
                
                <div className="flex flex-col md:flex-row gap-6 justify-center relative">
                  <Button
                    onClick={handleYesClick}
                    className="px-16 py-6 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-bold text-xl rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    Evet ♡
                  </Button>
                  
                  {firstNoButtonVisible && firstHoverCount === 0 && (
                    <Button
                      ref={firstNoButtonRef}
                      onMouseEnter={handleFirstNoButtonHover}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFirstNoButtonHover();
                        return false;
                      }}
                      className="px-16 py-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-red-600 hover:to-red-700 text-white font-inter font-bold text-xl rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                    >
                      Hayır
                    </Button>
                  )}
                  
                  {firstNoButtonVisible && firstHoverCount > 0 && (
                    <Button
                      ref={firstNoButtonRef}
                      onMouseEnter={handleFirstNoButtonHover}
                      onFocus={handleFirstNoButtonHover}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFirstNoButtonHover();
                        return false;
                      }}
                      className={`px-16 py-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-red-600 hover:to-red-700 text-white font-inter font-bold text-xl rounded-full transition-all duration-500 fixed z-40 cursor-not-allowed ${
                        firstHoverCount >= 2 ? 'animate-pulse' : 'animate-bounce'
                      }`}
                      style={{
                        left: `${firstNoButtonPosition.x}px`,
                        top: `${firstNoButtonPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        transition: 'all 0.5s ease-out',
                      }}
                    >
                      Hayır {firstHoverCount >= 1 ? '😠' : ''} {firstHoverCount >= 2 ? '💀' : ''}
                    </Button>
                  )}
                  
                  {firstShowExplosion && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-6xl animate-ping">💥💀💥</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Geri dönüş butonları */}
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 border-t border-[var(--purple-accent)]/20">
              <Button 
                onClick={() => setLocation("/sixth-page")}
                className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                ← Altıncı Sayfaya Dön
              </Button>
              
              <Button 
                onClick={() => setLocation("/")}
                className="px-12 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                ← Ana Sayfaya Dön
              </Button>
            </div>
          </div>
          
          {/* Footer Note */}
          <div className="text-center mt-8">
            <div className="text-xl heart-decoration mb-2 animate-float opacity-60">♡</div>
            <p className="font-inter text-sm text-white opacity-75">
              Güzel kızım için son sayfa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}