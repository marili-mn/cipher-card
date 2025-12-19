import type { Card } from "../../core/domain/Card";
import type { ICardRepository } from "../../core/repositories/ICardRepository";

// MOCK DATABASE: WAYNE ENTERPRISES FINANCIAL DIVISION
let MOCK_DB: Card[] = [
  {
    id: 'wayne-001',
    pan: '4000 1234 5678 9999',
    cvv: '007',
    expiry: '12/99',
    holderName: 'BRUCE WAYNE',
    status: 'active',
    limit: 10000000,
    spent: 45000.50,
    provider: 'visa'
  },
  {
    id: 'cave-ops-01',
    pan: '5100 7512 3412 0000',
    cvv: '***',
    expiry: '01/30',
    holderName: 'THE BATMAN', // Internal Alias
    status: 'frozen',
    limit: 50000,
    spent: 12500.00,
    provider: 'mastercard'
  },
  {
    id: 'alfred-01',
    pan: '4111 1111 1111 1234',
    cvv: '123',
    expiry: '05/26',
    holderName: 'ALFRED PENNYWORTH',
    status: 'active',
    limit: 5000,
    spent: 230.00,
    provider: 'visa'
  }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MockCardRepository implements ICardRepository {
  async getAll(): Promise<Card[]> {
    await delay(1200); // Latencia cinemática un poco más larga
    return [...MOCK_DB];
  }

  async toggleLock(cardId: string): Promise<Card> {
    await delay(300); // Respuesta mecánica rápida
    const cardIndex = MOCK_DB.findIndex(c => c.id === cardId);
    if (cardIndex === -1) throw new Error("Card not found");

    const newStatus = MOCK_DB[cardIndex].status === 'active' ? 'frozen' : 'active';
    MOCK_DB[cardIndex] = { ...MOCK_DB[cardIndex], status: newStatus };
    
    return MOCK_DB[cardIndex];
  }

  async create(cardData: Omit<Card, "id" | "spent" | "status">): Promise<Card> {
    await delay(1500);
    const newCard: Card = {
      ...cardData,
      id: 'gen-' + Math.random().toString(36).substr(2, 9),
      status: 'active',
      spent: 0
    };
    MOCK_DB.push(newCard);
    return newCard;
  }
}
