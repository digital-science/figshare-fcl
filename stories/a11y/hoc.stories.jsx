import React from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import {
  LinkingProvider,
  withLinkingObject,
  withLinkingReference,
} from "@digital-science/figshare-fcl/a11y/linking/index";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./storybook.stories.css";


const LabelByReference = withLinkingReference("span", "aria-labelledby");
const DescribedByReference = withLinkingReference("span", "aria-describedby");
const LabelByObject = withLinkingObject(Button, ["aria-labelledby", "aria-describedby"]);


export const HigherOrderContainersShowcase = () => (
  <div className={styles.section}>
    <h1>Linking different entities using aria attributes</h1>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Local linking using a provider</h4>
        <LabelByObject>
          Learn more
        </LabelByObject>
        <LabelByReference ref={React.createRef()} className={styles.label}>
          Label for the button above
        </LabelByReference>
        <DescribedByReference className={styles.label} id="thisIsATestId">
          Description for the button above
        </DescribedByReference>
      </LinkingProvider>
    </div>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Multiple linkings in the same provider using identifier keys</h4>
        <div className={styles.buttonRow}>
          <LabelByObject identifierKey="firstButton">
            Learn more
          </LabelByObject>
          <LabelByObject identifierKey="secondButton">
            Another button
          </LabelByObject>
        </div>
        <LabelByReference className={styles.label} identifierKey="firstButton" >
          Label for the first button
        </LabelByReference>
        <LabelByReference className={styles.label} identifierKey="secondButton" >
          Label for the second button
        </LabelByReference>
      </LinkingProvider>
    </div>
  </div>
);
