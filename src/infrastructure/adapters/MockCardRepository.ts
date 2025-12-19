import type { Card } from "../../core/domain/Card";
import type { ICardRepository } from "../../core/repositories/ICardRepository";

// Simula base de datos en memoria
let MOCK_DB: Card[] = [
  {
    id: '1',
    pan: '4532 1234 5678 9012',
    cvv: '123',
    expiry: '12/28',
    holderName: 'ALEX RIVERA',
    status: 'active',
    limit: 1000,
    spent: 450.50,
    provider: 'visa'
  },
  {
    id: '2',
    pan: '5412 7512 3412 3456',
    cvv: '999',
    expiry: '01/26',
    holderName: 'ALEX RIVERA',
    status: 'frozen',
    limit: 50,
    spent: 12.00,
    provider: 'mastercard'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockCardRepository implements ICardRepository {
  async getAll(): Promise<Card[]> {
    await delay(800); // Latencia simulada
    return [...MOCK_DB];
  }

  async toggleLock(cardId: string): Promise<Card> {
    await delay(400);
    const cardIndex = MOCK_DB.findIndex(c => c.id === cardId);
    if (cardIndex === -1) throw new Error("Card not found");

    const newStatus = MOCK_DB[cardIndex].status === 'active' ? 'frozen' : 'active';
    MOCK_DB[cardIndex] = { ...MOCK_DB[cardIndex], status: newStatus };
    
    return MOCK_DB[cardIndex];
  }

  async create(cardData: Omit<Card, "id" | "spent" | "status">): Promise<Card> {
    await delay(1000);
    const newCard: Card = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'active',
      spent: 0
    };
    MOCK_DB.push(newCard);
    return newCard;
  }
}