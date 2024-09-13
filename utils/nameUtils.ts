let names: string[] = [];

export async function getRandomName(length: number): Promise<string> {
    if (names.length === 0) {
        try {
            const response = await fetch('/names.txt');
            if (!response.ok) {
                throw new Error('Failed to fetch names');
            }
            const content = await response.text();
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
