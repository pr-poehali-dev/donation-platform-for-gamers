import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  tierName?: string;
  onPaymentComplete?: (data: { user: string; amount: number; message: string }) => void;
}

const PaymentModal = ({ open, onClose, amount, tierName, onPaymentComplete }: PaymentModalProps) => {
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handlePayment = () => {
    if (!userName.trim()) return;
    
    onPaymentComplete?.({
      user: userName,
      amount,
      message: message || 'Спасибо за поддержку! 🎮',
    });
    
    setUserName('');
    setMessage('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon name="Wallet" className="text-primary" />
            Оформление доната
          </DialogTitle>
          <DialogDescription>
            {tierName && `Уровень: ${tierName} • `}Сумма: {amount}₽
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username">Твой никнейм *</Label>
            <Input
              id="username"
              placeholder="GamerPro2024"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-input/50 border-primary/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Сообщение (опционально)</Label>
            <Textarea
              id="message"
              placeholder="Твоё сообщение стримеру..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-input/50 border-primary/30 min-h-20"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {message.length}/200
            </p>
          </div>

          <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="card">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="yoomoney">
                <Icon name="Wallet" size={16} className="mr-2" />
                ЮMoney
              </TabsTrigger>
              <TabsTrigger value="qiwi">
                <Icon name="Smartphone" size={16} className="mr-2" />
                QIWI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="space-y-3 mt-4">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <Input placeholder="Номер карты" className="bg-input/50" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/ГГ" className="bg-input/50" />
                  <Input placeholder="CVV" className="bg-input/50" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="yoomoney" className="mt-4">
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <Icon name="Wallet" size={48} className="mx-auto mb-3 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Вы будете перенаправлены на страницу ЮMoney
                </p>
              </div>
            </TabsContent>

            <TabsContent value="qiwi" className="mt-4">
              <div className="bg-muted/30 rounded-lg p-6 text-center">
                <Icon name="Smartphone" size={48} className="mx-auto mb-3 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Вы будете перенаправлены на страницу QIWI
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
            <Icon name="Shield" size={16} className="mt-0.5 flex-shrink-0" />
            <p>
              Все платежи защищены 256-битным шифрованием. Мы не храним данные вашей карты.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!userName.trim()}
              className="flex-1 bg-primary hover:bg-primary/90 glow-purple"
            >
              <Icon name="Zap" size={20} className="mr-2" />
              Оплатить {amount}₽
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
