import React from 'react';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const Keyboard = ({ guessLetter, guessedLetters }) => {
    return (
        <div className="keyboard">
            {letters.map((letter) => (
                <button
                    key={letter}
                    onClick={() => guessLetter(letter)}
                    disabled={guessedLetters.includes(letter)}
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default Keyboard;
