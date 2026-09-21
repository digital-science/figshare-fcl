import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { wait } from "../testing/wait";
import { renderHook } from "../testing/renderHook";

import { useCopyToClipboard } from "./useCopyToClipboard";
import { TestScope } from "../../../types/testing";


describe("useCopyToClipboard hook", () => {
  function setup() {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      writable: true,
      configurable: true,
    });

    const scope: TestScope = {
      props: ["copied-text", 100] as [string, number],
      copyAPI: jest.spyOn(navigator.clipboard, "writeText"),
    };

    scope.run = () => renderHook(useCopyToClipboard, { initialProps: scope.props });

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("should allow copying some value to clipboard", async() => {
    const scope = setup();

    const { result } = scope.run();
    const [copied, onCopy] = result.current;
    expect(copied).toBe(false);
    await act(async() => {
      onCopy();
      await wait(200);
    });
    expect(scope.copyAPI).toHaveBeenCalled();

    teardown();
  });

  it("should not throw if api is not available", async() => {
    const scope = setup();
    scope.copyAPI.mockImplementation(() => {
      throw new Error("navigator.clipboard not available");
    });
    const { result } = scope.run();
    const [copied, onCopy] = result.current;
    expect(copied).toBe(false);
    await act(async() => {
      onCopy();
      await wait(200);
    });
    expect(scope.copyAPI).toHaveBeenCalled();

    teardown();
  });
});
