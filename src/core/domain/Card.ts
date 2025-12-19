export type CardStatus = 'active' | 'frozen' | 'expired';

export interface Card {
  id: string;
  pan: string;
  cvv: string;
  expiry: string;
  holderName: string;
  status: CardStatus;
  limit: number;
  spent: number;
  provider: 'visa' | 'mastercard';
}