// Third-party dependencies
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";

// Current project dependencies
import type { User } from "../schemas/user.ts";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchMainUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    const source = axios.CancelToken.source();

    try {
      const response = await axios.get("/api/users/me", {
        withCredentials: true,
        cancelToken: source.token,
      });

      setUser(response.data?.data || null);
    } catch (err: unknown) {
      if (!axios.isCancel(err)) {
        setError(err as AxiosError);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      source.cancel("Request canceled by cleanup");
    };
  }, []);

  useEffect(() => {
    fetchMainUser();
  }, [fetchMainUser]);

  return { user, loading, error, fetchMainUser };
}
