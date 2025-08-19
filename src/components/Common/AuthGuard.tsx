// Third-party dependencies
import { useEffect, type ReactNode } from "react";

// Current project dependencies
import useAuth from "../../hooks/useAuth.tsx";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { fetchMainUser, loading, user } = useAuth();

  useEffect(() => {
    fetchMainUser();
  }, [fetchMainUser, window.location.pathname]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/login";
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600 dark:text-gray-300">
        Cargando...
      </div>
    );
  }

  return <>{children}</>;
}
