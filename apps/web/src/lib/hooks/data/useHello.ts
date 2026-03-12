import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';

export function useHello() {
  return useQuery({
    queryKey: ['hello'],
    queryFn: () => apiFetch('/api/hello').then((res) => res.json()),
  });
}
