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
