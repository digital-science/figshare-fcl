import { cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { wait } from "@apollo/client/testing";

import { renderHook } from "../testing/renderHook";

import { useCopyToClipboard } from "./useCopyToClipboard";


describe("useCopyToClipboard hook", () => {
  function setup() {
    const scope = {
      props: ["copied-text", 100],
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

    teardown(scope);
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

    teardown(scope);
  });
});
