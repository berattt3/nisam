import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DecorativeHearts from "@/components/decorative-hearts";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Eye, EyeOff } from "lucide-react";

export default function FifthPage() {
  const [, setLocation] = useLocation();
  const [wishText, setWishText] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [wishSubmitted, setWishSubmitted] = useState(false);
  const { toast } = useToast();

  const createWishMutation = useMutation({
    mutationFn: (wishContent: string) =>
      apiRequest("POST", "/api/wishes", { wishContent }),
    onSuccess: () => {
      setWishSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/wishes"] });
      toast({
        title: "Dilek kaydedildi ♡",
        description: "Dileğin başarıyla kaydedildi!",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Dilek kaydedilirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const goBackToFourth = () => {
    setLocation("/fourth-page");
  };

  const goBackToFirst = () => {
    setLocation("/");
  };

  const handleSubmit = () => {
    if (wishText.trim()) {
      createWishMutation.mutate(wishText.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
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
            
            {!wishSubmitted ? (
              <div className="mb-12">
                <div className="text-6xl heart-decoration mb-8 animate-pulse-soft">♡</div>
                
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[var(--purple-primary)] mb-6">
                  Dilek Tut ♡
                </h2>
                
                <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] mb-10 leading-relaxed max-w-3xl mx-auto">
                  Benimle ilgili veya şuan bize ilgili en çok ne istersin?
                </p>
                
                {/* Wish Input Area */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div className="relative">
                    <Textarea
                      placeholder="Dileğini buraya yaz... (Enter'a basarak gönderebilirsin)"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`min-h-32 text-lg resize-none border-2 border-[var(--purple-accent)]/30 focus:border-[var(--purple-primary)] rounded-2xl p-6 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 ${
                        isHidden ? 'filter blur-sm' : ''
                      }`}
                      disabled={createWishMutation.isPending}
                    />
                    
                    {/* Visibility Toggle */}
                    <button
                      onClick={toggleVisibility}
                      className="absolute top-4 right-4 p-2 text-[var(--purple-primary)] hover:text-[var(--purple-accent)] transition-colors duration-200"
                      title={isHidden ? "Metni göster" : "Metni gizle"}
                    >
                      {isHidden ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 text-sm text-[var(--warm-gray)]">
                    <span>{wishText.length} karakter</span>
                    <span>Enter ile gönder</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mb-8">
                  <Button
                    onClick={handleSubmit}
                    disabled={!wishText.trim() || createWishMutation.isPending}
                    className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {createWishMutation.isPending ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Kaydediliyor...</span>
                      </span>
                    ) : (
                      "Dileği Kaydet ♡"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <div className="text-7xl mb-6">💖✨💖</div>
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[var(--purple-primary)] mb-6">
                  Dileğin Kaydedildi! ♡
                </h2>
                <p className="font-inter text-lg md:text-xl text-[var(--warm-gray)] leading-relaxed max-w-2xl mx-auto mb-8">
                  Güzel dileğin başarıyla kaydedildi. Umarım en kısa sürede gerçek olur.
                </p>
                
                <div className="p-6 bg-gradient-to-r from-[var(--purple-primary)]/10 to-[var(--purple-accent)]/10 rounded-2xl border border-[var(--purple-accent)]/20 max-w-2xl mx-auto">
                  <div className="text-xl heart-decoration mb-3">♡</div>
                  <p className="font-inter text-base text-[var(--purple-primary)] italic">
                    "Dileğin: {wishText}"
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {wishSubmitted && (
                <>
                  <Button 
                    onClick={() => setLocation("/seventh-page")}
                    className="px-16 py-5 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-semibold text-lg rounded-full transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                  >
                    7. Sayfaya Git ♡
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      setWishSubmitted(false);
                      setWishText("");
                      setIsHidden(false);
                    }}
                    className="px-12 py-4 bg-gradient-to-r from-[var(--purple-primary)] to-[var(--purple-accent)] hover:from-[var(--purple-accent)] hover:to-[var(--purple-primary)] text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Yeni Dilek Tut ♡
                  </Button>
                </>
              )}
              
              <Button 
                onClick={goBackToFourth}
                className="px-12 py-4 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-inter font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                ← Dördüncü Sayfaya Dön
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
              Beşinci sayfa - Dilek tutma sistemi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}