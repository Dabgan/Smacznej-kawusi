import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicGame = dynamic(() => import('../../components/DynamicGame'), { ssr: false });

export default function Game({ params }: { params: { length: string } }) {
    const nameLength = parseInt(params.length, 10);
    if (isNaN(nameLength) || nameLength < 4 || nameLength > 8) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Nieprawidłowy tryb gry</h2>
                <p>Proszę wybrać prawidłowy tryb gry ze strony głównej.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Zgadnij {nameLength}-literowe imię</h2>
            <Suspense fallback={<div>Ładowanie...</div>}>
                <DynamicGame nameLength={nameLength} />
            </Suspense>
        </div>
    );
}
