import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Disclosure from "./Disclosure";


describe("Disclosure", () => {
  it("renders children", () => {
    render(
      <Disclosure>
        <Disclosure.Toggle>
          {(props) => <button {...props}>Toggle</button>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => <div {...props}>Content</div>}
        </Disclosure.Content>
      </Disclosure>
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles content visibility", async() => {
    const user = userEvent.setup();
    render(
      <Disclosure defaultVisible={false}>
        <Disclosure.Toggle>
          {(props) => <button {...props}>Toggle</button>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => <div {...props}>Hidden content</div>}
        </Disclosure.Content>
      </Disclosure>
    );

    const button = screen.getByRole("button");
    const content = screen.getByText("Hidden content");

    // Initially hidden
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("aria-hidden", "true");

    // Toggle visible
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(content).toHaveAttribute("aria-hidden", "false");

    // Toggle hidden
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(content).toHaveAttribute("aria-hidden", "true");
  });

  it("passes visible state to toggle render prop", () => {
    const { rerender } = render(
      <Disclosure visible={false}>
        <Disclosure.Toggle>
          {(props) => <div data-testid="toggle">{String(props.visible)}</div>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => null}
        </Disclosure.Content>
      </Disclosure>
    );

    expect(screen.getByTestId("toggle")).toHaveTextContent("false");

    rerender(
      <Disclosure visible={true}>
        <Disclosure.Toggle>
          {(props) => <div data-testid="toggle">{String(props.visible)}</div>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => null}
        </Disclosure.Content>
      </Disclosure>
    );

    expect(screen.getByTestId("toggle")).toHaveTextContent("true");
  });

  it("calls onToggle callback", async() => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    render(
      <Disclosure defaultVisible={false} onToggle={onToggle}>
        <Disclosure.Toggle>
          {(props) => <button {...props}>Toggle</button>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => <div {...props}>Content</div>}
        </Disclosure.Content>
      </Disclosure>
    );

    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("button"));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it("sets correct aria attributes", () => {
    render(
      <Disclosure defaultVisible={true}>
        <Disclosure.Toggle>
          {(props) => <button {...props}>Toggle</button>}
        </Disclosure.Toggle>
        <Disclosure.Content>
          {(props) => <div data-testid="content" {...props}>Content</div>}
        </Disclosure.Content>
      </Disclosure>
    );

    const button = screen.getByRole("button");
    const content = screen.getByTestId("content");

    expect(button).toHaveAttribute("role", "button");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls");
    expect(content).toHaveAttribute("aria-hidden", "false");
    expect(content).toHaveAttribute("id", button.getAttribute("aria-controls"));
  });
});
