import { useQuery } from '@tanstack/react-query';

export function useHello() {
  return useQuery({
    queryKey: ['hello'],
    queryFn: () =>
      fetch('http://localhost:3000/api/hello').then((res) => res.json()),
  });
}
