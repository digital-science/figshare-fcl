import React, { useState, useCallback } from "react";
import { Button } from "@digital-science/figshare-fcl/button";
import { Toggletip, Trigger, Content } from "@digital-science/figshare-fcl/toggletip";

import { Cover } from "../story-utils/Cover";

import styles from "./index.stories.module.css";


export default {
  title: "UI/Toggletip",
  component: Toggletip,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {() => {
        const [isVisible, setIsVisible] = useState(false);
        const onToggle = useCallback(() => {
          setIsVisible((visible) => !visible);
        });

        return (
          <Toggletip isVisible={isVisible} onToggle={onToggle}>
            {() => (
              <span>
                <Trigger>
                  {({ ...triggerProps }) => (
                    <div className={styles.wrapperDiv} {...triggerProps}>
                      <Button>Button Trigger</Button>
                    </div>
                  )}
                </Trigger>
                <Content>
                  {() => (
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis quis nisi sollicitudin cursus.
                      <button>Focusable element</button>
                      Morbi tincidunt posuere leo. Maecenas eu justo imperdiet, tempor magna at, tempus dui. Quisque ante augue,

                      pellentesque venenatis commodo et, viverra et lectus. Etiam id vehicula dui. Quisque ac massa faucibus,
                    </span>
                  )}
                </Content>
              </span>
            )}
          </Toggletip>
        );
      }}
    </Cover>
  ),
};
