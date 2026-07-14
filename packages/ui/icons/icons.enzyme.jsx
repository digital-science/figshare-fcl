import fs from "fs";
import path from "path";
import React from "react";
import { shallow } from "enzyme";


const excludedDirs = ["figshare"];

const getJsxFiles = (dir, filelist = []) => {
  const dirContent = fs.readdirSync(dir);

  return dirContent.reduce((acc, file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      if (excludedDirs.includes(file)) {
        return acc;
      }

      return [...acc, ...getJsxFiles(filePath, filelist)];
    }

    if (file.endsWith(".jsx") && !file.endsWith("test.jsx") && !file.endsWith("stories.jsx")) {
      return [...acc, filePath];
    }

    return acc;
  }, []);
};

describe("Icons", () => {
  getJsxFiles(__dirname).forEach((iconPath) => {
    const iconFile = iconPath.replace(__dirname, "");

    describe(iconFile, () => {
      it("renders svg", async() => {
        const { default: Icon } = await import(iconPath);
        const icon = shallow(<Icon />);

        expect(icon.type()).toEqual("svg");
        expect(icon.props()).toMatchObject({
          "aria-hidden": true,
          focusable: false,
        });
      });

      it("renders with props", async() => {
        const { default: Icon } = await import(iconPath);
        const icon = shallow(
          <Icon
            aria-hidden={false}
            className="test"
            focusable={true}
            viewBox="fake_box"
            xmlns="fake_xmlns"
          />
        );

        expect(icon.props()).toMatchObject({
          "aria-hidden": false,
          className: "test",
        });

        expect(icon.props()).not.toMatchObject({
          focusable: true,
          viewBox: "fake_box",
          xmlns: "fake_xmlns",
        });
      });
    });
  });
});
