import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/api/client";

interface ApiResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

// Shared by every tab that lists or reloads a patient's records — fetch,
// loading and error handling were about to be copy-pasted four times.
export function useApiResource<T>(fetcher: () => Promise<T>, deps: unknown[]): ApiResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then((result) => setData(result))
      .catch((err: unknown) => setError(err instanceof ApiError ? err.message : "Something went wrong."))
      .finally(() => setLoading(false));
    // fetcher is intentionally excluded — callers pass a fresh closure each
    // render and depend on `deps` instead to control when it re-runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, reload };
}
