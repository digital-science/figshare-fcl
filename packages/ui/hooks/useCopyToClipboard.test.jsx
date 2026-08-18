import { renderHook, cleanup, act } from "@testing-library/react-hooks";
import { wait } from "@apollo/client/testing";

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
