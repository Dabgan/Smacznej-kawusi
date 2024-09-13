export function validateGuess(guess: string, correctName: string) {
    const result = new Array(guess.length).fill('incorrect');
    const correctNameArray = correctName.toLowerCase().split('');
    const guessArray = guess.toLowerCase().split('');

    // Count occurrences of each letter in the correct name
    const letterCount: Record<string, number> = {};
    correctNameArray.forEach((letter) => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });

    // First pass: mark correct letters
    for (let i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === correctNameArray[i]) {
            result[i] = 'correct';
            letterCount[guessArray[i]]--;
        }
    }

    // Second pass: mark misplaced letters
    for (let i = 0; i < guessArray.length; i++) {
        if (result[i] !== 'correct' && letterCount[guessArray[i]] > 0) {
            result[i] = 'misplaced';
            letterCount[guessArray[i]]--;
        }
    }

    return result;
}
