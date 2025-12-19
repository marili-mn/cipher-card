import type { Card } from "../domain/Card";

export interface ICardRepository {
  getAll(): Promise<Card[]>;
  toggleLock(cardId: string): Promise<Card>;
  create(card: Omit<Card, 'id' | 'spent' | 'status'>): Promise<Card>;
}