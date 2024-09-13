import { NextResponse } from 'next/server';
import { getRandomName } from '../../../utils/nameUtils';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const length = parseInt(searchParams.get('length') || '5', 10);

    try {
        const name = await getRandomName(length);
        return NextResponse.json({ name });
    } catch (error) {
        console.error('Error getting random name:', error);
        return NextResponse.json({ error: 'Failed to get a random name' }, { status: 500 });
    }
}
