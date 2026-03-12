import { useQuery } from '@tanstack/react-query';

export function useValidateUser(token: string | null) {
  return useQuery({
    queryKey: [token],
    queryFn: () =>
      fetch('http://localhost:3000/api/auth/validate-token', {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    enabled: !!token,
  });
}
