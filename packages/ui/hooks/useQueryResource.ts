import React from "react";
import { getIn } from "../utils/getIn";


type useQueryResourceArgs<D = any> = {
  query: any;
  path?: string;
  default?: D;
  parser?: (data: any, query: any, defaultValue: D) => D;
  persist?: boolean;
};

export type QueryResource<D = any> = {
  status: "idle" | "loading" | "error" | "data";
  data: D;
  original: {
    data: any;
    previousData: any;
  };
  error: any;
  loading: boolean;
};

/** Generic parsing function that simply returns the data as-is */
function genericParser(data) {
  return data;
}

/**
 * A hook to parse the result of a query into a resource-like object
 * with `status`, `data` and `error` properties.
 */
export function useQueryResource<D = any>({
  query,
  path: providedPath,
  default: providedDefaultValue,
  parser: providedParser,
  persist = false,
}: useQueryResourceArgs<D>) {
  const { loading, data, previousData, error } = query;

  const refs = React.useRef({ path: undefined, parser: undefined, defaultValue: undefined });
  // maintain refs to avoid re-running the parser on non important changes
  refs.current.path = providedPath;
  refs.current.defaultValue = providedDefaultValue;
  refs.current.parser = providedParser ?? genericParser;

  const status = React.useMemo(() => {
    if (data) return "data";
    if (persist && previousData) return "data";

    if (loading) return "loading";
    if (error) return "error";

    return "idle";
  }, [persist, data, previousData, loading, error]);

  const parsed = React.useMemo(() => {
    const { path, parser, defaultValue } = refs.current;
    const usedData = data ?? (persist ? previousData : undefined);

    // path array or string is provided, use it to extract data
    if (path) {
      const cleanPath = path.startsWith("data.") ? path.slice(5) : path;

      return getIn(usedData, cleanPath, defaultValue);
    }

    return parser(usedData, query, defaultValue);
  }, [query.data, query.previousData, refs]);

  return React.useMemo(() => {
    return { status, data: parsed as D, original: { data, previousData }, error, loading };
  }, [status, parsed, error, loading]) as QueryResource<D>;
}

export function useCombineResourceStatus(...resources) {
  return React.useMemo(() => {
    if (resources.some((r) => r.status === "error")) return "error";
    if (resources.some((r) => r.status === "loading")) return "loading";
    if (resources.some((r) => r.status === "idle")) return "idle";

    return "data";
  }, [resources]);
}

export default useQueryResource;

