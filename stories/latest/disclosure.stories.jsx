import React from "react";
import Disclosure from "@digital-science/figshare-fcl/latest/Disclosure";
import { ChevronDown } from "@digital-science/figshare-fcl/icons/react";
import { Button } from "@digital-science/figshare-fcl/latest/Button";

import { Cover } from "../story-utils/Cover";
import { ValueProvider } from "../story-utils/ValueProvider";

import styles from "./disclosure.stories.module.css";


export default {
  title: "UI/latest/Disclosure",
  component: Disclosure,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => (
        <ValueProvider initialValue={false}>
          {(isOpen, setIsOpen) => (
            <Disclosure visible={isOpen} keepMounted={false} onToggle={setIsOpen}>
              <Disclosure.Toggle>
                {(props) => (
                  <Button
                    {...props}
                    kind="secondary"
                    style={ { display: "flex", alignItems: "center", gap: "8px" } }
                  >
                    <Button.Label>Show Details</Button.Label>
                    <ChevronDown
                      style={ {
                        transform: props.visible ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                      } }
                    />
                  </Button>
                )}
              </Disclosure.Toggle>
              <Disclosure.Content>
                {(props) => (
                  <div
                    {...props}
                    className={styles.content}
                  >
                    <p>This is the disclosed content that toggles visibility.</p>
                  </div>
                )}
              </Disclosure.Content>
            </Disclosure>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const BasicDisclosureWithButtonToggle = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue={false}>
          {(isOpen, setIsOpen) => (
            <Disclosure visible={isOpen} keepMounted={false} onToggle={setIsOpen}>
              <Disclosure.Toggle>
                {(props) => (
                  <Button {...props} kind="secondary">
                    <Button.Label>Toggle Content</Button.Label>
                  </Button>
                )}
              </Disclosure.Toggle>
              <Disclosure.Content>
                {(props) => (
                  <div {...props} className={styles.content}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                )}
              </Disclosure.Content>
            </Disclosure>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const WithIconRotation = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue={false}>
          {(isOpen, setIsOpen) => (
            <Disclosure visible={isOpen} keepMounted={false} onToggle={setIsOpen}>
              <Disclosure.Toggle>
                {(props) => (
                  <Button
                    {...props}
                    kind="tertiary"
                    style={ { display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-start" } }
                  >
                    <ChevronDown
                      style={ {
                        transform: props.visible ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 200ms ease",
                        width: "16px",
                        height: "16px",
                      } }
                    />
                    <Button.Label>Advanced Options</Button.Label>
                  </Button>
                )}
              </Disclosure.Toggle>
              <Disclosure.Content>
                {(props) => (
                  <div {...props} className={styles.content}>
                    <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
                      <label>
                        <input type="checkbox" /> Option 1
                      </label>
                      <label>
                        <input type="checkbox" /> Option 2
                      </label>
                      <label>
                        <input type="checkbox" /> Option 3
                      </label>
                    </div>
                  </div>
                )}
              </Disclosure.Content>
            </Disclosure>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const ControlledDisclosure = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      {() => (
        <ValueProvider initialValue={false}>
          {(isOpen, setIsOpen) => (
            <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
              <Disclosure visible={isOpen} onToggle={setIsOpen}>
                <Disclosure.Toggle>
                  {(props) => (
                    <Button {...props} kind="secondary">
                      <Button.Label>{isOpen ? "Hide" : "Show"} Details</Button.Label>
                    </Button>
                  )}
                </Disclosure.Toggle>
                <Disclosure.Content>
                  {(props) => (
                    <div {...props} className={styles.content}>
                      <p>State is controlled by parent component.</p>
                      <p>Current state: {isOpen ? "Visible" : "Hidden"}</p>
                    </div>
                  )}
                </Disclosure.Content>
              </Disclosure>
              <p style={ { fontSize: "12px", color: "#666" } }>
                Click &quot;Toggle&quot; or the button to control visibility
              </p>
            </div>
          )}
        </ValueProvider>
      )}
    </Cover>
  ),
};

export const MultipleDisclosuresFAQPattern = {
  tags: ["!dev"],
  render: () => {
    const questions = ["What is this?", "How do I use it?", "Is it accessible?"];

    return (
      <Cover kind={"card"}>
        {() => (
          <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
            {questions.map((question, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <ValueProvider key={`question-${idx}`} initialValue={false}>
                {(isOpen, setIsOpen) => (
                  <Disclosure visible={isOpen} keepMounted={false} onToggle={setIsOpen}>
                    <Disclosure.Toggle>
                      {(props) => (
                        <Button
                          {...props}
                          kind="tertiary"
                          style={ { display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-start", width: "100%" } }
                        >
                          <ChevronDown
                            style={ {
                              transform: props.visible ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 200ms ease",
                              width: "16px",
                              height: "16px",
                            } }
                          />
                          <Button.Label>{question}</Button.Label>
                        </Button>
                      )}
                    </Disclosure.Toggle>
                    <Disclosure.Content>
                      {(props) => (
                        <div {...props} className={styles.content}>
                          <p>
                            Answer to &quot;{question}&quot;: Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                        </div>
                      )}
                    </Disclosure.Content>
                  </Disclosure>
                )}
              </ValueProvider>
            ))}
          </div>
        )}
      </Cover>
    );
  },
};
