/**
 * @jest-environment jest-environment-jsdom
 */
//(the above is required for window events)
const fs = require("fs");
const path = require("path");
const { fireEvent, findByText, getByText } = require("@testing-library/dom");
require("./index-helper.js");

const loadHtml = (fileRelativePath) => {
  const filePath = path.join(__dirname, "index.html");
  const innerHTML = fs.readFileSync(filePath);
  document.documentElement.innerHTML = innerHTML;
  return document.documentElement;
};

const loadHtmlAndGetUIElements = () => {
  const docElem = loadHtml("index.html");
  const button = getByText(docElem, "click me", { exact: false });
  return { window, docElem, button };
};

describe("index helper", () => {
  test("dom test lib button click triggers change in page", () => {
    const { window, docElem, button } = loadHtmlAndGetUIElements();
    fireEvent.load(window);

    fireEvent.click(button);

    // wait until true or timeout in 1 sec
    // exact : false means non-strict lookups
    expect(findByText(docElem, "clicked", { exact: false })).toBeTruthy();
  });
});
