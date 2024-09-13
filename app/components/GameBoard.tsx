import React from 'react';
import { validateGuess } from '../../utils/clientGameLogic';

interface GameBoardProps {
    guesses: string[];
    currentGuess: string;
    dailyName: string;
    gameStatus: 'playing' | 'won' | 'lost';
}

export default function GameBoard({ guesses, currentGuess, dailyName, gameStatus }: GameBoardProps) {
    const nameLength = dailyName.length;

    return (
        <div className="flex flex-col items-center">
            <div className="grid gap-1 mb-4" style={{ gridTemplateColumns: `repeat(${nameLength}, 1fr)` }}>
                {[...Array(6)].map((_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {[...Array(nameLength)].map((_, colIndex) => {
                            let letter = '';
                            let result = 'empty';
                            if (rowIndex < guesses.length) {
                                letter = guesses[rowIndex][colIndex] || '';
                                result = validateGuess(guesses[rowIndex], dailyName)[colIndex];
                            } else if (rowIndex === guesses.length && gameStatus === 'playing') {
                                letter = currentGuess[colIndex] || '';
                            }
                            return (
                                <div
                                    key={colIndex}
                                    className={`w-14 h-14 flex items-center justify-center border-2 font-bold text-2xl
                                        ${
                                            result === 'correct'
                                                ? 'bg-green-500 text-white border-green-600'
                                                : result === 'misplaced'
                                                ? 'bg-yellow-500 text-white border-yellow-600'
                                                : result === 'incorrect'
                                                ? 'bg-gray-300 border-gray-400'
                                                : 'bg-white border-gray-300'
                                        }`}
                                >
                                    {letter.toUpperCase()}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-4 text-center">
                {gameStatus === 'won' && <p className="text-green-500 font-bold text-xl">Gratulacje! Odgadłeś imię!</p>}
                {gameStatus === 'lost' && (
                    <p className="text-red-500 font-bold text-xl">Koniec gry. Imię to {dailyName}.</p>
                )}
            </div>
        </div>
    );
}
