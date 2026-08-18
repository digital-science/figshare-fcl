import getIn from "./getIn";


describe("getIn", () => {
  const test = {
    a: [{ complex: [{ boolean: true }], word: "found", b: 1, c: undefined }],
    // eslint-disable-next-line camelcase
    snake_cased: { list: [{ id: 0 }] },
  };

  it("returns values from an object at a given path", () => {
    expect(getIn(test, "a[0].b")).toEqual(1);
    expect(getIn(test, "a[0].complex")).toEqual(test.a[0].complex);
    expect(getIn(test, "a[0].complex.boolean")).toEqual(test.a[0].complex.boolean);
    expect(getIn(test, "a[0].word")).toEqual("found");
    expect(getIn(test, "snake_cased.list[0].id")).toEqual(0);
    expect(getIn(test, ["a", 0, "complex"])).toEqual(test.a[0].complex);
  });

  it("defaults to a fallback if value is not found", () => {
    expect(getIn(test, "a.[0].c", "fallback value")).toEqual("fallback value");
    expect(getIn(test, "a.nonexistent.path", "fallback value")).toEqual("fallback value");
    expect(getIn(test, "", "fallback value")).toEqual("fallback value");
  });

  it("defaults to a fallback if object is not traversable or the path is not given", () => {
    expect(getIn(undefined, "", "fallback value")).toEqual("fallback value");
    expect(getIn(undefined, null, "fallback value")).toEqual("fallback value");
  });

  describe("predicates", () => {
    describe("nonEmptyString", () => {
      it("returns the value when it is a non-empty string", () => {
        expect(getIn(test, "a[0].word", "fallback", getIn.predicates.nonEmptyString)).toEqual("found");
      });

      it("returns the fallback when the value is an empty string", () => {
        const obj = { val: "" };
        expect(getIn(obj, "val", "fallback", getIn.predicates.nonEmptyString)).toEqual("fallback");
      });

      it("returns the fallback when the value is not a string", () => {
        expect(getIn(test, "a[0].b", "fallback", getIn.predicates.nonEmptyString)).toEqual("fallback");
      });

      it("returns the fallback when the value is undefined", () => {
        expect(getIn(test, "a[0].c", "fallback", getIn.predicates.nonEmptyString)).toEqual("fallback");
      });
    });

    describe("nonEmptyArray", () => {
      it("returns the value when it is a non-empty array", () => {
        expect(getIn(test, "a[0].complex", "fallback", getIn.predicates.nonEmptyArray)).toEqual(test.a[0].complex);
        expect(getIn(test, "a", "fallback", getIn.predicates.nonEmptyArray)).toEqual(test.a);
      });

      it("returns the fallback when the value is an empty array", () => {
        const obj = { arr: [] };
        expect(getIn(obj, "arr", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
      });

      it("returns the fallback when the value is not an array", () => {
        expect(getIn(test, "a[0].b", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
        expect(getIn(test, "a[0].word", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
      });

      it("returns the fallback when the value is null or undefined", () => {
        expect(getIn(test, "a[0].c", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
        const obj = { nil: null };
        expect(getIn(obj, "nil", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
      });

      it("returns the fallback when the value is a string or object (not an array)", () => {
        const obj = { str: "not an array", obj: { key: "value" } };
        expect(getIn(obj, "str", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
        expect(getIn(obj, "obj", "fallback", getIn.predicates.nonEmptyArray)).toEqual("fallback");
      });
    });

    describe("truthy", () => {
      it("returns the value when it is truthy", () => {
        expect(getIn(test, "a[0].b", "fallback", getIn.predicates.truthy)).toEqual(1);
        expect(getIn(test, "a[0].word", "fallback", getIn.predicates.truthy)).toEqual("found");
      });

      it("returns the fallback when the value is falsy", () => {
        const obj = { zero: 0, empty: "", nil: null };
        expect(getIn(obj, "zero", "fallback", getIn.predicates.truthy)).toEqual("fallback");
        expect(getIn(obj, "empty", "fallback", getIn.predicates.truthy)).toEqual("fallback");
        expect(getIn(obj, "nil", "fallback", getIn.predicates.truthy)).toEqual("fallback");
      });

      it("returns the fallback when the value is undefined", () => {
        expect(getIn(test, "a[0].c", "fallback", getIn.predicates.truthy)).toEqual("fallback");
      });
    });

    describe("defined (default)", () => {
      it("returns the value when it is defined, including falsy values like 0 or false", () => {
        expect(getIn(test, "a[0].b", "fallback")).toEqual(1);
        const obj = { zero: 0, flag: false };
        expect(getIn(obj, "zero", "fallback")).toEqual(0);
        expect(getIn(obj, "flag", "fallback")).toEqual(false);
      });

      it("returns the fallback when the value is null or undefined", () => {
        expect(getIn(test, "a[0].c", "fallback")).toEqual("fallback");
        const obj = { nil: null };
        expect(getIn(obj, "nil", "fallback")).toEqual("fallback");
      });
    });

    describe("custom function predicate", () => {
      it("calls the predicate with (result, fallback, object, path) and returns its return value", () => {
        const predicate = jest.fn(() => "custom");
        const result = getIn(test, "a[0].b", "fallback", predicate);
        expect(predicate).toHaveBeenCalledWith(1, "fallback", test, "a[0].b");
        expect(result).toEqual("custom");
      });

      it("uses the predicate return value even when the path result is undefined", () => {
        const predicate = jest.fn((val) => (val !== undefined ? val : "from-predicate"));
        expect(getIn(test, "a[0].c", "fallback", predicate)).toEqual("from-predicate");
      });
    });
  });
});
