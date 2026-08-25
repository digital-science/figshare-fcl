import PropTypes from "prop-types";
import React from "react";
import { render, cleanup } from "@testing-library/react";

import Feed from "./index";


class KeyEvent {
  constructor(key, ctrlKey = false) {
    this.key = key;
    this.ctrlKey = ctrlKey;
  }

  preventDefault = jest.fn();
}

const testValues = ["Test 1", "Test 2"];

function TestRenderComponent({ item, ...props }) {
  return <div {...props}>{item}</div>;
}

TestRenderComponent.propTypes = { item: PropTypes.string.isRequired };

function testRenderFunction(item, compProps) {
  return (
    <div key={compProps["aria-posinset"]} {...compProps}>
      {item} <a href="test">test</a>
    </div>
  );
}


describe("<Feed />", () => {
  let map = {};
  const simulate = (name, event) => {
    if (map[name]) {
      map[name](event);
    }
  };

  let addEventListener = null;
  let removeEventListener = null;

  beforeEach(() => {
    addEventListener = jest.spyOn(document, "addEventListener");
    addEventListener.mockImplementation((name, handler, capture = false) => {
      map[`${name}${capture ? "Capture" : ""}`] = handler;
    });

    removeEventListener = jest.spyOn(document, "removeEventListener");
    removeEventListener.mockImplementation((name, handler, capture = false) => {
      delete map[`${name}${capture ? "Capture" : ""}`];
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    addEventListener.mockRestore();
    removeEventListener.mockRestore();
    jest.clearAllTimers();
    jest.useRealTimers();
    cleanup();
    map = {};
  });

  it("correctly sets defaultProps", () => {
    const {
      children,
      className,
      component,
      innerRef,
      loading,
      render: renderProp,
      scrollThreshold,
      values,
      onBottomReached,
      onScroll,
      onTopReached,
    } = Feed.defaultProps;

    expect(children).toEqual(null);
    expect(className).toEqual(undefined);
    expect(component).toEqual(null);
    expect(innerRef).toEqual(null);
    expect(loading).toEqual(false);
    expect(renderProp).toEqual(null);
    expect(scrollThreshold).toEqual(0);
    expect(values).toEqual([]);
    expect(onBottomReached()).toEqual(undefined);
    expect(onScroll()).toEqual(undefined);
    expect(onTopReached()).toEqual(undefined);
  });

  it("returns null if no values passed", () => {
    const { container } = render(<Feed values={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("adds and removes the events listeners on mount and unmount", () => {
    const scrollContainer = {
      scrollY: 10,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    };
    const { unmount } = render(<Feed scrollContainer={scrollContainer} values={testValues} />);

    expect(typeof map.keydown).toBe("function");
    expect(typeof map.keyup).toBe("function");

    unmount();
    expect(map.keydown).toBeUndefined();
    expect(map.keyup).toBeUndefined();
  });

  it("correctly passes props to children", () => {
    const { container } = render(<Feed component="div" values={testValues} />);
    const feedEl = container.querySelector("[role='feed']");
    expect(feedEl).not.toBeNull();
    const { children } = feedEl;
    expect(children).toHaveLength(testValues.length);

    expect(children[0].getAttribute("aria-posinset")).toEqual("1");
    expect(children[0].getAttribute("aria-setsize")).toEqual(String(testValues.length));

    expect(children[1].getAttribute("aria-posinset")).toEqual("2");
    expect(children[1].getAttribute("aria-setsize")).toEqual(String(testValues.length));
  });

  it("renders correctly with standard HTML component", () => {
    const { container } = render(<Feed component="div" values={testValues} />);
    const feedEl = container.querySelector("[role='feed']");
    const { children } = feedEl;
    expect(children).toHaveLength(testValues.length);
    expect(children[0].tagName.toLowerCase()).toEqual("div");
    expect(children[1].tagName.toLowerCase()).toEqual("div");
  });

  it("renders correctly with custom react component", () => {
    const { container } = render(<Feed component={TestRenderComponent} values={testValues} />);
    const feedEl = container.querySelector("[role='feed']");
    const { children } = feedEl;
    expect(children).toHaveLength(testValues.length);
    expect(children[0].tagName.toLowerCase()).toEqual("div");
    expect(children[1].tagName.toLowerCase()).toEqual("div");
  });

  it("renders correctly with render prop", () => {
    const { container } = render(<Feed render={testRenderFunction} values={testValues} />);
    const feedEl = container.querySelector("[role='feed']");
    const { children } = feedEl;
    expect(children).toHaveLength(testValues.length);
    expect(children[0].tagName.toLowerCase()).toEqual("div");
    expect(children[1].tagName.toLowerCase()).toEqual("div");
  });

  it("renders correctly with children render function", () => {
    const { container } = render(
      <Feed values={testValues}>
        {testRenderFunction}
      </Feed>
    );
    const feedEl = container.querySelector("[role='feed']");
    const { children } = feedEl;
    expect(children).toHaveLength(testValues.length);
    expect(children[0].tagName.toLowerCase()).toEqual("div");
    expect(children[1].tagName.toLowerCase()).toEqual("div");
  });

  it("does not render children if no render type provided", () => {
    const { container } = render(<Feed values={testValues} />);
    const feedEl = container.querySelector("[role='feed']");
    expect(feedEl.children).toHaveLength(0);
  });

  it("passes the innerRef", () => {
    const ref = jest.fn();
    render(<Feed innerRef={ref} values={testValues} />);
    expect(ref).toHaveBeenCalled();
  });

  it("does nothing if no other focusable elements are found", () => {
    const { container } = render(
      <div>
        <Feed values={testValues}>
          {testRenderFunction}
        </Feed>
      </div>
    );

    const focused = container.querySelector("[data-id='feed-item']:last-child a");
    focused.focus();
    simulate("keyup", new KeyEvent("End", true));
    jest.runAllTimers();
    expect(focused).toEqual(document.activeElement);

    focused.focus();
    simulate("keyup", new KeyEvent("Home", true));
    jest.runAllTimers();
    expect(focused).toEqual(document.activeElement);
  });

  it("prevents default for Ctrl+Home and Ctrl+End on key down", () => {
    const { container } = render(
      <Feed values={testValues}>
        {testRenderFunction}
      </Feed>
    );

    container.querySelector("[data-id='feed-item']:last-child a").focus();
    let event = new KeyEvent("Home", true);
    simulate("keydown", event);
    expect(event.preventDefault).toHaveBeenCalled();

    event = new KeyEvent("End", true);
    simulate("keydown", event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it("doesn't change focus if no article is focused", () => {
    render(
      <Feed values={testValues}>
        {testRenderFunction}
      </Feed>
    );

    const event = new KeyEvent("PageUp");
    simulate("keydown", event);
    expect(event.preventDefault).not.toHaveBeenCalled();

    const homeEvent = new KeyEvent("Home", true);
    simulate("keyup", homeEvent);
    expect(homeEvent.preventDefault).not.toHaveBeenCalled();
  });

  it("doesn't change focus if the node is not mounted", () => {
    const { container } = render(
      <Feed values={testValues}>
        {testRenderFunction}
      </Feed>
    );

    const focused = container.querySelector("[data-id='feed-item']:last-child a");
    focused.focus();

    const event = new KeyEvent("PageUp");
    simulate("keydown", event);
    expect(event.preventDefault).not.toHaveBeenCalled();

    const homeEvent = new KeyEvent("PageUp");
    simulate("keyup", homeEvent);
    expect(homeEvent.preventDefault).not.toHaveBeenCalled();
  });

  it("triggers on scroll even if loading is true", () => {
    const onScroll = jest.fn();
    const scrollContainer = {
      scrollTop: 0,
      scrollY: 0,
      offsetHeight: 100,
      scrollHeight: 100,
      addEventListener: (event, handler) => {
        if (event === "scroll") {
          setTimeout(() => handler({ target: scrollContainer }), 0);
        }
      },
      removeEventListener: () => undefined,
    };

    render(
      <Feed
        component="div"
        loading={true}
        values={testValues}
        scrollContainer={scrollContainer}
        onScroll={onScroll}
      />
    );

    jest.runAllTimers();
    expect(onScroll).toHaveBeenCalled();
  });

  it("correctly triggers `onBottomReached`", () => {
    const onScroll = jest.fn();
    const onBottomReached = jest.fn();

    const scrollContainer = {
      scrollTop: 50,
      offsetHeight: 50,
      scrollHeight: 150,
      addEventListener: (event, handler) => {
        if (event === "scroll") {
          handler({ target: scrollContainer });
        }
      },
      removeEventListener: () => undefined,
    };

    render(
      <Feed
        component="div"
        values={testValues}
        scrollContainer={scrollContainer}
        onBottomReached={onBottomReached}
        onScroll={onScroll}
      />
    );

    expect(onScroll).toHaveBeenCalled();
    expect(onBottomReached).toHaveBeenCalled();
  });

  it("correctly triggers `onTopReached`", () => {
    const onScroll = jest.fn();
    const onTopReached = jest.fn();

    let currentScroll = 50;
    const scrollContainer = {
      get scrollTop() {
        return currentScroll;
      },
      offsetHeight: 50,
      scrollHeight: 150,
      addEventListener: (event, handler) => {
        if (event === "scroll") {
          handler({ target: scrollContainer });
        }
      },
      removeEventListener: () => undefined,
    };

    const { rerender } = render(
      <Feed
        component="div"
        values={testValues}
        scrollContainer={scrollContainer}
        onScroll={onScroll}
        onTopReached={onTopReached}
      />
    );

    // Scroll up to trigger onTopReached
    currentScroll = 0;
    rerender(
      <Feed
        component="div"
        values={testValues}
        scrollContainer={scrollContainer}
        onScroll={onScroll}
        onTopReached={onTopReached}
      />
    );

    expect(onScroll).toHaveBeenCalled();
    expect(onTopReached).toHaveBeenCalled();
  });
});
