const Filters = {
  "falsy": (value) => (value !== "") && (value !== undefined) && (value !== null) && (value !== 0),
  "nullish": (value) => (value !== undefined) && (value !== null),
  "definedString": (value) => value !== undefined && (value !== null) && value !== "",
};


export function compact(collection, hasValue = Filters.falsy) {
  if (Array.isArray(collection)) {
    return collection.filter(hasValue);
  }

  if (typeof collection === "object" && collection !== null) {
    return Object.entries(collection).reduce(((compacted, [key, value]) => {
      if (hasValue(value)) {
        compacted[key] = value;
      }

      return compacted;
    }), {});
  }

  return collection;
}

compact.filters = Filters;

export default compact;
