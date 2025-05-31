import React, { useState, useEffect, useRef } from 'react';
import Keyboard from './Keyboard.jsx';
import WordDisplay from './WordDisplay.jsx';
import './Hangman.css';
import HangmanBody from "./HangmanBody.jsx";

const COOKIE_NAME = 'hangman_restricted';
const LOCALSTORAGE_KEY = 'hangman_restricted';
const maxGamesPerIP = 3;

const Hangman = () => {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [gameId, setGameId] = useState(0);
    const [restricted, setRestricted] = useState(false);
    const [ip, setIP] = useState('');
    const [ipAttempts, setIpAttempts] = useState({});

    const hasFetchedIP = useRef(false);

    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    };

    const getCookie = (name) => {
        return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
    };

    // Fetch IP + Restriction check
    useEffect(() => {
        const fetchIP = async () => {
            if (hasFetchedIP.current) return;
            hasFetchedIP.current = true;

            try {
                const res = await fetch('https://api.ipify.org?format=json');
                const data = await res.json();
                setIP(data.ip);

                const whitelist = import.meta.env.VITE_WHITELISTED_IPS?.split(',') || [];
                console.log(whitelist.includes(data.ip));
                const cookieRestricted = getCookie(COOKIE_NAME) === 'true';
                const localRestricted = localStorage.getItem(LOCALSTORAGE_KEY) === 'true';

                const stored = sessionStorage.getItem('ipAttempts');
                const attempts = stored ? JSON.parse(stored) : {};

                if (!whitelist.includes(data.ip)) {
                    if ((cookieRestricted || localRestricted)) {
                        setRestricted(true);
                    } else if (attempts[data.ip] >= maxGamesPerIP) {
                        setRestricted(true);
                    }
                }

                setIpAttempts(attempts);
            } catch (error) {
                console.error('Failed to fetch IP:', error);
            }
        };

        fetchIP();
    }, []);

    // Fetch new word
    useEffect(() => {
        const fetchWord = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/word`);
                const data = await res.json();
                setWord(data.word);
                setGuessedLetters([]);
                setWrongGuesses(0);
            } catch (error) {
                console.error('Error fetching word:', error);
            }
        };

        if (!restricted) fetchWord();
    }, [gameId, restricted]);

    // Game logic
    const guessLetter = (letter) => {
        if (guessedLetters.includes(letter)) return;
        setGuessedLetters([...guessedLetters, letter]);

        if (!word.includes(letter)) {
            setWrongGuesses(prev => prev + 1);
        }
    };

    const isWinner = word && word.split('').every(letter => guessedLetters.includes(letter));
    const isGameOver = wrongGuesses >= 6;

    // Track attempt only AFTER game ends
    useEffect(() => {
        if ((isWinner || isGameOver) && ip && !restricted) {
            const newAttempts = { ...ipAttempts };
            if (!newAttempts[ip]) newAttempts[ip] = 0;

            if (newAttempts[ip] < maxGamesPerIP) {
                newAttempts[ip] += 1;
                setIpAttempts(newAttempts);
                sessionStorage.setItem('ipAttempts', JSON.stringify(newAttempts));

                if (newAttempts[ip] >= maxGamesPerIP) {
                    setRestricted(true);
                    setCookie(COOKIE_NAME, 'true', 30);
                    localStorage.setItem(LOCALSTORAGE_KEY, 'true');
                }
            }
        }
    }, [isWinner, isGameOver]);

    const resetGame = () => {
        setGameId(prev => prev + 1);
    };

    if (restricted) {
        return (
            <div className="restriction-message">
                <p className="status-message lose">You have reached the maximum number of games allowed from your IP.</p>
            </div>
        );
    }

    return (
        <div className="hangman">
            <h1>Hangman</h1>
            <HangmanBody wrongGuesses={wrongGuesses} />
            <p>Wrong Guesses: {wrongGuesses} / 6</p>

            {word && <WordDisplay word={word} guessedLetters={guessedLetters} />}

            {isWinner && <p className="status-message win">You Win!</p>}
            {isGameOver && <p className="status-message lose">Game Over! The word was: {word}</p>}

            {(isWinner || isGameOver) && (
                <button className="reset-button" onClick={resetGame}>
                    Play Again!
                </button>
            )}

            {!isWinner && !isGameOver && word && (
                <Keyboard guessLetter={guessLetter} guessedLetters={guessedLetters} />
            )}
        </div>
    );
};

export default Hangman;
