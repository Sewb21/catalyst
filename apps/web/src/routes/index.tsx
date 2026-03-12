import { createFileRoute } from '@tanstack/react-router';
import { useHello } from '@/lib/hooks/data/useHello';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data, isLoading } = useHello();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">My App</h1>
        <p className="text-muted-foreground">
          {isLoading ? 'Loading...' : data?.message}
        </p>
      </div>
    </div>
  );
}
