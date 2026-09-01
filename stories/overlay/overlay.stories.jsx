import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, GenericButton } from "@digital-science/figshare-fcl/button";
import { Input } from "@digital-science/figshare-fcl/input";
import { Overlay, OverlayHeader, OverlayFooter, OverlayContent } from "@digital-science/figshare-fcl/overlay";
import { Trigger, Content, UncontrolledToggletip } from "@digital-science/figshare-fcl/toggletip";

import { Cover } from "../story-utils/Cover";

import style from "./overlay.stories.module.css";


const MoreContent = () => {
  const content = useMemo(() => (Array.from(new Array(20), (v, i) =>
    (<p key={i}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis quis nisi sollicitudin cursus.</p>))), []);

  return (<>
    <p>Scroll down...</p>
    {content}
    <p>Done.</p>
  </>);
}

const Example = ({ children }) => {
  const [opened, setOpened] = useState("");
  const [more, setMore] = useState(false);

  return (<>
    {children}
    <div className={style.buttons}>
      <Button onClick={() => setOpened("primary-overlay")}>Open Overlay</Button>
      <Button onClick={() => setOpened("form-overlay")}>Open Form Overlay</Button>
      <Button onClick={() => setOpened("warning-overlay")}>Open Warning</Button>
    </div>
    <Overlay isVisible={opened.includes("primary-overlay")} onClose={() => setOpened("")}>
      <OverlayHeader title="Overlay Title" description="Overlay description" />
      <OverlayContent>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis quis nisi sollicitudin cursus.</p>
        <Button onClick={() => setOpened("primary-overlay warning-overlay")}>Open Warning Overlay</Button>
        <br />
        <Button onClick={() => setOpened("primary-overlay form-overlay")}>Open Form Overlay</Button>
        <br />
        <Input type="date" onChange={() => undefined} />
        <br />
        <UncontrolledToggletip>
          <Trigger>
            {({ ref, ...props }) => <Button {...props} innerRef={ref}>Popup</Button>}
          </Trigger>
          <Content>
            {() => (
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis quis nisi sollicitudin cursus.
                <button>Focusable element</button>
                Morbi tincidunt posuere leo. Maecenas eu justo imperdiet, tempor magna at, tempus dui. Quisque ante augue,
                <input value="static value, but focusable element" readOnly={true} />
                pellentesque venenatis commodo et, viverra et lectus. Etiam id vehicula dui. Quisque ac massa faucibus,
              </div>
            )}
          </Content>
        </UncontrolledToggletip>
      </OverlayContent>
      <OverlayFooter>
        <OverlayFooter.Primary>
          <Button theme="secondary" onClick={() => setOpened("")}>Close</Button>
          <Button theme="primary" onClick={() => setOpened("")}>Confirm</Button>
        </OverlayFooter.Primary>
      </OverlayFooter>
    </Overlay>
    <Overlay background="warning" isVisible={opened.includes("warning-overlay")} onClose={() => setOpened((o) => o.replace("warning-overlay", ""))}>
      <OverlayHeader title="Overlay Title" description="Overlay description" />
      <OverlayContent>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at turpis quis nisi sollicitudin cursus.</p>
        <Button theme="primary">Button</Button>
        <br />
        <Input type="date" onChange={() => undefined} />
      </OverlayContent>
      <OverlayFooter>
        <Button theme="primary" onClick={() => setOpened((o) => o.replace("warning-overlay", ""))}>Close</Button>
      </OverlayFooter>
    </Overlay>
    <Overlay background="primary" variant="formModal" isVisible={opened.includes("form-overlay")} onClose={() => setOpened((o) => o.replace("form-overlay", ""))}>
      <OverlayContent>
        <OverlayHeader isPartOfContent={true} title="Form Overlay Title" description="Wide overlay that covers the whole viewport height wise." />
        <p>Click on the More button to make the content scrollable.<br />You can render OverlayHeader inside OverlayContent to allow it to scroll with the content, and the component can be customised for this case by setting the isPartOfContent property to true.<br />Check the Example code or PropsTable in the docs section.</p>
        <br />
        <Button theme="primary" onClick={() => setMore((m) => !m)}>More</Button>
        <br />
        {more && <MoreContent />}
      </OverlayContent>
      <OverlayFooter>
        <OverlayFooter.Secondary>
          <GenericButton onClick={() => setMore((m) => !m)}>Show more content</GenericButton>
        </OverlayFooter.Secondary>
        <OverlayFooter.Primary>
          <Button theme="secondary" onClick={() => setOpened((o) => o.replace("form-overlay", ""))}>Close</Button>
          <Button theme="primary" onClick={() => setOpened((o) => o.replace("form-overlay", ""))}>Confirm</Button>
        </OverlayFooter.Primary>
      </OverlayFooter>
    </Overlay>
  </>);
}

Example.propTypes = { children: PropTypes.node };
Example.defaultProps = { children: null };

export default {
  title: "UI/Overlay",
  component: Overlay,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      {({ background }) => {
        const [opened, setOpened] = useState("");

        return (
          <>
            <div className={style.buttons}>
              <Button onClick={() => setOpened(true)}>Open Overlay</Button>
              <Overlay background={background} isVisible={opened} onClose={() => setOpened(false)}>
                <OverlayHeader title="Title" description="Summary description" />
                <OverlayContent>
                  The majority of the overlay content goes here.
                  <br />
                  Especially useful for delimiting content, that can sometimes, depending on available space, be scrolled through.
                </OverlayContent>
                <OverlayFooter>
                  <Button theme="primary" onClick={() => setOpened(false)}>Close</Button>
                </OverlayFooter>
              </Overlay>
            </div>
          </>
        )
      }}
    </Cover>
  ),
};

export const Examples = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <Example />
    </Cover>
  ),
};
