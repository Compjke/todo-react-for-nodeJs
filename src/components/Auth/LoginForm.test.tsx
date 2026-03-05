// src/components/Auth/LoginForm.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { AuthProvider } from '../Providers/AuthProvider/AuthProvider';
import { LoginForm } from './LoginForm';

vi.mock('../../context/AuthContext', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('../../context/AuthContext')>();
  return {
    ...actual,
    useAuth: () => ({
      loginUser: vi.fn().mockResolvedValue(undefined),
    }),
  };
});

describe('LoginForm', () => {
  it('renders form fields', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    const { getByText, findByText } = render(
      <MemoryRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </MemoryRouter>,
    );

    fireEvent.click(getByText('Login'));

    expect(await findByText('Please enter your username')).toBeInTheDocument();
    expect(await findByText('Please enter your password')).toBeInTheDocument();
  });
});
