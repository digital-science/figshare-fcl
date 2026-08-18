const PREDICATES = {
  nonEmptyString: "non-empty-string",
  nonEmptyArray: "non-empty-array",
  truthy: "truthy",
};

// This utility is used to safely access nested properties in an object,
// with support for default fallback values and custom predicates for result validation and fallback assignment.
// The `getIn` function takes an object, a path (as a string or array), a fallback value,
// and an optional predicate function to determine how to handle the result. It traverses
// the object based on the provided path and returns the value found at that path, or the fallback
// value if the path does not exist or if the result does not meet the specified predicate criteria.
export function getIn(object, path, fallback, predicate) {
  if (!path?.length || typeof object !== "object") {
    return fallback;
  }

  const keys = Array.isArray(path) ? path : (path.match(/(\w*)/g)).filter((word) => word !== "");

  const result = keys.reduce((branch, key) => branch?.[key], object);

  // Apply predicate logic if a predicate value is provided
  if (predicate) {
    switch (predicate) {
      case PREDICATES.nonEmptyString:
        return typeof result === "string" && result.length > 0 ? result : fallback;
      case PREDICATES.nonEmptyArray:
        return Array.isArray(result) && result.length > 0 ? result : fallback;
      case PREDICATES.truthy:
        return result || fallback;
      default: {
        if (typeof predicate === "function") {
          return predicate(result, fallback, object, path);
        }

        return result ?? fallback;
      }
    }
  }

  // Return the result if it is non-null/undefined, otherwise return the fallback
  return result ?? fallback;
}

getIn.predicates = PREDICATES;

export default getIn;
