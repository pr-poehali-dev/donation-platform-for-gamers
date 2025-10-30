import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [isLive, setIsLive] = useState(true);

  const donationTiers = [
    {
      name: 'Новичок',
      amount: 100,
      icon: 'Zap',
      color: 'from-purple-500 to-purple-700',
      perks: ['Уникальный бейдж', 'Доступ к чату'],
    },
    {
      name: 'Легенда',
      amount: 500,
      icon: 'Flame',
      color: 'from-pink-500 to-pink-700',
      perks: ['Уникальный бейдж', 'Эмодзи набор', 'Приоритет в чате'],
    },
    {
      name: 'Киберпанк',
      amount: 1000,
      icon: 'Sparkles',
      color: 'from-blue-500 to-cyan-500',
      perks: ['Уникальный бейдж', 'Эмодзи набор', 'Личный стикерпак', 'VIP статус'],
    },
  ];

  const recentDonations = [
    { user: 'GamerPro', amount: 500, message: 'Продолжай в том же духе! 🔥', platform: 'twitch' },
    { user: 'StreamFan', amount: 1000, message: 'Лучший контент! 🎮', platform: 'youtube' },
    { user: 'NeonWarrior', amount: 250, message: 'Респект! ⚡', platform: 'twitch' },
  ];

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Icon name="Gamepad2" className="text-primary" size={48} />
            <h1 className="text-6xl font-black text-glow-purple bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
              GAME SUPPORT
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Поддержи создателей игр и получи эксклюзивные награды
          </p>
          
          {isLive && (
            <Badge className="mt-4 glow-pink animate-pulse-glow bg-secondary text-secondary-foreground px-6 py-2 text-lg">
              <Icon name="Wifi" size={20} className="mr-2" />
              СТРИМ ОНЛАЙН
            </Badge>
          )}
        </header>

        <Tabs defaultValue="donate" className="max-w-6xl mx-auto mb-16">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="donate" className="data-[state=active]:glow-purple">
              <Icon name="Heart" size={20} className="mr-2" />
              Донат
            </TabsTrigger>
            <TabsTrigger value="stream" className="data-[state=active]:glow-blue">
              <Icon name="Tv" size={20} className="mr-2" />
              Стрим
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:glow-pink">
              <Icon name="Trophy" size={20} className="mr-2" />
              Топ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donate" className="space-y-8 mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {donationTiers.map((tier, index) => (
                <Card
                  key={tier.name}
                  className={`bg-gradient-to-br ${tier.color} border-0 hover:scale-105 transition-transform duration-300 cursor-pointer animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-float">
                      <Icon name={tier.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-white">{tier.name}</CardTitle>
                    <CardDescription className="text-white/90 text-3xl font-bold">
                      {tier.amount}₽
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-center text-white/90">
                          <Icon name="Check" size={16} className="mr-2 text-white" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                      Выбрать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card/80 backdrop-blur-sm border-primary/30 glow-purple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Coins" className="text-primary" />
                  Кастомная сумма
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="Введи сумму..."
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="bg-input/50 border-primary/50 text-lg"
                  />
                  <Button className="bg-primary hover:bg-primary/90 glow-purple px-8">
                    <Icon name="Send" size={20} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stream" className="mt-8">
            <Card className="bg-card/80 backdrop-blur-sm border-accent/30 glow-blue">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Tv" className="text-accent" />
                  Интеграция со стримами
                </CardTitle>
                <CardDescription>Подключи свои аккаунты для донатов во время стрима</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button className="h-16 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 glow-purple">
                    <Icon name="Twitch" fallback="Tv" size={24} className="mr-3" />
                    <div className="text-left">
                      <div className="font-bold">Twitch</div>
                      <div className="text-xs opacity-80">Подключить канал</div>
                    </div>
                  </Button>
                  
                  <Button className="h-16 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 glow-pink">
                    <Icon name="Youtube" fallback="Video" size={24} className="mr-3" />
                    <div className="text-left">
                      <div className="font-bold">YouTube</div>
                      <div className="text-xs opacity-80">Подключить канал</div>
                    </div>
                  </Button>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                  <h3 className="font-bold flex items-center gap-2">
                    <Icon name="Star" className="text-primary" />
                    Возможности интеграции
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-1 text-primary" />
                      <span>Автоматическое отображение донатов на стриме</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-1 text-secondary" />
                      <span>Кастомные алерты и анимации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-1 text-accent" />
                      <span>Голосовое озвучивание сообщений</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Check" size={16} className="mt-1 text-primary" />
                      <span>Статистика в реальном времени</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Card className="bg-card/80 backdrop-blur-sm border-secondary/30 glow-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Trophy" className="text-secondary" />
                  Топ донатеров
                </CardTitle>
                <CardDescription>Герои сообщества</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in border border-primary/20"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {donation.user}
                            <Badge variant="outline" className="text-xs">
                              {donation.platform === 'twitch' ? (
                                <Icon name="Tv" size={12} className="mr-1" />
                              ) : (
                                <Icon name="Video" size={12} className="mr-1" />
                              )}
                              {donation.platform}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{donation.message}</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-primary">{donation.amount}₽</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <footer className="text-center text-muted-foreground mt-16">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} />
            Все платежи защищены и безопасны
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
