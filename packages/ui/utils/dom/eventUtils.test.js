import { preventFormSubmissionThroughButton } from "./eventUtils";


describe("preventFormSubmissionThroughButton", () => {
  it("should prevent form submission when the submitter is a submit button", () => {
    const mockEvent = {
      nativeEvent: {
        submitter: {
          tagName: "BUTTON",
          type: "submit",
        },
      },
      preventDefault: jest.fn(),
    };

    preventFormSubmissionThroughButton(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("should not prevent form submission when the submitter is not a submit button", () => {
    const mockEvent = {
      nativeEvent: {
        submitter: {
          tagName: "BUTTON",
          type: "button",
        },
      },
      preventDefault: jest.fn(),
    };

    preventFormSubmissionThroughButton(mockEvent);
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it("should not throw an error when the event or nativeEvent is undefined", () => {
    expect(() => preventFormSubmissionThroughButton()).not.toThrow();
    expect(() => preventFormSubmissionThroughButton({})).not.toThrow();
    expect(() => preventFormSubmissionThroughButton({ nativeEvent: {} })).not.toThrow();
  });
});
