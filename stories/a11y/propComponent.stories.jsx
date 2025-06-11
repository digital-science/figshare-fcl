import React from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import { LinkingProvider, LinkingObject, LinkingReference } from "@digital-science/figshare-fcl/a11y/linking/index";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./storybook.stories.css";


export const PropComponentShowcase = () => (
  <div className={styles.section}>
    <h1>Linking different entities using aria attributes</h1>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Local linking using a provider</h4>
        <LinkingObject attributes={["aria-labelledby", "aria-describedby"]} component={Button}>
          Learn more
        </LinkingObject>
        <LinkingReference className={styles.label} component="span" forAttributes="aria-labelledby">
          Label for the button above
        </LinkingReference>
        <LinkingReference className={styles.label} component="span" forAttributes="aria-describedby" id="thisIsATestId">
          Description for the button above
        </LinkingReference>
      </LinkingProvider>
    </div>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Multiple linkings in the same provider using identifier keys</h4>
        <div className={styles.buttonRow}>
          <LinkingObject attributes={["aria-labelledby"]} component={Button} identifierKey="firstButton">
            Learn more
          </LinkingObject>
          <LinkingObject attributes={["aria-labelledby"]} component={Button} identifierKey="secondButton">
            Another button
          </LinkingObject>
        </div>
        <LinkingReference
          className={styles.label}
          component="span"
          forAttributes="aria-labelledby"
          identifierKey="firstButton"
        >
          Label for the first button
        </LinkingReference>
        <LinkingReference
          className={styles.label}
          component="span"
          forAttributes="aria-labelledby"
          identifierKey="secondButton"
        >
          Label for the second button
        </LinkingReference>
      </LinkingProvider>
    </div>
  </div>
);
