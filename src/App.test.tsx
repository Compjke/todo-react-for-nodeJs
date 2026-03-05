import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import App from './App';
import { AuthProvider } from './components/Providers/AuthProvider/AuthProvider';

describe('App', () => {
  it('renders hello text', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>,
    );
    expect(screen.getByText(/SIMPLE TODO APP/i)).toBeInTheDocument();
  });
});
