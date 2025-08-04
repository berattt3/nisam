import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DecorativeHearts from "@/components/decorative-hearts";

export default function FourthPage() {
  const [, setLocation] = useLocation();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [showSelectedMessage, setShowSelectedMessage] = useState(false);

  const messages = [
    "Seni çok seviyorum, benimle olmanı ve benim olmanı istiyorum.",
    "Resimlerine her baktığımda ayrı bir güzelleşiyorsun çok farklı bir auran var.",
    "Güzel gözlerine bakarak ellerini tutmak, öpmek istiyorum.",
    "Yüzünü sevip okşamak, sana sarılıp koklamak, o güzel kokunu çekmek istiyorum Nisa'm.",
    "Seni artık benim yapmam gerek güzel kızım, seni artık bana ait yapmam gerek."
  ];

  const goBackToThird = () => {
    setLocation("/third-page");
  };

  const goBackToFirst = () => {
    setLocation("/");
  };

  const openEnvelope = () => {
    setEnvelopeOpen(true);
  };

  const selectMessage = (index: number) => {
    setSelectedMessage(index);
    setShowSelectedMessage(true);
  };

  const resetEnvelope = () => {
    setEnvelopeOpen(false);
    setSelectedMessage(null);
    setShowSelectedMessage(false);
  };

  return (
    <div className="min-h-screen gradient-bg font-inter">
      <DecorativeHearts />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          <div className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--elegant-gray)] mb-8">
              ♡
            </h1>
            
            <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-10 rounded-full opacity-70"></div>
            
            {!envelopeOpen ? (
              <div className="mb-12">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[var(--purple-primary)] mb-6">
                  Sana Özel Mektup ♡
                </h2>
                <p className="font-inter text-lg text-[var(--warm-gray)] mb-12">
                  Kalp puluna tıklayarak mektubu aç ve içindeki mesajları keşfet
                </p>
                
                {/* Sealed Envelope */}
                <div className="relative inline-block mb-8">
                  <div className="w-80 h-52 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-lg border-2 border-gray-200 relative overflow-hidden">
                    {/* Envelope body */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100"></div>
                    
                    {/* Envelope flap */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-purple-200 to-purple-300 transform origin-top"></div>
                    
                    {/* Heart stamp - clickable */}
                    <div 
                      className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-[var(--purple-primary)] to-[var(--purple-accent)] rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-lg animate-pulse-soft"
                      onClick={openEnvelope}
                    >
                      <span className="text-2xl text-white">♡</span>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute bottom-6 left-6 text-[var(--purple-primary)] opacity-60">
                      <span className="font-playfair text-lg italic">Sevgili Nisa'm...</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : !showSelectedMessage ? (
              <div className="mb-12">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[var(--purple-primary)] mb-6">
                  Mesajları Keşfet ♡
                </h2>
                <p className="font-inter text-lg text-[var(--warm-gray)] mb-8">
                  Hangi mesajı okumak istiyorsun? Üzerine tıkla
                </p>
                
                {/* Opened envelope with visible messages */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className="relative group p-6 bg-gradient-to-br from-slate-800 via-purple-900 to-indigo-900 rounded-2xl shadow-2xl border-2 border-purple-500/40 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 animate-fade-in"
                      onClick={() => selectMessage(index)}
                      style={{
                        animationDelay: `${index * 0.2}s`,
                        boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {/* Envelope design */}
                      <div className="absolute top-2 right-2 text-yellow-400 text-sm opacity-60">📮</div>
                      <div className="absolute top-2 left-2 text-red-400 text-xs opacity-40">💌 #{index + 1}</div>
                      
                      {/* Message preview - blurred until hover */}
                      <div className="relative">
                        <p className="font-inter text-sm md:text-base text-purple-100 leading-relaxed group-hover:text-white transition-all duration-500 filter blur-md group-hover:blur-none">
                          {message}
                        </p>
                        
                        {/* Blur overlay - disappears on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-800/40 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
                      </div>
                      
                      {/* Interactive elements */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-purple-300 font-medium">Sevgi Mektubu</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-purple-300 group-hover:text-pink-300 transition-colors duration-300">
                          <span className="text-xs font-medium">Oku</span>
                          <div className="text-lg">💖</div>
                        </div>
                      </div>
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                      
                      {/* Floating hearts on hover */}
                      <div className="absolute -inset-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 text-pink-300 animate-bounce"
                            style={{
                              left: `${20 + i * 60}%`,
                              top: `${10 + (i % 2) * 80}%`,
                              animationDelay: `${i * 0.2}s`,
                            }}
                          >
                            💕
                          </div>
                        ))}
                      </div>
                      
                      {/* Corner decoration */}
                      <div className="absolute bottom-2 right-2 text-purple-400/60 text-xs">✨</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[var(--purple-primary)] mb-8">
                  Seçtiğin Mesaj ♡
                </h2>
                
                {/* Selected message - enlarged and clear */}
                <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-2xl border-2 border-[var(--purple-accent)]/30 animate-fade-in transform scale-105">
                  <div className="text-4xl heart-decoration mb-6 animate-pulse-soft">♡</div>
                  <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] leading-relaxed font-medium">
                    {selectedMessage !== null ? messages[selectedMessage] : ""}
                  </p>
                  <div className="mt-6 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-[var(--purple-accent)] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[var(--purple-primary)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[var(--purple-accent)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <Button 
                    onClick={() => setLocation("/fifth-page")}
                    className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    5. Sayfaya Git ♡
                  </Button>
                  
                  <Button 
                    onClick={resetEnvelope}
                    className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Başka Mesaj Oku
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setLocation("/fifth-page")}
                className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                Diğer Sayfaya Git ♡
              </Button>
              
              <Button 
                onClick={goBackToThird}
                className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                ← Üçüncü Sayfaya Dön
              </Button>
              
              <Button 
                onClick={goBackToFirst}
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
              Dördüncü sayfa - Mektup okuma oyunu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}