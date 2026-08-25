import React from "react";
import { render, cleanup } from "@testing-library/react";

import PasswordStrength from "./PasswordStrength";


describe("<PasswordStrength />", () => {
  let rules = [];

  function teardown() {
    cleanup();
  }

  beforeEach(() => {
    rules = [
      { text: "a lowercase character", passed: false },
      { text: "a number", passed: false },
      { text: "a special character", passed: false },
    ];
  });

  it("renders", () => {
    const { container } = render(
      <PasswordStrength
        rules={rules}
        text="Please make sure the password contains:"
      />
    );

    expect(container.querySelector("[class*='header']")).toBeInTheDocument();
    expect(container.querySelectorAll("[class*='rule']")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label='Dot Icon']")).toHaveLength(3);

    teardown();
  });

  it("renders checked rule", () => {
    rules[0].passed = true;
    const { container } = render(
      <PasswordStrength
        rules={rules}
        text="Please make sure the password contains:"
      />
    );

    expect(container.querySelector("[class*='header']")).toBeInTheDocument();
    expect(container.querySelectorAll("[class*='rule']")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label='Dot Icon']")).toHaveLength(2);
    expect(container.querySelectorAll("[aria-label='Checkmark icon']")).toHaveLength(1);

    teardown();
  });

  it("renders rule with error", () => {
    rules[0].passed = true;
    const { container } = render(
      <PasswordStrength
        failedRuleType="error"
        rules={rules}
        text="Please make sure the password contains:"
      />
    );

    expect(container.querySelector("[class*='header']")).toBeInTheDocument();
    expect(container.querySelectorAll("[class*='rule']")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label='Checkmark icon']")).toHaveLength(1);
    expect(container.querySelectorAll("[aria-label='Warning icon']")).toHaveLength(2);

    teardown();
  });

  it("renders success message", () => {
    rules[0].passed = true;
    rules[1].passed = true;
    rules[2].passed = true;

    const { container } = render(
      <PasswordStrength
        allRulesPassedText="Your password is secure"
        failedRuleType="error"
        passed={true}
        rules={rules}
        text="Please make sure the password contains:"
      />
    );

    expect(container.querySelector("[class*='header']")).toBeInTheDocument();
    expect(container.querySelector("[class*='success']")).toHaveTextContent("Your password is secure");
    expect(container.querySelectorAll("[class*='rule']")).toHaveLength(3);
    expect(container.querySelectorAll("[aria-label='Checkmark icon']")).toHaveLength(3);

    teardown();
  });
});
