import { getRandomName } from '../../../utils/nameUtils';
import GameContainer from '../../components/GameContainer';

export default async function Game({ params }: { params: { length: string } }) {
    const nameLength = parseInt(params.length, 10);
    if (isNaN(nameLength) || nameLength < 4 || nameLength > 8) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Nieprawidłowy tryb gry</h2>
                <p>Proszę wybrać prawidłowy tryb gry ze strony głównej.</p>
            </div>
        );
    }

    let dailyName: string;
    try {
        dailyName = await getRandomName(nameLength);
    } catch (error) {
        console.error('Failed to get random name:', error);
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Brak dostępnych imion</h2>
                <p>Nie ma dostępnych imion {nameLength}-literowych. Spróbuj innej długości.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Zgadnij {nameLength}-literowe imię</h2>
            <GameContainer dailyName={dailyName} />
        </div>
    );
}
