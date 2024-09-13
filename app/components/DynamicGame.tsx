'use client';

import { useState, useEffect } from 'react';
import GameContainer from './GameContainer';
import { getRandomName } from '../../utils/nameUtils';

export default function DynamicGame({ nameLength }: { nameLength: number }) {
    const [dailyName, setDailyName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getRandomName(nameLength)
            .then(setDailyName)
            .catch((err) => {
                console.error('Failed to get random name:', err);
                setError('Nie udało się załadować imienia. Spróbuj ponownie później.');
            });
    }, [nameLength]);

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!dailyName) {
        return <div className="text-center">Ładowanie...</div>;
    }

    return <GameContainer dailyName={dailyName} />;
}
