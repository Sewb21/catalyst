import { useMutation } from '@tanstack/react-query';

interface LoginOptions {
  onSuccess: (token: string) => void;
}

export function useLogin({ onSuccess }: LoginOptions) {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? 'Login failed');
      }
      return await res.json();
    },
    onSuccess: (data) => onSuccess(data.token),
  });
}
