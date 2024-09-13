'use client';

import React, { useState, useEffect } from 'react';
import { validateGuess } from '../../utils/clientGameLogic';
import GameBoard from './GameBoard';
import Keyboard from './Keyboard';

interface GameContainerProps {
    dailyName: string;
}

export default function GameContainer({ dailyName }: GameContainerProps) {
    const [guesses, setGuesses] = useState<string[]>([]);
    const [currentGuess, setCurrentGuess] = useState('');
    const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
    const [usedLetters, setUsedLetters] = useState<Record<string, 'correct' | 'misplaced' | 'incorrect' | 'unused'>>(
        {}
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentGuess, gameStatus]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (gameStatus !== 'playing') return;

        if (event.key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (event.key === 'Enter' && currentGuess.length === dailyName.length) {
            handleGuess();
        } else if (event.key.length === 1 && event.key.match(/[a-ząćęłńóśźż]/i)) {
            if (currentGuess.length < dailyName.length) {
                setCurrentGuess((prev) => (prev + event.key.toLowerCase()).slice(0, dailyName.length));
            }
        }
    };

    const handleKeyPress = (key: string) => {
        if (gameStatus !== 'playing') return;

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
        } else if (key === 'Enter' && currentGuess.length === dailyName.length) {
            handleGuess();
        } else if (key.length === 1 && key.match(/[a-ząćęłńóśźż]/i)) {
            if (currentGuess.length < dailyName.length) {
                setCurrentGuess((prev) => (prev + key.toLowerCase()).slice(0, dailyName.length));
            }
        }
    };

    const handleGuess = () => {
        const newGuesses = [...guesses, currentGuess];
        setGuesses(newGuesses);

        const result = validateGuess(currentGuess, dailyName);
        const newUsedLetters = { ...usedLetters };
        currentGuess.split('').forEach((letter, index) => {
            const lowerLetter = letter.toLowerCase();
            if (result[index] === 'correct') {
                newUsedLetters[lowerLetter] = 'correct';
            } else if (result[index] === 'misplaced' && newUsedLetters[lowerLetter] !== 'correct') {
                newUsedLetters[lowerLetter] = 'misplaced';
            } else if (result[index] === 'incorrect' && !newUsedLetters[lowerLetter]) {
                newUsedLetters[lowerLetter] = 'incorrect';
            }
        });
        setUsedLetters(newUsedLetters);

        setCurrentGuess('');

        if (currentGuess.toLowerCase() === dailyName.toLowerCase()) {
            setGameStatus('won');
        } else if (newGuesses.length >= 6) {
            setGameStatus('lost');
        }
    };

    return (
        <div className="mt-4 flex flex-col items-center">
            <GameBoard guesses={guesses} currentGuess={currentGuess} dailyName={dailyName} gameStatus={gameStatus} />
            <Keyboard onKeyPress={handleKeyPress} usedLetters={usedLetters} />
        </div>
    );
}
