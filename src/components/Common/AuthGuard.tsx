// Third-party dependencies
import { useEffect } from "react";

// Current project dependencies
import useAuth from "../../hooks/useAuth.tsx";

export default function AuthGuard() {
  const { fetchMainUser, loading, user } = useAuth();

  useEffect(() => {
    fetchMainUser();
  }, [fetchMainUser, window.location.pathname]);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/auth/login";
    }
  }, [loading, user]);

  return null;
}
