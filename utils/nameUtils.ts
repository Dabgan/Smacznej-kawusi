import { readFile } from 'fs/promises';
import { join } from 'path';

let names: string[] = [];

export async function getRandomName(length: number): Promise<string> {
    if (names.length === 0) {
        const content = await readFile(join(process.cwd(), 'names.txt'), 'utf-8');
        names = content
            .split('\n')
            .filter(Boolean)
            .map((name) => name.trim());
    }
    const filteredNames = names.filter((name) => name.length === length);
    if (filteredNames.length === 0) {
        throw new Error(`No names found with length ${length}`);
    }
    return filteredNames[Math.floor(Math.random() * filteredNames.length)];
}
