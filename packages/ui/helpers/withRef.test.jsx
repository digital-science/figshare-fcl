
import React, { createRef } from "react";
import PropTypes from "prop-types";
import { render, cleanup } from "@testing-library/react";

import withRef from "./withRef";


describe("`withRef` wrapper", () => {
  function teardown() {
    cleanup();
  }

  it("renders null if wrapped component is missing", () => {
    const Wrapped = withRef();
    const { container } = render(<Wrapped />);
    expect(container.firstChild).toBeNull();
    teardown();
  });

  it("renders the wrapped component", () => {
    const Wrapped = withRef(() => <div data-testid="wrapped" />);
    const { getByTestId } = render(<Wrapped />);
    expect(getByTestId("wrapped")).toBeInTheDocument();
    teardown();
  });

  it("exposes `ref` to `forwardedRef`", () => {
    const ref = createRef();
    let capturedForwardedRef = null;
    const Comp = ({ forwardedRef }) => {
      capturedForwardedRef = forwardedRef;

      return <div />;
    };
    Comp.propTypes = { forwardedRef: PropTypes.any };
    const Wrapped = withRef(Comp);
    render(<Wrapped ref={ref} />);
    expect(capturedForwardedRef).toEqual(ref);
    teardown();
  });

  it("passes other props to wrapped component", () => {
    const passedProps = { s: 1, m: 2 };
    let capturedProps = null;
    const Comp = (props) => {
      capturedProps = props;

      return <div />;
    };
    const Wrapped = withRef(Comp);
    render(<Wrapped {...passedProps} />);
    const { forwardedRef, ...restProps } = capturedProps;
    expect(restProps).toEqual(passedProps);
    teardown();
  });

  it("does not bypass `forwardedRef` prop", () => {
    const ref = createRef();
    let capturedRef = null;
    const Comp = ({ forwardedRef }) => {
      capturedRef = forwardedRef;

      return <div />;
    };
    Comp.propTypes = { forwardedRef: PropTypes.any };
    const Wrapped = withRef(Comp);
    render(<Wrapped forwardedRef={ref} />);
    expect(capturedRef).not.toEqual(ref);
    teardown();
  });
});
