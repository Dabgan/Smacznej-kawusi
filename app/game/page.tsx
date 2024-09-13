import { getRandomName } from '../../utils/nameUtils';
import GameContainer from '../components/GameContainer';

export default async function Game() {
    let dailyName: string;
    try {
        dailyName = await getRandomName(5);
    } catch (error) {
        console.error('Failed to get random name:', error);
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
                <p>We couldn&apos;t load today&apos;s name. Please try again later.</p>
            </div>
        );
    }

    if (!dailyName) {
        return (
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">No name available</h2>
                <p>There are no 5-letter names available to play with today. Please check back later.</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Guess the Name</h2>
            <GameContainer dailyName={dailyName} />
        </div>
    );
}
