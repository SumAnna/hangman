import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders hangman title', () => {
    render(<App />);
    expect(screen.getByText(/hangman/i)).toBeInTheDocument();
});
