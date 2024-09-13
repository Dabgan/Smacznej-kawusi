import fs from 'fs/promises';
import path from 'path';

let names: string[] = [];

export async function getRandomName(length: number): Promise<string> {
    if (names.length === 0) {
        try {
            let content: string;
            if (typeof window === 'undefined') {
                // Server-side: Read file directly
                const filePath = path.join(process.cwd(), 'public', 'names.txt');
                content = await fs.readFile(filePath, 'utf-8');
            } else {
                // Client-side: Fetch file
                const response = await fetch('/names.txt');
                if (!response.ok) {
                    throw new Error('Failed to fetch names');
                }
                content = await response.text();
            }
            names = content
                .split('\n')
                .filter(Boolean)
                .map((name) => name.trim());
        } catch (error) {
            console.error('Error loading names:', error);
            throw new Error('Failed to load names');
        }
    }

    const filteredNames = names.filter((name) => name.length === length);
    if (filteredNames.length === 0) {
        throw new Error(`No names found with length ${length}`);
    }
    return filteredNames[Math.floor(Math.random() * filteredNames.length)];
}
