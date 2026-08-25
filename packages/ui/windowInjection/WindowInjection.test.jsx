import React from "react";
import { render } from "@testing-library/react";

import { WindowInjection } from "./WindowInjection";


describe("<WindowInjection />", () => {
  const data = { foo: 1, bar: "foobar" };
  const globalName = "__test__";

  afterEach(() => {
    delete window[globalName];
  });

  it("renders null when required props are falsy", () => {
    const consoleSpy = jest.spyOn(console, "error");
    consoleSpy.mockImplementation(() => undefined);

    const { container: container1 } = render(<WindowInjection />);
    expect(container1.firstChild).toBeNull();

    const { container: container2 } = render(<WindowInjection data={null} />);
    expect(container2.firstChild).toBeNull();

    const { container: container3 } = render(<WindowInjection data={data} />);
    expect(container3.firstChild).toBeNull();

    const { container: container4 } = render(<WindowInjection globalName="" />);
    expect(container4.firstChild).toBeNull();

    const { container: container5 } = render(
      <WindowInjection globalName={globalName} />
    );
    expect(container5.firstChild).toBeNull();

    const { container: container6 } = render(
      <WindowInjection data={data} globalName="" />
    );
    expect(container6.firstChild).toBeNull();

    const { container: container7 } = render(
      <WindowInjection data={null} globalName={globalName} />
    );
    expect(container7.firstChild).toBeNull();

    consoleSpy.mockRestore();
  });

  it("renders a script tag", () => {
    const { container } = render(
      <WindowInjection data={data} globalName={globalName} />
    );

    expect(container.querySelector("script")).toBeInTheDocument();
  });

  it("injects data in window", () => {
    const { container } = render(
      <WindowInjection data={data} globalName={globalName} />
    );

    const script = container.querySelector("script");

    /* eslint-disable-next-line no-eval */
    eval(script.innerHTML);

    expect(window[globalName]).toEqual(data);
  });

  it("supports custom nonce attribute", () => {
    const nonce = "test-nonce-123";
    const { container } = render(
      <WindowInjection data={data} globalName={globalName} nonce={nonce} />
    );

    const script = container.querySelector("script");
    expect(script).toHaveAttribute("nonce", nonce);
  });

  it("defaults isJSON to true", () => {
    const { container } = render(
      <WindowInjection data={data} globalName={globalName} />
    );

    const script = container.querySelector("script");
    expect(script).toBeInTheDocument();
  });

  it("safely escapes globalName with special characters", () => {
    const unsafeGlobalName = "a-b.c";
    const { container } = render(
      <WindowInjection data={data} globalName={unsafeGlobalName} />
    );

    const script = container.querySelector("script");

    /* eslint-disable-next-line no-eval */
    eval(script.innerHTML);

    expect(window[unsafeGlobalName]).toEqual(data);
  });
});
