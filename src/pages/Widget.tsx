import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface DonationData {
  user: string;
  amount: number;
  message: string;
}

const Widget = () => {
  const [searchParams] = useSearchParams();
  const [currentDonation, setCurrentDonation] = useState<DonationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const soundUrl = searchParams.get('sound') || '';
  const volume = parseInt(searchParams.get('volume') || '70');
  const theme = searchParams.get('theme') || 'neon';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'donation') {
        const donation = event.data.data as DonationData;
        
        if (soundUrl) {
          const audio = new Audio(soundUrl);
          audio.volume = volume / 100;
          audio.play().catch(() => console.log('Не удалось воспроизвести звук'));
        }

        setCurrentDonation(donation);
        setIsVisible(true);

        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setCurrentDonation(null), 500);
        }, 5000);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [soundUrl, volume]);

  if (!currentDonation) return null;

  const themeStyles = {
    neon: 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600',
    dark: 'bg-gradient-to-r from-gray-800 to-gray-900',
    gold: 'bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600',
    cyber: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600',
  };

  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center pt-8">
      <div
        className={`
          ${themeStyles[theme as keyof typeof themeStyles]}
          rounded-2xl p-8 shadow-2xl max-w-2xl w-full mx-4
          transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-8 scale-95'}
        `}
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
              <Icon name="Heart" size={48} className="text-white animate-pulse" />
            </div>
            <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Sparkles" size={20} className="text-yellow-900" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-3">
              <h3 className="text-4xl font-black text-white drop-shadow-lg">
                {currentDonation.user}
              </h3>
              <div className="text-5xl font-black text-yellow-300 drop-shadow-lg animate-pulse">
                {currentDonation.amount}₽
              </div>
            </div>
            
            {currentDonation.message && (
              <p className="text-2xl text-white/95 font-semibold drop-shadow-md">
                {currentDonation.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Icon name="Rocket" size={40} className="text-white animate-bounce" />
            <Icon name="Star" size={32} className="text-yellow-300 animate-pulse" />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute -left-6 top-1/2 w-12 h-12 bg-white/40 rounded-full animate-ping" />
          <div className="absolute -right-6 top-1/4 w-10 h-10 bg-yellow-400/40 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute left-1/2 -top-6 w-14 h-14 bg-pink-400/40 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
};

export default Widget;
