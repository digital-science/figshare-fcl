import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { UncontrolledToggletip, Content, Trigger } from "./index.jsx";


describe("<UncontrolledToggletip />", () => {
  function teardown() {
    cleanup();
  }

  it("renders trigger", () => {
    const { container } = render(
      <UncontrolledToggletip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <button {...props} id="trigger" />}</Trigger>
          </div>
        )}
      </UncontrolledToggletip>
    );
    expect(container.querySelector("#trigger")).toBeInTheDocument();
    teardown();
  });

  it("shows content on trigger click", () => {
    const { container } = render(
      <UncontrolledToggletip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <button {...props} id="trigger" />}</Trigger>
            <Content renderInPortal={false}>{() => <div id="content" />}</Content>
          </div>
        )}
      </UncontrolledToggletip>
    );
    expect(container.querySelector("#content")).not.toBeInTheDocument();
    fireEvent.click(container.querySelector("#trigger"));
    expect(container.querySelector("#content")).toBeInTheDocument();
    teardown();
  });

  it("hides content on second trigger click", () => {
    const { container } = render(
      <UncontrolledToggletip>
        {() => (
          <div>
            <Trigger>{({ ...props }) => <button {...props} id="trigger" />}</Trigger>
            <Content renderInPortal={false}>{() => <div id="content" />}</Content>
          </div>
        )}
      </UncontrolledToggletip>
    );
    fireEvent.click(container.querySelector("#trigger"));
    expect(container.querySelector("#content")).toBeInTheDocument();
    fireEvent.click(container.querySelector("#trigger"));
    expect(container.querySelector("#content")).not.toBeInTheDocument();
    teardown();
  });
});
