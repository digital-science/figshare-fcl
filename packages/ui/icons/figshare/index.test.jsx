import React from "react";
import { render, cleanup } from "@testing-library/react";

import FigshareLogo from "./logo";
import FigshareText from "./text";
import FigshareFullLogo from "./index";


describe("<FigshareLogo />", () => {
  function teardown() {
    cleanup();
  }

  it("renders svg", () => {
    const { container } = render(<FigshareLogo />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("logo");
    expect(svg).not.toHaveClass("grayscale");
    expect(svg).not.toHaveClass("animate");

    const paths = container.querySelectorAll("path");
    paths.forEach((path, pathIndex) => {
      expect(path).toHaveClass("group");
      expect(path).toHaveClass(`layer${pathIndex + 1}`);
      expect(path).toHaveClass(`color${(pathIndex % 4) + 1}`);
    });
    teardown();
  });

  it("renders with props", () => {
    const { container, rerender } = render(<FigshareLogo />);
    const svg = container.querySelector("svg");

    rerender(<FigshareLogo animate={true} />);
    expect(svg).toHaveClass("animate");

    rerender(<FigshareLogo animate={true} grayscale={true} />);
    expect(svg).toHaveClass("grayscale");

    rerender(<FigshareLogo className="test" />);
    expect(svg).not.toHaveClass("logo");
    expect(svg).toHaveClass("test");

    rerender(<FigshareLogo aria-label="test" foo="bar" role="figure" style={ { width: "100px" } } />);
    expect(svg).toHaveAttribute("aria-label", "test");
    expect(svg).toHaveAttribute("role", "figure");
    expect(svg).toHaveAttribute("foo", "bar");
    expect(svg.style.width).toBe("100px");

    rerender(<FigshareLogo viewBox="1 1 1 1" xmlns="http://fake.org/svg/fake" />);
    expect(svg).not.toHaveAttribute("xmlns", "http://fake.org/svg/fake");
    expect(svg).not.toHaveAttribute("viewBox", "1 1 1 1");
    teardown();
  });
});

describe("<FigshareText />", () => {
  function teardown() {
    cleanup();
  }

  it("renders svg", () => {
    const { container } = render(<FigshareText />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("textLogo");
    expect(svg).toHaveClass("color");
    teardown();
  });

  it("renders with props", () => {
    const { container, rerender } = render(<FigshareText />);
    const svg = container.querySelector("svg");

    rerender(<FigshareText aria-label="test" className="test" foo="bar" role="figure" />);
    expect(svg).toHaveClass("test");
    expect(svg).not.toHaveClass("textLogo");
    expect(svg).toHaveClass("color");
    expect(svg).toHaveAttribute("aria-label", "test");
    expect(svg).toHaveAttribute("role", "figure");
    expect(svg).toHaveAttribute("foo", "bar");

    rerender(<FigshareText viewBox="1 1 1 1" xmlns="http://fake.org/svg/fake" />);
    expect(svg).not.toHaveAttribute("xmlns", "http://fake.org/svg/fake");
    expect(svg).not.toHaveAttribute("viewBox", "1 1 1 1");
    teardown();
  });
});

describe("<FigshareFullLogo />", () => {
  function teardown() {
    cleanup();
  }

  it("renders figure", () => {
    const { container } = render(<FigshareFullLogo />);
    const figure = container.querySelector("figure");
    expect(figure).toBeInTheDocument();
    expect(figure).toHaveClass("figure");
    expect(figure).toHaveClass("default");
    expect(figure).toHaveAttribute("aria-label", "figshare");
    expect(figure).toHaveAttribute("role", "img");
    teardown();
  });

  it("renders with props", () => {
    const { container, rerender } = render(<FigshareFullLogo />);
    const figure = container.querySelector("figure");

    rerender(<FigshareFullLogo aria-label="test" className="test" foo="bar" role="figure" />);
    expect(figure).toHaveClass("figure");
    expect(figure).toHaveClass("test");
    expect(figure).not.toHaveClass("default");
    expect(figure).toHaveAttribute("aria-label", "test");
    expect(figure).toHaveAttribute("role", "figure");
    expect(figure).toHaveAttribute("foo", "bar");
    teardown();
  });
});
