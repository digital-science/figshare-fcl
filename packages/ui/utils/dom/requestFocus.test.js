import { focusOnElement, requestFocus } from "./requestFocus";


describe("requestFocus", () => {
  it("requestFocus() focuses on a node found through a given selector after a short while", async() => {
    const querySelectorSpy = jest.spyOn(document.body, "querySelector");
    const focusSpy = jest.fn();

    requestFocus("tag.class#whatever[selector]");


    expect(focusSpy).not.toHaveBeenCalled();

    querySelectorSpy.mockImplementation(() => {
      return { focus: focusSpy };
    });

    const delay = 500;

    requestFocus("tag.class#whatever[selector]", delay - 100);

    const waited = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });

    querySelectorSpy.mockRestore();

    expect(waited).toEqual(true);
  });
});

describe("focusOnElement", () => {
  it("calls focus on an element if it exists without error", () => {
    const element = { focus: jest.fn() };
    const elementWithoutFocus = { };

    focusOnElement(element);
    focusOnElement(elementWithoutFocus);

    expect(element.focus).toHaveBeenCalled();
  });
});
