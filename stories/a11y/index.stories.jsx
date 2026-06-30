import React from "react";

import { ConsumerShowcase } from "./directConsumerAccess.stories";
import { FunctionChildrenShowcase } from "./functionChildren.stories";
import { HigherOrderContainersShowcase } from "./hoc.stories";
import { PropComponentShowcase } from "./propComponent.stories";

export default {
  title: "Utils/A11y/Aria linking",
  parameters: {
    viewMode: "docs",
    previewTabs: { canvas: { hidden: true } },
  },
};

export const ComponentProp = () => <PropComponentShowcase />;
export const ChildrenFunctionProp = () => <FunctionChildrenShowcase />;
export const HigherOrderComponents = () => <HigherOrderContainersShowcase />;
export const UsingConsumerDirectly = () => <ConsumerShowcase />;
