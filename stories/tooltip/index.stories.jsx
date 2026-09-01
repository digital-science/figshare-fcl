import React from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import { Content, Trigger, UncontrolledTooltip as Tooltip } from "@digital-science/figshare-fcl/tooltip";

import { Cover } from "../story-utils/Cover";

import styles from "./index.stories.module.css";


export default {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => (
        <>
          <h3>Tooltip will be bottom</h3>
          <Tooltip>{() => (
            <span>
              <Trigger>
                {({ ...props }) => (<div className={styles.wrapperDiv} {...props}><Button>Button trigger</Button></div>)}
              </Trigger>
              <Content>
                {({ ...props }) => (
                  <div {...props}>
                    Tooltip content
                  </div>)}
              </Content>
            </span>
          )}
          </Tooltip>
        </>
      )}
    </Cover>
  ),
};
