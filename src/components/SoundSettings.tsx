import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface SoundSettingsProps {
  onSoundUrlChange: (url: string) => void;
  onVolumeChange: (volume: number) => void;
}

const SoundSettings = ({ onSoundUrlChange, onVolumeChange }: SoundSettingsProps) => {
  const [soundUrl, setSoundUrl] = useState('');
  const [volume, setVolume] = useState([70]);
  const [isPlaying, setIsPlaying] = useState(false);

  const defaultSounds = [
    { name: 'Классический', url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', icon: 'Bell' },
    { name: 'Монетки', url: 'https://www.soundjay.com/misc/sounds/coin-drop-1.mp3', icon: 'Coins' },
    { name: 'Фанфары', url: 'https://www.soundjay.com/misc/sounds/magic-chime-02.mp3', icon: 'PartyPopper' },
    { name: 'Киберпанк', url: 'https://www.soundjay.com/misc/sounds/beep-10.mp3', icon: 'Zap' },
  ];

  const handleSoundSelect = (url: string) => {
    setSoundUrl(url);
    onSoundUrlChange(url);
    testSound(url);
  };

  const handleCustomUrl = () => {
    if (soundUrl) {
      onSoundUrlChange(soundUrl);
      testSound(soundUrl);
    }
  };

  const testSound = (url: string) => {
    setIsPlaying(true);
    const audio = new Audio(url);
    audio.volume = volume[0] / 100;
    audio.play().catch(() => {
      console.log('Не удалось воспроизвести звук');
    });
    audio.onended = () => setIsPlaying(false);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    onVolumeChange(newVolume[0]);
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-accent/30 glow-blue">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Icon name="Volume2" className="text-accent" />
          Настройка звуков донатов
        </CardTitle>
        <CardDescription>Выбери звук, который будет проигрываться при донате</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Готовые звуки</Label>
          <div className="grid grid-cols-2 gap-3">
            {defaultSounds.map((sound) => (
              <Button
                key={sound.name}
                variant="outline"
                className={`h-auto py-4 flex flex-col gap-2 ${
                  soundUrl === sound.url ? 'border-primary bg-primary/10' : ''
                }`}
                onClick={() => handleSoundSelect(sound.url)}
              >
                <Icon name={sound.icon as any} size={24} />
                <span className="text-sm font-medium">{sound.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="customUrl">Свой звук (URL)</Label>
          <div className="flex gap-2">
            <Input
              id="customUrl"
              placeholder="https://example.com/sound.mp3"
              value={soundUrl}
              onChange={(e) => setSoundUrl(e.target.value)}
              className="bg-input/50 border-primary/30"
            />
            <Button
              onClick={handleCustomUrl}
              disabled={!soundUrl || isPlaying}
              className="bg-accent hover:bg-accent/90"
            >
              <Icon name="Play" size={20} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Поддерживаются форматы: MP3, WAV, OGG
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Громкость</Label>
            <span className="text-sm text-muted-foreground">{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={handleVolumeChange}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Icon name="Lightbulb" size={16} className="text-primary" />
            <span>Совет для стримеров</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Загрузи свой звук на любой хостинг (например, Google Drive с публичным доступом) и вставь ссылку выше. 
            Так твой стрим станет уникальным!
          </p>
        </div>

        {soundUrl && (
          <Button
            onClick={() => testSound(soundUrl)}
            disabled={isPlaying}
            className="w-full bg-primary hover:bg-primary/90 glow-purple"
          >
            <Icon name="TestTube" size={20} className="mr-2" />
            {isPlaying ? 'Проигрывается...' : 'Тестировать звук'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SoundSettings;
