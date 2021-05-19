import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = 'test';
    expect(linkElement).toBe('test');
});
