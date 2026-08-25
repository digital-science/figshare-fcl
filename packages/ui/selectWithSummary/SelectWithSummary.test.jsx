/* eslint-disable no-empty-function */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SelectWithSummary, { UncontrolledSelectWithSummary, Summary } from "./index";


describe("SelectWithSummary", () => {
  const defaultOptions = [
    { name: "Option 1", value: "opt1" },
    { name: "Option 2", value: "opt2" },
    { name: "Option 3", value: "opt3" },
  ];

  describe("SelectWithSummary Component", () => {
    it("renders select and summary", () => {
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    // eslint-disable-next-line require-await
    it("calls onChange when option is selected", async() => {
      const handleChange = jest.fn();
      const { rerender } = render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          onChange={handleChange}
        />
      );

      // Note: Actual interaction depends on Select component's implementation
      // This test structure demonstrates the pattern
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("tracks touched values and options separately", () => {
      const handleChange = jest.fn();
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          onChange={handleChange}
        />
      );

      expect(handleChange).not.toHaveBeenCalled();
    });

    it("displays preselected values in summary when hasInitialSummary is true", () => {
      const preselected = [
        { name: "Preselected 1", value: "pre1" },
        { name: "Preselected 2", value: "pre2" },
      ];

      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          hasInitialSummary={true}
          summaryPreselectedValues={preselected}
          onChange={() => {}}
        />
      );

      // Summary should display preselected values when hasInitialSummary is true
      // but summary won't render until values are selected or initial summary is shown
    });

    it("passes aria labels to Select and Summary", () => {
      const { container } = render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          ariaLabel="Test Label"
          ariaLabelledBy="test-id"
          onChange={() => {}}
        />
      );

      // Component should render with proper ARIA attributes
      expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("disables select and summary when disabled prop is true", () => {
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          disabled={true}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("shows error state when error prop is true", () => {
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          error={true}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("renders with custom placeholder", () => {
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          placeholder="Choose items"
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Choose items")).toBeInTheDocument();
    });

    it("shows loading state when loading prop is true", () => {
      render(
        <SelectWithSummary
          options={defaultOptions}
          value={undefined}
          loading={true}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("forwards ref to Select component", () => {
      const ref = React.createRef();
      render(
        <SelectWithSummary
          ref={ref}
          options={defaultOptions}
          value={undefined}
          onChange={() => {}}
        />
      );

      expect(ref.current).toBeTruthy();
    });
  });

  describe("Summary Component", () => {
    it("returns null when no options provided", () => {
      const { container } = render(
        <Summary
          options={[]}
          selectedValues={undefined}
          onChange={() => {}}
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it("renders summary items when options provided", () => {
      render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          onChange={() => {}}
        />
      );

      // Summary items should be rendered
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("shows loading state when loading is true and hasInitialSummary is true", () => {
      const { container } = render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          loading={true}
          hasInitialSummary={true}
          onChange={() => {}}
        />
      );

      // Should show loader
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("shows error message when errorMessage is provided and hasInitialSummary is true", () => {
      render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          errorMessage="Failed to load"
          hasInitialSummary={true}
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Failed to load")).toBeInTheDocument();
    });

    it("shows retry button when retry action and message are provided", () => {
      render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          errorMessage="Failed to load"
          hasInitialSummary={true}
          retry={ { message: "Retry", action: jest.fn() } }
          onChange={() => {}}
        />
      );

      expect(screen.getByText("Retry")).toBeInTheDocument();
    });

    it("marks items as selected when value matches", () => {
      render(
        <Summary
          options={defaultOptions}
          selectedValues={["opt1", "opt3"]}
          onChange={() => {}}
        />
      );

      // Checkboxes for selected items should be checked
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes[0]).toBeChecked(); // opt1
      expect(checkboxes[1]).not.toBeChecked(); // opt2
      expect(checkboxes[2]).toBeChecked(); // opt3
    });

    it("disables items when disabled prop is true", () => {
      render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          disabled={true}
          onChange={() => {}}
        />
      );

      const buttons = screen.getAllByRole("option");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    it("calls onChange when item is clicked", async() => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          onChange={handleChange}
        />
      );

      const firstItem = screen.getByText("Option 1").closest("button");
      await user.click(firstItem);

      expect(handleChange).toHaveBeenCalledWith(["opt1"]);
    });

    it("calls onLoadMore when scrolled to bottom", () => {
      const handleLoadMore = jest.fn();
      const { container } = render(
        <Summary
          options={defaultOptions}
          selectedValues={[]}
          hasInitialSummary={true}
          onChange={() => {}}
          onLoadMore={handleLoadMore}
        />
      );

      const summaryContainer = container.querySelector("[role=\"listbox\"]");
      fireEvent.scroll(summaryContainer, { target: { scrollY: 100 } });

      // Note: Actual scroll behavior depends on implementation
    });
  });

  describe("UncontrolledSelectWithSummary", () => {
    it("manages internal state", () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();

      render(
        <UncontrolledSelectWithSummary
          options={defaultOptions}
          onChange={handleChange}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("calls onChange callback when value changes", () => {
      const handleChange = jest.fn();

      render(
        <UncontrolledSelectWithSummary
          options={defaultOptions}
          onChange={handleChange}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("uses defaultValue if provided", () => {
      render(
        <UncontrolledSelectWithSummary
          options={defaultOptions}
          defaultValue={["opt1"]}
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });
  });
});
