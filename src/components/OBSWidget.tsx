import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface OBSWidgetProps {
  soundUrl: string;
  volume: number;
}

const OBSWidget = ({ soundUrl, volume }: OBSWidgetProps) => {
  const [theme, setTheme] = useState('neon');
  const { toast } = useToast();

  const generateWidgetUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      sound: soundUrl,
      volume: volume.toString(),
      theme,
    });
    return `${baseUrl}/widget?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const url = generateWidgetUrl();
    navigator.clipboard.writeText(url);
    toast({
      title: 'Ссылка скопирована!',
      description: 'Виджет готов для добавления в OBS Studio',
    });
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/30 glow-purple">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Icon name="Monitor" className="text-primary" />
          Виджет для OBS Studio
        </CardTitle>
        <CardDescription>Добавь донат-алерты на свой стрим</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Тема виджета</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="bg-input/50 border-primary/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neon">Неон (фиолетово-розовый)</SelectItem>
              <SelectItem value="cyber">Киберпанк (синий)</SelectItem>
              <SelectItem value="gold">Золото (оранжевый)</SelectItem>
              <SelectItem value="dark">Тёмная</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">URL виджета</Label>
            <Button
              size="sm"
              onClick={copyToClipboard}
              className="bg-primary hover:bg-primary/90"
            >
              <Icon name="Copy" size={16} className="mr-2" />
              Копировать
            </Button>
          </div>
          <Input
            value={generateWidgetUrl()}
            readOnly
            className="bg-input/30 text-xs font-mono"
          />
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <Icon name="Info" className="text-primary" />
            Как добавить в OBS Studio
          </h3>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                1
              </Badge>
              <span>Открой OBS Studio и выбери сцену для алертов</span>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                2
              </Badge>
              <span>Нажми <strong>+</strong> → <strong>Браузер</strong></span>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                3
              </Badge>
              <span>Вставь скопированный URL в поле "URL"</span>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                4
              </Badge>
              <span>Установи размеры: <strong>1920x1080</strong></span>
            </li>
            <li className="flex gap-3">
              <Badge variant="outline" className="h-6 w-6 flex items-center justify-center flex-shrink-0">
                5
              </Badge>
              <span>Готово! Алерты будут отображаться при донатах</span>
            </li>
          </ol>
        </div>

        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <Icon name="AlertTriangle" size={20} className="text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm space-y-1">
            <p className="font-medium text-yellow-500">Важно для стримеров</p>
            <p className="text-muted-foreground">
              Оставь вкладку с донат-платформой открытой во время стрима, чтобы алерты работали в реальном времени
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            <Icon name="Play" size={20} className="mr-2" />
            Тестовый алерт
          </Button>
          <Button
            onClick={copyToClipboard}
            className="w-full bg-primary hover:bg-primary/90 glow-purple"
          >
            <Icon name="Download" size={20} className="mr-2" />
            Экспорт настроек
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OBSWidget;
