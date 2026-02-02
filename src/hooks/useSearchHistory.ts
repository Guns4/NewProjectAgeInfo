"use client";

import { useState, useEffect } from 'react';

export interface HistoryItem {
    date: string;       // YYYY-MM-DD
    timestamp: number;  // Date.now()
}

const HISTORY_KEY = 'age_calculator_history';
const MAX_HISTORY_ITEMS = 5;

export function useSearchHistory() {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(HISTORY_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setHistory(parsed);
                }
            }
        } catch (e) {
            console.error('Failed to load history', e);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save history to localStorage
    const saveHistory = (newHistory: HistoryItem[]) => {
        try {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
            setHistory(newHistory);
        } catch (e) {
            console.error('Failed to save history', e);
        }
    };

    const addToHistory = (date: string) => {
        if (!date) return;

        // Prevent duplicates: remove existing entry for same date
        const filtered = history.filter(item => item.date !== date);

        // Add to top
        const newItem: HistoryItem = {
            date,
            timestamp: Date.now()
        };

        const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        saveHistory(updated);
    };

    const clearHistory = () => {
        saveHistory([]);
    };

    return {
        history,
        addToHistory, // Renamed from addHistory to match request in plan
        clearHistory,
        isLoaded
    };
}
