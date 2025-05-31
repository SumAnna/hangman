import React from 'react';

const HangmanBody = ({ wrongGuesses }) => {
    return (
        <svg height="250" width="200" className="hangman-figure">
            {/* Stand */}
            <line className="beam" x1="60" y1="20" x2="140" y2="20" />
            <line className="beam" x1="60" y1="20" x2="60" y2="230" />
            <line className="beam" x1="20" y1="230" x2="100" y2="230" />
            <line className="beam" x1="140" y1="20" x2="140" y2="50" />

            {/* Head */}
            <circle className={`part ${wrongGuesses > 0 ? 'visible' : ''}`} cx="140" cy="70" r="20" />

            {/* Body */}
            <line className={`part ${wrongGuesses > 1 ? 'visible' : ''}`} x1="140" y1="90" x2="140" y2="150" />

            {/* Arms */}
            <line className={`part ${wrongGuesses > 2 ? 'visible' : ''}`} x1="140" y1="110" x2="110" y2="100" />
            <line className={`part ${wrongGuesses > 3 ? 'visible' : ''}`} x1="140" y1="110" x2="170" y2="100" />

            {/* Legs */}
            <line className={`part ${wrongGuesses > 4 ? 'visible' : ''}`} x1="140" y1="150" x2="120" y2="190" />
            <line className={`part ${wrongGuesses > 5 ? 'visible' : ''}`} x1="140" y1="150" x2="160" y2="190" />

            {/* Eyes */}
            {wrongGuesses > 5 && (
                <>
                    <line className="eye" x1="130" y1="60" x2="135" y2="65" />
                    <line className="eye" x1="135" y1="60" x2="130" y2="65" />
                    <line className="eye" x1="145" y1="60" x2="150" y2="65" />
                    <line className="eye" x1="150" y1="60" x2="145" y2="65" />
                </>
            )}
        </svg>
    );
};

export default HangmanBody;
