import fs from "fs";
import path from "path";
import React from "react";
import { render, cleanup } from "@testing-library/react";


const excludedDirs = ["figshare", "react"];

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
  function teardown() {
    cleanup();
  }

  getJsxFiles(__dirname).forEach((iconPath) => {
    const iconFile = iconPath.replace(__dirname, "");

    describe(iconFile, () => {
      it("renders svg", async() => {
        const { default: Icon } = await import(iconPath);
        const { container } = render(<Icon />);
        expect(container.querySelector("svg")).toBeInTheDocument();
        teardown();
      });

      it("renders with props", async() => {
        const { default: Icon } = await import(iconPath);
        const { container } = render(<Icon aria-hidden={false} />);
        expect(container.querySelector("svg")).toBeInTheDocument();
        teardown();
      });
    });
  });
});
