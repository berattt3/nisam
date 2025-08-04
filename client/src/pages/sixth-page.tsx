import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import DecorativeHearts from "@/components/decorative-hearts";

interface Position {
  x: number;
  y: number;
}

interface Monster {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
  patrolPath: Position[];
  currentPathIndex: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'platform' | 'spike' | 'wall';
}

export default function SixthPage() {
  const [, setLocation] = useLocation();
  const [playerPosition, setPlayerPosition] = useState<Position>({ x: 40, y: 40 });
  const [heartPosition] = useState<Position>({ x: 560, y: 400 });
  const [gameWon, setGameWon] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [secondGameStarted, setSecondGameStarted] = useState(false);
  const [princessPos, setPrincessPos] = useState<Position>({ x: 50, y: 350 });
  const [princePos] = useState<Position>({ x: 620, y: 180 });
  const [secondGameWon, setSecondGameWon] = useState(false);
  const [lostLifeMessage, setLostLifeMessage] = useState("");
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const monstersRef = useRef<Monster[]>([]);

  // Kompleks labirent duvarları - iki farklı yol ile kalbe ulaşma
  const mazeWalls = [
    // Dış duvarlar
    { x: 0, y: 0, width: 640, height: 20 },
    { x: 0, y: 0, width: 20, height: 480 },
    { x: 620, y: 0, width: 20, height: 480 },
    { x: 0, y: 460, width: 640, height: 20 },
    
    // Ana labirent duvarları - sol yol
    { x: 80, y: 20, width: 20, height: 120 },
    { x: 140, y: 80, width: 20, height: 160 },
    { x: 80, y: 200, width: 80, height: 20 },
    { x: 60, y: 260, width: 100, height: 20 },
    { x: 200, y: 140, width: 20, height: 80 },
    { x: 240, y: 60, width: 80, height: 20 },
    { x: 280, y: 120, width: 20, height: 120 },
    { x: 180, y: 300, width: 120, height: 20 },
    
    // Ana labirent duvarları - sağ yol
    { x: 400, y: 20, width: 20, height: 100 },
    { x: 460, y: 80, width: 20, height: 140 },
    { x: 520, y: 40, width: 80, height: 20 },
    { x: 380, y: 180, width: 120, height: 20 },
    { x: 540, y: 160, width: 20, height: 120 },
    { x: 420, y: 260, width: 100, height: 20 },
    { x: 480, y: 320, width: 20, height: 80 },
    
    // Orta bölüm karmaşık duvarlar
    { x: 240, y: 240, width: 160, height: 20 },
    { x: 320, y: 180, width: 20, height: 80 },
    { x: 360, y: 120, width: 20, height: 100 },
    { x: 280, y: 300, width: 80, height: 20 },
    { x: 340, y: 340, width: 20, height: 60 },
    
    // Kalp etrafındaki azaltılmış koruma duvarları
    { x: 520, y: 380, width: 20, height: 20 },
    { x: 580, y: 380, width: 20, height: 20 },
  ];

  // 2D Platform oyunu engelleri
  const platformObstacles: Obstacle[] = [
    // Ana platformlar
    { x: 0, y: 380, width: 180, height: 35, type: 'platform' },
    { x: 220, y: 340, width: 140, height: 25, type: 'platform' },
    { x: 380, y: 300, width: 120, height: 25, type: 'platform' },
    { x: 520, y: 260, width: 140, height: 25, type: 'platform' },
    { x: 580, y: 200, width: 140, height: 25, type: 'platform' },
    
    // Orta platformlar
    { x: 100, y: 320, width: 100, height: 20, type: 'platform' },
    { x: 280, y: 280, width: 80, height: 20, type: 'platform' },
    { x: 440, y: 240, width: 70, height: 20, type: 'platform' },
    
    // Duvarlar
    { x: 180, y: 280, width: 25, height: 120, type: 'wall' },
    { x: 360, y: 240, width: 25, height: 100, type: 'wall' },
    { x: 500, y: 200, width: 25, height: 80, type: 'wall' },
    
    // Tehlikeli dikenler
    { x: 240, y: 330, width: 35, height: 12, type: 'spike' },
    { x: 400, y: 290, width: 30, height: 12, type: 'spike' },
    { x: 460, y: 230, width: 30, height: 12, type: 'spike' },
  ];

  // Canavarların devriye rotaları
  const initialMonsters: Monster[] = [
    {
      x: 120,
      y: 160,
      direction: 'right',
      patrolPath: [
        { x: 120, y: 160 },
        { x: 200, y: 160 },
        { x: 200, y: 240 },
        { x: 120, y: 240 }
      ],
      currentPathIndex: 0
    },
    {
      x: 440,
      y: 120,
      direction: 'down',
      patrolPath: [
        { x: 440, y: 120 },
        { x: 440, y: 200 },
        { x: 500, y: 200 },
        { x: 500, y: 120 }
      ],
      currentPathIndex: 0
    },
    {
      x: 300,
      y: 280,
      direction: 'left',
      patrolPath: [
        { x: 300, y: 280 },
        { x: 380, y: 280 },
        { x: 380, y: 320 },
        { x: 300, y: 320 }
      ],
      currentPathIndex: 0
    }
  ];

  // Labirent oyunu hareket kontrolleri
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (gameWon || !gameStarted) return;

    const moveSpeed = 15;
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          newY = Math.max(25, prev.y - moveSpeed);
          break;
        case 's':
        case 'arrowdown':
          newY = Math.min(435, prev.y + moveSpeed);
          break;
        case 'a':
        case 'arrowleft':
          newX = Math.max(25, prev.x - moveSpeed);
          break;
        case 'd':
        case 'arrowright':
          newX = Math.min(595, prev.x + moveSpeed);
          break;
        default:
          return prev;
      }

      // Duvar collision kontrolü
      const playerSize = { width: 20, height: 20 };
      for (const wall of mazeWalls) {
        if (
          newX < wall.x + wall.width &&
          newX + playerSize.width > wall.x &&
          newY < wall.y + wall.height &&
          newY + playerSize.height > wall.y
        ) {
          return prev; // Duvara çarparsa hareket etme
        }
      }

      return { x: newX, y: newY };
    });
  }, [gameWon, gameStarted]);

  // 2D Platform oyunu hareket kontrolleri
  const handlePlatformKeyPress = useCallback((event: KeyboardEvent) => {
    if (secondGameWon || !secondGameStarted) return;

    const moveSpeed = 12;
    const jumpPower = 25;
    
    setPrincessPos(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          newY = Math.max(50, prev.y - jumpPower);
          break;
        case 's':
        case 'arrowdown':
          newY = Math.min(370, prev.y + moveSpeed);
          break;
        case 'a':
        case 'arrowleft':
          newX = Math.max(10, prev.x - moveSpeed);
          break;
        case 'd':
        case 'arrowright':
          newX = Math.min(650, prev.x + moveSpeed);
          break;
        default:
          return prev;
      }

      // Platform collision kontrolü
      const playerSize = { width: 28, height: 40 };
      for (const obstacle of platformObstacles) {
        if (
          newX < obstacle.x + obstacle.width &&
          newX + playerSize.width > obstacle.x &&
          newY < obstacle.y + obstacle.height &&
          newY + playerSize.height > obstacle.y
        ) {
          if (obstacle.type === 'spike') {
            return { x: 50, y: 350 }; // Başlangıca dön
          } else {
            if (Math.abs(newX - prev.x) > Math.abs(newY - prev.y)) {
              newX = prev.x;
            } else {
              newY = prev.y;
            }
          }
        }
      }

      return { x: newX, y: newY };
    });
  }, [secondGameWon, secondGameStarted]);

  // Klavye dinleyicisi
  useEffect(() => {
    if (secondGameStarted) {
      window.addEventListener('keydown', handlePlatformKeyPress);
      return () => window.removeEventListener('keydown', handlePlatformKeyPress);
    } else {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [handleKeyPress, handlePlatformKeyPress, secondGameStarted]);

  // Canavarları hareket ettir - optimized
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const moveMonsters = () => {
      setMonsters(prevMonsters => {
        return prevMonsters.map(monster => {
          const targetPos = monster.patrolPath[monster.currentPathIndex];
          const deltaX = targetPos.x - monster.x;
          const deltaY = targetPos.y - monster.y;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

          if (distance < 5) {
            // Sonraki hedefe geç
            const nextIndex = (monster.currentPathIndex + 1) % monster.patrolPath.length;
            return { ...monster, currentPathIndex: nextIndex };
          }

          // Hedefe doğru hareket et - optimized speed
          const speed = 1.2;
          const moveX = (deltaX / distance) * speed;
          const moveY = (deltaY / distance) * speed;

          return {
            ...monster,
            x: monster.x + moveX,
            y: monster.y + moveY
          };
        });
      });
    };

    const interval = setInterval(moveMonsters, 60); // Slightly slower for better performance
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  // Canavar collision kontrolü - optimized
  useEffect(() => {
    if (!gameStarted || gameWon) return;

    const checkCollision = () => {
      for (const monster of monsters) {
        const distance = Math.sqrt(
          (playerPosition.x - monster.x) ** 2 + 
          (playerPosition.y - monster.y) ** 2
        );
        
        if (distance < 25) {
          setLives(prev => {
            const newLives = prev - 1;
            if (newLives <= 0) {
              // Oyun bitti
              setGameStarted(false);
              setPlayerPosition({ x: 40, y: 40 });
              setLives(3);
              setLostLifeMessage("Oyun bitti! Tekrar dene.");
            } else {
              setLostLifeMessage("Yoksa engellere boyun mu eğeceksin?");
              setPlayerPosition({ x: 40, y: 40 }); // Başlangıca dön
            }
            setTimeout(() => setLostLifeMessage(""), 2000);
            return newLives <= 0 ? 3 : newLives;
          });
          break;
        }
      }
    };

    const timeoutId = setTimeout(checkCollision, 100); // Throttle to 100ms
    return () => clearTimeout(timeoutId);
  }, [playerPosition.x, playerPosition.y, gameStarted, gameWon]);

  // Kalbe ulaşma kontrolü (labirent oyunu)
  useEffect(() => {
    if (!gameStarted || gameWon) return;
    
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - heartPosition.x, 2) + 
      Math.pow(playerPosition.y - heartPosition.y, 2)
    );
    
    if (distance < 30) {
      setGameWon(true);
      setTimeout(() => setShowMessage(true), 500);
    }
  }, [playerPosition.x, playerPosition.y, gameStarted, gameWon]);

  // Prense ulaşma kontrolü (platform oyunu)
  useEffect(() => {
    if (!secondGameStarted || secondGameWon) return;
    
    const distance = Math.sqrt(
      Math.pow(princessPos.x - princePos.x, 2) + 
      Math.pow(princessPos.y - princePos.y, 2)
    );
    
    if (distance < 45) {
      setSecondGameWon(true);
    }
  }, [princessPos.x, princessPos.y, princePos.x, princePos.y, secondGameStarted]);

  // Oyunu başlat
  const startGame = () => {
    const newMonsters = [...initialMonsters];
    setGameStarted(true);
    setMonsters(newMonsters);
    monstersRef.current = newMonsters;
    setPlayerPosition({ x: 40, y: 40 });
    setLives(3);
    setGameWon(false);
    setShowMessage(false);
    setLostLifeMessage("");
  };

  const bringHeart = () => {
    setSecondGameStarted(true);
    setPrincessPos({ x: 50, y: 350 });
  };

  return (
    <div className="min-h-screen gradient-bg font-inter">
      <DecorativeHearts />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl">
          <div className="glass-effect rounded-3xl shadow-2xl p-8 text-center animate-fade-in">
            
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[var(--elegant-gray)] mb-6">
              ♡
            </h1>
            
            <div className="w-32 h-0.5 bg-gradient-to-r from-[var(--purple-primary)] via-[var(--purple-accent)] to-[var(--purple-primary)] mx-auto mb-8 rounded-full opacity-70"></div>
            
            {!gameStarted && !secondGameStarted && (
              <div className="mb-8">
                <h2 className="font-playfair text-3xl font-bold text-[var(--purple-primary)] mb-6">
                  Labirentin sonundan kalbimi bul ve bana getir. ♡
                </h2>
                
                <div className="mb-8 max-w-3xl mx-auto">
                  <p className="font-inter text-lg text-[var(--warm-gray)] mb-6">
                    Prensesim Berat'ının kalbine ulaşmaya çalışıyor.  labirentte canavarlar var!
                  </p>
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-300/20 mb-6">
                    <p className="font-inter text-purple-600 font-medium mb-2">
                      🎮 <span className="font-bold">WASD</span> veya <span className="font-bold">Ok tuşları</span> - Hareket
                    </p>
                    <p className="font-inter text-red-600 font-medium mb-2">
                      👹 Canavarlardan kaçmayı unutma yavrum. <span className="font-bold">3 canınız var</span>
                    </p>
                    <p className="font-inter text-pink-600 font-medium">
                      ❤️ Kalbimi bana getir aşkım ! <span className="font-bold"></span> 
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300"
                >
                  Oyunu Başlat ♡
                </Button>
              </div>
            )}

            {gameStarted && !secondGameStarted && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-left">
                    <p className="text-purple-600 font-bold">Canlar: {"❤️".repeat(lives)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-pink-600 font-bold">Hedef: Kalbe ulaş! ♡</p>
                  </div>
                </div>

                {lostLifeMessage && (
                  <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 font-bold">
                    {lostLifeMessage}
                  </div>
                )}
                
                {/* Labirent Oyun Alanı */}
                <div className="relative mx-auto border-4 border-gray-800 rounded-2xl bg-gradient-to-b from-emerald-100 to-emerald-200 overflow-hidden" 
                     style={{ width: '640px', height: '480px', maxWidth: '95vw' }}
                     tabIndex={0}>
                  
                  {/* Labirent duvarları */}
                  {mazeWalls.map((wall, index) => (
                    <div
                      key={`wall-${index}`}
                      className="absolute bg-gradient-to-b from-stone-600 to-stone-800 border border-stone-900"
                      style={{
                        left: `${wall.x}px`,
                        top: `${wall.y}px`,
                        width: `${wall.width}px`,
                        height: `${wall.height}px`,
                      }}
                    />
                  ))}
                  
                  {/* Prenses karakter */}
                  <div
                    className="absolute transition-all duration-100 ease-out z-20"
                    style={{
                      left: `${playerPosition.x}px`,
                      top: `${playerPosition.y}px`,
                      width: '20px',
                      height: '20px',
                    }}
                  >
                    <div className="text-2xl">👸</div>
                  </div>
                  
                  {/* Canavarlar */}
                  {monsters.map((monster, index) => (
                    <div
                      key={`monster-${index}`}
                      className="absolute transition-all duration-100 ease-out z-10"
                      style={{
                        left: `${monster.x}px`,
                        top: `${monster.y}px`,
                        width: '20px',
                        height: '20px',
                      }}
                    >
                      <div className="text-2xl animate-pulse">👹</div>
                    </div>
                  ))}
                  
                  {/* Kalp hedef */}
                  <div
                    className="absolute z-10"
                    style={{
                      left: `${heartPosition.x}px`,
                      top: `${heartPosition.y}px`,
                      width: '30px',
                      height: '30px',
                    }}
                  >
                    <div className="text-3xl animate-bounce">❤️</div>
                  </div>
                </div>
              </div>
            )}

            {gameWon && showMessage && !secondGameStarted && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 rounded-2xl p-8 mb-6">
                  <h3 className="font-playfair text-2xl font-bold text-purple-700 mb-4">
                    💕 Güzel kızım kalbime ulaştın fakat bu başlangıç.
                  </h3>
                  <p className="font-inter text-lg text-purple-600 mb-6">
                    Şimdi kalbimi bana getir ve bana ait olduğunu hissedebileyim.
                  </p>
                  
                  <Button 
                    onClick={bringHeart}
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-8 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 mb-4"
                  >
                    Kalbini sana getireceğim ♡
                  </Button>
                </div>
              </div>
            )}

            {secondGameStarted && (
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-bold text-purple-700 mb-6">
                  Kalbi Prensine Götür ♡
                </h3>
                <p className="font-inter text-lg text-gray-600 mb-4">
                  Prenses kalbi alıp prensine götürmeye çalışıyor!
                </p>
                
                {/* 2D Platform Oyun Alanı */}
                <div className="relative mx-auto shadow-2xl border-4 border-gray-800 rounded-3xl bg-gradient-to-b from-blue-400 via-cyan-300 to-emerald-200 overflow-hidden" 
                     style={{ 
                       width: '720px', 
                       height: '450px', 
                       maxWidth: '95vw',
                       aspectRatio: '16/10'
                     }}
                     tabIndex={0}>
                  
                  {/* Arka plan */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    {/* Dağ silüetleri */}
                    <div className="absolute bottom-16 w-full">
                      <svg viewBox="0 0 720 120" className="w-full h-20 opacity-20">
                        <polygon points="0,120 120,40 240,60 360,20 480,50 600,30 720,45 720,120" fill="#1f2937"/>
                      </svg>
                    </div>
                    
                    {/* Bulutlar */}
                    <div className="absolute top-6 left-16 w-16 h-8 bg-white rounded-full opacity-80 animate-pulse"></div>
                    <div className="absolute top-12 right-24 w-20 h-10 bg-white rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                    
                    {/* Güneş */}
                    <div className="absolute top-6 right-12">
                      <div className="w-12 h-12 bg-yellow-300 rounded-full shadow-lg animate-pulse">
                        <div className="absolute inset-1 bg-yellow-200 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Zemin çimleri */}
                    <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-green-600 to-green-400"></div>
                    
                    {/* Çiçekler */}
                    {Array.from({ length: 12 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute bottom-2 text-sm animate-bounce"
                        style={{
                          left: `${30 + i * 55}px`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        🌸
                      </div>
                    ))}
                  </div>
                  
                  {/* Platform engelleri */}
                  {platformObstacles.map((obstacle, index) => (
                    <div
                      key={`platform-obstacle-${index}`}
                      className={`absolute z-10 ${
                        obstacle.type === 'platform' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 border-2 border-emerald-800 shadow-lg' :
                        obstacle.type === 'wall' ? 'bg-gradient-to-b from-stone-500 to-stone-700 border-2 border-stone-800 shadow-lg' :
                        'bg-gradient-to-t from-red-600 to-red-400 border-2 border-red-700 shadow-lg'
                      }`}
                      style={{
                        left: `${obstacle.x}px`,
                        top: `${obstacle.y}px`,
                        width: `${obstacle.width}px`,
                        height: `${obstacle.height}px`,
                        borderRadius: obstacle.type === 'spike' ? '8px 8px 0 0' : '6px',
                      }}
                    >
                      {obstacle.type === 'spike' && (
                        <div className="absolute -top-3 w-full flex justify-around z-20">
                          {Array.from({ length: Math.floor(obstacle.width / 8) }, (_, i) => (
                            <div key={i} className="text-red-500 text-sm font-bold">▲</div>
                          ))}
                        </div>
                      )}
                      {obstacle.type === 'platform' && (
                        <div className="absolute -top-1 w-full h-1 bg-green-400 rounded-t shadow-sm"></div>
                      )}
                    </div>
                  ))}
                  
                  {/* Prenses karakter (kalbi taşıyor) */}
                  <div
                    className="absolute transition-all duration-100 ease-out z-20"
                    style={{
                      left: `${princessPos.x}px`,
                      top: `${princessPos.y}px`,
                      width: '28px',
                      height: '40px',
                    }}
                  >
                    <div className="relative">
                      <div className="text-2xl">👸</div>
                      <div className="absolute -top-2 -right-2 text-lg animate-pulse">❤️</div>
                    </div>
                  </div>
                  
                  {/* Prens hedef */}
                  <div
                    className="absolute z-10"
                    style={{
                      left: `${princePos.x}px`,
                      top: `${princePos.y}px`,
                      width: '40px',
                      height: '50px',
                    }}
                  >
                    <div className="text-3xl animate-bounce">🤴</div>
                  </div>
                  
                  {secondGameWon && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
                      <div className="bg-white rounded-2xl p-8 text-center">
                        <h4 className="text-2xl font-bold text-purple-700 mb-4">
                          💕 Kalbimi bana getirdiğin için minnettarım güzel kızım! ♡
                        </h4>
                        <p className="text-lg text-gray-600 mb-6">
                          Aşkımıza kavuştuk,sıra benim olmakta :)
                        </p>
                        <Button 
                          onClick={() => setLocation('/landing')}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                        >
                          2. Sayfaya Git
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <p className="font-inter text-sm text-purple-600 font-medium">
                    🎮 <span className="font-bold">WASD</span> - Hareket • 
                    <span className="font-bold text-red-600">Dikenlere değme!</span> • 
                    🎯 Prensine git ve kalbi ver!
                  </p>
                </div>
              </div>
            )}

            {!gameStarted && !secondGameStarted && (
              <div className="flex gap-4 justify-center mt-8">
                
              
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}