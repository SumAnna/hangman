import React from 'react';

const WordDisplay = ({ word, guessedLetters }) => {
    return (
        <div className="word-display">
            {word.split('').map((letter, idx) => (
                <span key={idx} className="letter">
          {guessedLetters.includes(letter) ? letter : '\u00A0'}
        </span>
            ))}
        </div>
    );
};

export default WordDisplay;
