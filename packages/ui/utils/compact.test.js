import { compact } from "./compact";


describe("compact(collection)", () => {
  it("filters out falsy entries from arrays or objects", () => {
    expect(compact([0, "", null, 10, undefined, "defined"])).toEqual([10, "defined"]);
    expect(compact({ a: 0, b: "defined", c: null, d: "" })).toEqual({ b: "defined" });
    expect(compact("")).toEqual("");
    expect(compact(0)).toEqual(0);
    expect(compact(1)).toEqual(1);
    expect(compact(null)).toEqual(null);
  });

  it("accepts a filter function as a second argument, provides a set in 'compact.filters' ", () => {
    expect(compact([0, "", null, 10, undefined, "defined"], compact.filters.nullish)).toEqual([0, "", 10, "defined"]);
    expect(compact(
      { a: 0, b: "defined", c: null, d: "" },
      compact.filters.nullish)
    ).toEqual({ a: 0, b: "defined", d: "" });
    expect(compact("", compact.filters.nullish)).toEqual("");
    expect(compact([0, "", null, 10, undefined, "defined"], compact.filters.definedString)).toEqual([0, 10, "defined"]);
  });
});
