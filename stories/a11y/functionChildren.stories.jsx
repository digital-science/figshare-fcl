import React from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import { LinkingProvider, LinkingObject, LinkingReference } from "@digital-science/figshare-fcl/a11y/linking/index";

// eslint-disable-next-line css-modules/no-unused-class
import styles from "./storybook.stories.css";


export const FunctionChildrenShowcase = () => (
  <div className={styles.section}>
    <h1>Linking different entities using aria attributes</h1>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Local linking using a provider</h4>
        <LinkingObject attributes={["aria-labelledby", "aria-describedby"]}>
          {({ objectProps }) => (
            <Button {...objectProps}>Learn more</Button>
          )}
        </LinkingObject>
        <LinkingReference forAttributes="aria-labelledby">
          {({ referenceProps }) => (
            <span className={styles.label} {...referenceProps}>Label for the button above</span>
          )}
        </LinkingReference>
        <LinkingReference forAttributes="aria-describedby" id="thisIsATestId">
          {({ referenceProps }) => (
            <span className={styles.label} {...referenceProps}>Description for the button above</span>
          )}
        </LinkingReference>
      </LinkingProvider>
    </div>

    <div className={styles.row}>
      <LinkingProvider>
        <h4>Multiple linkings in the same provider using identifier keys</h4>
        <div className={styles.buttonRow}>
          <LinkingObject attributes={["aria-labelledby"]} identifierKey="firstButton">
            {({ objectProps }) => (
              <Button {...objectProps}>Learn more</Button>
            )}
          </LinkingObject>
          <LinkingObject attributes={["aria-labelledby"]} identifierKey="secondButton">
            {({ objectProps }) => (
              <Button {...objectProps}>Another button</Button>
            )}
          </LinkingObject>
        </div>
        <LinkingReference forAttributes="aria-labelledby" identifierKey="firstButton">
          {({ referenceProps }) => (
            <span className={styles.label} {...referenceProps}>Label for the first button</span>
          )}
        </LinkingReference>
        <LinkingReference forAttributes="aria-labelledby" identifierKey="secondButton">
          {({ referenceProps }) => (
            <span className={styles.label} {...referenceProps}>Label for the second button</span>
          )}
        </LinkingReference>
      </LinkingProvider>
    </div>

    <div className={styles.row}>
      <LinkingProvider>
        {({ getAttributeValue, defaultIdentifier }) => (
          <React.Fragment>
            <h4>Linking provider functional children</h4>
            <div className={styles.buttonRow}>
              <Button
                aria-describedby={getAttributeValue(defaultIdentifier, "aria-describedby")}
                aria-labelledby={getAttributeValue("firstKey", "aria-labelledby")}
              >
                Learn more
              </Button>
            </div>
            <LinkingReference forAttributes="aria-labelledby" identifierKey="firstKey">
              {({ referenceProps }) => (
                <span className={styles.label} {...referenceProps}>Label for the button</span>
              )}
            </LinkingReference>
            <LinkingReference forAttributes="aria-describedby">
              {({ referenceProps }) => (
                <span className={styles.label} {...referenceProps}>Description for the button</span>
              )}
            </LinkingReference>
            <LinkingReference forAttributes="aria-describedby">
              {({ referenceProps }) => (
                <span className={styles.label} {...referenceProps}>Another description for the button</span>
              )}
            </LinkingReference>
          </React.Fragment>
        )}
      </LinkingProvider>
    </div>
  </div>
);
