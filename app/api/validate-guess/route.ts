import { NextResponse } from 'next/server';
import { validateGuess } from '../../../utils/clientGameLogic';

export async function POST(request: Request) {
    try {
        const { guess, correctName } = await request.json();

        if (!guess || !correctName) {
            return NextResponse.json({ error: 'Missing guess or correctName' }, { status: 400 });
        }

        const result = validateGuess(guess, correctName);
        return NextResponse.json({ result });
    } catch (error) {
        console.error('Error validating guess:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
