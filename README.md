# Hangman Mini Game

A browser-based Hangman game built with React (via Vite) and a backend powered by Express and OpenAI's GPT. The game generates random 6-letter English nouns using OpenAI's GPT-3.5-turbo model.

## Features

- Random 6-letter word generation using OpenAI
- Hangman gameplay with keyboard input
- Session-based game limit (3 per player)
- IP restriction logic (can whitelist IPs)
- Fun & challenging, powered by AI
- Remembers attempts in sessionStorage, localStorage, and cookies

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **AI**: OpenAI GPT-3.5-Turbo API
- **Styling**: CSS Modules

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/hangman-ai.git
cd hangman-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Rename the .env_local file to .env:
```bash
mv .env_local .env
```
Then, open the .env file and populate it with your actual values.

### 4. Run the app
In one terminal, run the backend:
```bash
node server.js
```
In another terminal, start the frontend with Vite:
```bash
npm run dev

```
