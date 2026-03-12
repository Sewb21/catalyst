import type { AuthContext } from '@/context/auth';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});
