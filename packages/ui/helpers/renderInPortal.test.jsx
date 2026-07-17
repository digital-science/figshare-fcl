import React from "react";
import { render, cleanup, act } from "@testing-library/react";

import RenderInPortal from "./renderInPortal";


describe("<RenderInPortal />", () => {
  function setup() {
    const scope = { props: { children: "MyChildren" } };
    scope.run = () => {
      scope.wrapper = render(<RenderInPortal {...scope.props} />);
    };

    return scope;
  }

  function teardown() {
    cleanup();
  }

  it("correctly applies document eventListeners", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");
    const scope = setup();
    scope.run();

    expect(addSpy).toHaveBeenCalledWith("fullscreenchange", expect.any(Function));

    scope.wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("fullscreenchange", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
    teardown();
  });

  it("renders children into the portal", () => {
    const scope = setup();
    scope.run();

    expect(document.body.textContent).toContain("MyChildren");

    teardown();
  });

  it("updates portal on fullscreen change", () => {
    const scope = setup();
    scope.run();

    act(() => {
      document.fullscreenElement = null;
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(document.body.textContent).toContain("MyChildren");

    teardown();
  });
});
