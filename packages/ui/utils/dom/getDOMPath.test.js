import getDOMPath from "./getDOMPath";


describe("DOM utils => getDomPath()", () => {
  const text = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Sandbox</title>
    </head>
    <body>
      <div id="app">
        <div>
          <div class="nest-1"></div>
          <div></div>
          <div class="nest-3">
            <button></button>
            <button></button>
            <button data-id="1"></button>
            <button class="a b c" data-id="1-spaced"></button>
            <button id="test"></button>
            <div class="test-2"></div>
            <div class="test-2"></div>
            <div class="test-2" data-id="2"></div>
            <div class="test-2" data-id="3"></div>
          </div>
        </div>
      </div>
  </html>
  `;
  const parser = new DOMParser();
  const dom = parser.parseFromString(text, "text/html");


  it("returns a selector to a particular node", () => {
    expect(getDOMPath(dom.querySelector("#test"))).toEqual("#test");
    expect(getDOMPath(dom.querySelector("body"))).toEqual("body");
    expect(getDOMPath(dom.querySelector("button[data-id=\"1\"]"))).
      toEqual("body > #app > div > div:nth-of-type(3) > button:nth-of-type(3)");
    expect(getDOMPath(dom.querySelector("button[data-id=\"1-spaced\"]"))).
      toEqual("body > #app > div > div:nth-of-type(3) > button:nth-of-type(4)");
    expect(getDOMPath(dom.querySelector("div[data-id=\"2\"]"))).
      toEqual("body > #app > div > div:nth-of-type(3) > div:nth-of-type(3)");
    expect(getDOMPath(dom.querySelector("div[data-id=\"3\"]"))).
      toEqual("body > #app > div > div:nth-of-type(3) > div:nth-of-type(4)");
    expect(getDOMPath({})).toEqual("");
    expect(getDOMPath("")).toEqual("");
  });
});
