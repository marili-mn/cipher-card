import { useState, useEffect, useCallback } from 'react';
import type { Card } from '../../core/domain/Card';
import { MockCardRepository } from '../../infrastructure/adapters/MockCardRepository';

const repository = new MockCardRepository();

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await repository.getAll();
      setCards(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cards');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const toggleCardLock = async (cardId: string) => {
    const previousCards = [...cards];
    
    setCards(current => current.map(c => 
      c.id === cardId 
        ? { ...c, status: c.status === 'active' ? 'frozen' : 'active' } 
        : c
    ));

    try {
      await repository.toggleLock(cardId);
    } catch (err) {
      setCards(previousCards);
      setError('Failed to update card status');
      console.error(err);
    }
  };

  return {
    cards,
    isLoading,
    error,
    toggleCardLock,
    refresh: fetchCards
  };
}