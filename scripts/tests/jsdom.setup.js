import "@testing-library/jest-dom";

document.createRange = () => {
  return {
    setStart: () => undefined,
    setEnd: () => undefined,
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document,
    },
  };
};

beforeEach(() => {
  document.rootContainer = document.createElement("div");
  document.body.appendChild(document.rootContainer);
});


afterEach(() => {
  document.rootContainer = undefined;

  while (document.body.firstChild) {
    document.body.removeChild(document.body.lastChild);
  }
});
