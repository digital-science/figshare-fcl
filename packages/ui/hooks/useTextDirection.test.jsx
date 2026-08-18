/* eslint-disable max-len */
import React, { useEffect } from "react";
import { render, cleanup } from "@testing-library/react";

import { useTextDirection } from "./useTextDirection";


jest.mock("@digital-science/figshare-fcl/input/text/utils", () => {
  return { getTextDirection: jest.fn() };
});

jest.mock("@digital-science/figshare-fcl/textEditor/Lexical/utils", () => {
  return { stripHtmlTags: jest.fn((text) => text.replace(/(<([^>]+)>)/gi, "")) };
});


const { getTextDirection } = require("@digital-science/figshare-fcl/input/text/utils");
const { stripHtmlTags } = require("@digital-science/figshare-fcl/textEditor/Lexical/utils");


describe("useTextDirection()", () => {
  const hookRef = { current: undefined };

  beforeEach(() => {
    getTextDirection.mockReset();
    stripHtmlTags.mockClear();
  });

  function Fixture({ value, inferDirection, providedRef }) {
    const result = useTextDirection({ children: value, inferDirection, ref: providedRef });

    useEffect(() => {
      hookRef.current = result;
    });

    return (
      <div ref={result.props.ref}>
        {typeof value !== "string" ? value : null}
      </div>
    );
  }

  function teardown() {
    hookRef.current = undefined;
    cleanup();
  }

  it("returns a callback ref in props", () => {
    getTextDirection.mockReturnValue("ltr");

    render(<Fixture value="Hello world" />);

    expect(typeof hookRef.current.props.ref).toBe("function");

    teardown();
  });

  it("sets dir=ltr and includes it in props when getTextDirection returns ltr", () => {
    getTextDirection.mockReturnValue("ltr");

    render(<Fixture value="Hello world" />);

    expect(hookRef.current.dir).toBe("ltr");
    expect(hookRef.current.props.dir).toBe("ltr");

    teardown();
  });

  it("sets dir=rtl and includes it in props when getTextDirection returns rtl", () => {
    getTextDirection.mockReturnValue("rtl");

    render(<Fixture value="\u0645\u0631\u062D\u0628\u0627" />);

    expect(hookRef.current.dir).toBe("rtl");
    expect(hookRef.current.props.dir).toBe("rtl");

    teardown();
  });

  it("passes the value through stripHtmlTags before calling getTextDirection", () => {
    stripHtmlTags.mockReturnValue("stripped content");
    getTextDirection.mockReturnValue("ltr");

    render(<Fixture value="<b>some text</b>" />);

    expect(stripHtmlTags).toHaveBeenCalledWith("<b>some text</b>");
    expect(getTextDirection).toHaveBeenCalledWith("stripped content");

    teardown();
  });

  it("does not set dir when inferDirection is false", () => {
    getTextDirection.mockReturnValue("rtl");

    render(<Fixture value="\u0645\u0631\u062D\u0628\u0627" inferDirection={false} />);

    expect(hookRef.current.dir).toBeUndefined();
    expect(hookRef.current.props.dir).toBeUndefined();
    expect(getTextDirection).not.toHaveBeenCalled();

    teardown();
  });

  it("does not set dir when value is an empty string", () => {
    render(<Fixture value="" />);

    expect(hookRef.current.dir).toBeUndefined();
    expect(getTextDirection).not.toHaveBeenCalled();

    teardown();
  });

  it("does not set dir when value is undefined and the ref element has no text", () => {
    render(<Fixture value={undefined} />);

    expect(hookRef.current.dir).toBeUndefined();
    expect(getTextDirection).not.toHaveBeenCalled();

    teardown();
  });

  it("uses ref.current.textContent when value is not a string", () => {
    getTextDirection.mockReturnValue("rtl");

    // First render: internal ref attaches to the div containing Arabic text rendered from value
    const wrapper = render(<Fixture value={<span>\u0645\u0631\u062D\u0628\u0627</span>} />);
    // ownRef.current.textContent is now "مرحبا"

    // Re-render with a new element reference to trigger useMemo to re-run
    wrapper.rerender(<Fixture value={<span>\u0645\u0631\u062D\u0628\u0627</span>} />);

    expect(getTextDirection).toHaveBeenCalled();
    expect(hookRef.current.dir).toBe("rtl");

    teardown();
  });

  it("populates the provided external ref when the element is mounted", () => {
    const externalRef = React.createRef();
    getTextDirection.mockReturnValue("ltr");

    render(<Fixture value="Hello world" providedRef={externalRef} />);

    expect(externalRef.current).not.toBeNull();
    expect(externalRef.current.tagName).toBe("DIV");

    teardown();
  });

  it("inferDirection defaults to true", () => {
    getTextDirection.mockReturnValue("ltr");

    render(<Fixture value="Hello world" />);

    expect(getTextDirection).toHaveBeenCalled();

    teardown();
  });
});
