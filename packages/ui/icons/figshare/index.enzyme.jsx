import React from "react";
import { shallow } from "enzyme";

import FigshareLogo from "./logo";
import FigshareText from "./text";
import FigshareFullLogo from "./index";


describe("<FigshareLogo />", () => {
  it("renders svg", () => {
    const figshareLogo = shallow(<FigshareLogo />);

    expect(figshareLogo.type()).toEqual("svg");
    expect(figshareLogo.hasClass("grayscale")).toEqual(false);
    expect(figshareLogo.hasClass("animate")).toEqual(false);
    expect(figshareLogo.hasClass("logo")).toEqual(true);

    figshareLogo.find("svg").children().forEach((path, pathIndex) => {
      expect(path.type()).toEqual("path");
      expect(path.hasClass("group")).toEqual(true);
      expect(path.hasClass(`layer${pathIndex + 1}`)).toEqual(true);

      const colorIndex = (pathIndex % 4) + 1;

      expect(path.hasClass(`color${colorIndex}`)).toEqual(true);
    });
  });

  it("renders with props", () => {
    const figshareLogo = shallow(<FigshareLogo />);

    figshareLogo.setProps({ animate: true });
    expect(figshareLogo.hasClass("animate")).toEqual(true);

    figshareLogo.setProps({ grayscale: true });

    expect(figshareLogo.hasClass("grayscale")).toEqual(true);

    figshareLogo.setProps({ className: "test" });

    expect(figshareLogo.hasClass("logo")).toEqual(false);
    expect(figshareLogo.hasClass("test")).toEqual(true);

    figshareLogo.setProps({ "aria-label": "test", role: "figure", foo: "bar", style: { width: "100px" } });

    let props = figshareLogo.props();
    expect(props["aria-label"]).toEqual("test");
    expect(props.role).toEqual("figure");
    expect(props.foo).toEqual("bar");
    expect(props.style).toMatchObject({ width: "100px" });

    figshareLogo.setProps({ xmlns: "http://fake.org/svg/fake", viewBox: "1 1 1 1" });

    props = figshareLogo.props();
    expect(props.xmlns).not.toEqual("http://fake.org/svg/fake");
    expect(props.viewBox).not.toEqual("1 1 1 1");
  });
});

describe("<FigshareText />", () => {
  it("renders svg", () => {
    const figshareText = shallow(<FigshareText />);

    expect(figshareText.type()).toEqual("svg");
    expect(figshareText.hasClass("textLogo")).toEqual(true);
    expect(figshareText.hasClass("color")).toEqual(true);
  });

  it("renders with props", () => {
    const figshareText = shallow(<FigshareText />);

    figshareText.setProps({ "aria-label": "test", role: "figure", className: "test", foo: "bar" });

    expect(figshareText.hasClass("test")).toEqual(true);
    expect(figshareText.hasClass("textLogo")).not.toEqual(true);
    expect(figshareText.hasClass("color")).toEqual(true);

    let props = figshareText.props();
    expect(props["aria-label"]).toEqual("test");
    expect(props.role).toEqual("figure");
    expect(props.foo).toEqual("bar");

    figshareText.setProps({ xmlns: "http://fake.org/svg/fake", viewBox: "1 1 1 1" });

    props = figshareText.props();
    expect(props.xmlns).not.toEqual("http://fake.org/svg/fake");
    expect(props.viewBox).not.toEqual("1 1 1 1");
  });
});

describe("<FigshareFullLogo />", () => {
  it("renders figure", () => {
    const figshare = shallow(<FigshareFullLogo />);

    expect(figshare.type()).toEqual("figure");
    expect(figshare.hasClass("figure")).toEqual(true);
    expect(figshare.hasClass("default")).toEqual(true);

    const props = figshare.props();
    expect(props["aria-label"]).toEqual("figshare");
    expect(props.role).toEqual("img");
  });

  it("renders with props", () => {
    const figshare = shallow(<FigshareFullLogo />);

    figshare.setProps({ "aria-label": "test", role: "figure", className: "test", foo: "bar" });

    expect(figshare.hasClass("figure")).toEqual(true);
    expect(figshare.hasClass("test")).toEqual(true);
    expect(figshare.hasClass("default")).not.toEqual(true);

    const props = figshare.props();
    expect(props["aria-label"]).toEqual("test");
    expect(props.role).toEqual("figure");
    expect(props.foo).toEqual("bar");
  });
});
