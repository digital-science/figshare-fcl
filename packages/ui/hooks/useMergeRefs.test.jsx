
import { assignRef, useMergeRefs } from "./useMergeRefs";


describe("assignRef()", () => {
  it("does nothing when ref is null", () => {
    expect(() => assignRef(null, "value")).not.toThrow();
  });

  it("does nothing when ref is undefined", () => {
    expect(() => assignRef(undefined, "value")).not.toThrow();
  });

  it("calls a function ref with the provided value", () => {
    const fnRef = jest.fn();
    assignRef(fnRef, "hello");

    expect(fnRef).toHaveBeenCalledWith("hello");
  });

  it("returns the result of calling a function ref", () => {
    const cleanup = jest.fn();
    const fnRef = jest.fn(() => cleanup);
    const result = assignRef(fnRef, "hello");

    expect(result).toBe(cleanup);
  });

  it("sets current on an object ref", () => {
    const ref = { current: null };
    assignRef(ref, "hello");

    expect(ref.current).toBe("hello");
  });

  it("throws an error when the object ref is not writable", () => {
    const ref = {};

    Object.defineProperty(ref, "current", {
      get: () => null,
      set: () => {
        throw new Error("read-only");
      },
    });

    expect(() => assignRef(ref, "value")).toThrow("Cannot assign value 'value' to ref");
  });
});


describe("useMergeRefs() — React 18 path", () => {
  it("returns a function", () => {
    const ref = { current: null };
    expect(typeof useMergeRefs(ref)).toBe("function");
  });

  it("callback does not return a value (no cleanup in React 18)", () => {
    const ref = { current: null };
    const merged = useMergeRefs(ref);
    const result = merged(document.createElement("div"));

    expect(result).toBeUndefined();
  });

  it("assigns the node to a single object ref", () => {
    const ref = { current: null };
    const node = document.createElement("div");
    const merged = useMergeRefs(ref);
    merged(node);

    expect(ref.current).toBe(node);
  });

  it("assigns the node to multiple object refs", () => {
    const ref1 = { current: null };
    const ref2 = { current: null };
    const node = document.createElement("div");
    const merged = useMergeRefs(ref1, ref2);
    merged(node);

    expect(ref1.current).toBe(node);
    expect(ref2.current).toBe(node);
  });

  it("calls function refs with the node", () => {
    const fnRef = jest.fn();
    const node = document.createElement("div");
    const merged = useMergeRefs(fnRef);
    merged(node);

    expect(fnRef).toHaveBeenCalledWith(node);
  });

  it("handles a mix of object and function refs", () => {
    const objRef = { current: null };
    const fnRef = jest.fn();
    const node = document.createElement("div");
    const merged = useMergeRefs(objRef, fnRef);
    merged(node);

    expect(objRef.current).toBe(node);
    expect(fnRef).toHaveBeenCalledWith(node);
  });

  it("filters out null refs", () => {
    const ref = { current: null };
    const node = document.createElement("div");
    const merged = useMergeRefs(null, ref);
    merged(node);

    expect(ref.current).toBe(node);
  });

  it("filters out undefined refs", () => {
    const ref = { current: null };
    const node = document.createElement("div");
    const merged = useMergeRefs(undefined, ref);
    merged(node);

    expect(ref.current).toBe(node);
  });

  it("returns a no-op when called with no refs", () => {
    const merged = useMergeRefs();
    expect(() => merged(document.createElement("div"))).not.toThrow();
  });
});


describe("useMergeRefs() — React 19 path", () => {
  const v19 = { useMergeRefs: null };

  beforeAll(() => {
    jest.isolateModules(() => {
      jest.mock("react", () => {
        return { ...jest.requireActual("react"), version: "19.0.0" };
      });
      v19.useMergeRefs = require("./useMergeRefs").useMergeRefs;
    });
  });

  it("callback returns a cleanup function", () => {
    const ref = { current: null };
    const merged = v19.useMergeRefs(ref);
    const cleanup = merged(document.createElement("div"));

    expect(typeof cleanup).toBe("function");
  });

  it("cleanup nullifies object refs", () => {
    const ref = { current: null };
    const merged = v19.useMergeRefs(ref);
    const cleanup = merged(document.createElement("div"));

    expect(ref.current).not.toBeNull();
    cleanup();
    expect(ref.current).toBeNull();
  });

  it("cleanup calls the cleanup returned by a function ref", () => {
    const fnCleanup = jest.fn();
    const fnRef = jest.fn(() => fnCleanup);
    const merged = v19.useMergeRefs(fnRef);
    const cleanup = merged(document.createElement("div"));
    cleanup();

    expect(fnCleanup).toHaveBeenCalled();
  });

  it("cleanup falls back to nullifying a function ref when it returns no cleanup", () => {
    const fnRef = jest.fn();
    const merged = v19.useMergeRefs(fnRef);
    const cleanup = merged(document.createElement("div"));
    cleanup();

    expect(fnRef).toHaveBeenCalledWith(null);
  });
});
