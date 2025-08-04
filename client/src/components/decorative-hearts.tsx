export default function DecorativeHearts() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Large floating heart - top right */}
      <div className="absolute top-20 right-16 text-6xl heart-decoration animate-float opacity-20">
        ♡
      </div>
      
      {/* Medium floating heart - left side */}
      <div 
        className="absolute top-1/3 left-12 text-4xl heart-decoration animate-pulse-soft opacity-30"
        style={{ animationDelay: '1s' }}
      >
        ♡
      </div>
      
      {/* Small hearts scattered */}
      <div 
        className="absolute bottom-32 right-1/4 text-2xl heart-decoration animate-float opacity-25"
        style={{ animationDelay: '2s' }}
      >
        ♡
      </div>
      
      <div 
        className="absolute top-1/2 right-8 text-3xl heart-decoration animate-pulse-soft opacity-20"
        style={{ animationDelay: '3s' }}
      >
        ♡
      </div>
      
      <div 
        className="absolute bottom-20 left-1/3 text-2xl heart-decoration animate-float opacity-30"
        style={{ animationDelay: '4s' }}
      >
        ♡
      </div>
      
      {/* Additional hearts for more elegance */}
      <div 
        className="absolute top-16 left-1/4 text-xl heart-decoration animate-pulse-soft opacity-15"
        style={{ animationDelay: '5s' }}
      >
        ♡
      </div>
      
      <div 
        className="absolute bottom-40 right-12 text-2xl heart-decoration animate-float opacity-20"
        style={{ animationDelay: '6s' }}
      >
        ♡
      </div>
    </div>
  );
}
