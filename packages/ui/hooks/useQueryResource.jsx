import React from "react";

import { getIn } from "../utils/getIn";


function genericParser(data) {
  return data;
}

/**
 * A hook to parse the result of a query into a resource-like object
 * with `status`, `data` and `error` properties.
 */
export function useQueryResource({
  query,
  path: providedPath,
  default: providedDefaultValue,
  parser: providedParser,
  persist = false,
}) {
  const { loading, data, previousData, error } = query;

  const refs = React.useRef({ path: undefined, parser: undefined });
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
    return { status, data: parsed, original: { data, previousData }, error };
  }, [status, parsed, error]);
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

