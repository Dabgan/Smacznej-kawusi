import React from 'react';

interface KeyboardProps {
    onKeyPress: (key: string) => void;
    usedLetters: Record<string, 'correct' | 'misplaced' | 'incorrect' | 'unused'>;
}

const KEYBOARD_ROWS = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 'ą', 's', 'ś', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ł'],
    ['z', 'ź', 'ż', 'c', 'ć', 'v', 'b', 'n', 'ń', 'm', 'ó', 'ę'],
    ['Backspace', 'Enter'],
];

export default function Keyboard({ onKeyPress, usedLetters }: KeyboardProps) {
    return (
        <div className="mt-4">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center mb-2">
                    {row.map((key) => (
                        <button
                            key={key}
                            onClick={() => onKeyPress(key)}
                            className={`mx-1 px-3 py-2 rounded font-semibold text-sm
                                ${
                                    key === 'Backspace'
                                        ? 'bg-gray-300 text-gray-700 px-4'
                                        : usedLetters[key] === 'correct'
                                        ? 'bg-green-500 text-white'
                                        : usedLetters[key] === 'misplaced'
                                        ? 'bg-yellow-500 text-white'
                                        : usedLetters[key] === 'incorrect'
                                        ? 'bg-gray-400 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            {key === 'Backspace' ? '←' : key === 'Enter' ? 'Enter' : key.toUpperCase()}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
