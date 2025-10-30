import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DonationAlertProps {
  user: string;
  amount: number;
  message?: string;
  onComplete?: () => void;
}

const DonationAlert = ({ user, amount, message, onComplete }: DonationAlertProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    
    const hideTimer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500);
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [onComplete]);

  if (!isVisible && !isLeaving) return null;

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <Card
        className={`
          bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 
          border-0 p-6 animate-fade-in
          ${isLeaving ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}
          transition-all duration-500
        `}
      >
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center animate-pulse-glow">
              <Icon name="Heart" size={40} className="text-white animate-float" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Icon name="Sparkles" size={16} className="text-yellow-900" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-3xl font-black text-white text-glow-pink">
                {user}
              </h3>
              <div className="text-4xl font-black text-yellow-300 text-glow-pink animate-pulse">
                {amount}₽
              </div>
            </div>
            
            {message && (
              <p className="text-lg text-white/90 font-medium">
                {message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Icon name="Rocket" size={32} className="text-white animate-float" />
            <Icon name="Star" size={24} className="text-yellow-300 animate-pulse" />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
          <div className="absolute -left-4 top-1/2 w-8 h-8 bg-white/30 rounded-full animate-ping" />
          <div className="absolute -right-4 top-1/4 w-6 h-6 bg-yellow-400/30 rounded-full animate-ping delay-75" />
          <div className="absolute left-1/2 -top-4 w-10 h-10 bg-pink-400/30 rounded-full animate-ping delay-150" />
        </div>
      </Card>
    </div>
  );
};

export default DonationAlert;
