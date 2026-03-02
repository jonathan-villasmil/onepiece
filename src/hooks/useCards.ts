import { useState, useEffect, useCallback } from 'react';
import type { Card } from '../types/card';
import { fetchAllCards } from '../services/cardService';

interface UseCardsResult {
    cards: Card[];
    loading: boolean;
    error: string | null;
    retry: () => void;
}

export function useCards(): UseCardsResult {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchAllCards();
            setCards(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    return { cards, loading, error, retry: load };
}
