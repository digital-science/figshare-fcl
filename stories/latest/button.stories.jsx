/* eslint-disable react/prop-types */
import React from "react";
import { Button } from "@digital-science/figshare-fcl/latest/Button";
import { bindLinkComponent } from "@digital-science/figshare-fcl/latest/Button/anchor";
import { Checkmark, Delete, Copy, Download, Eye, Edit } from "@digital-science/figshare-fcl/icons/react";

import { Cover } from "../story-utils/Cover";

// Mock Link component that simulates a router link (e.g., React Router's <Link>).
// Renders a <mark> tag so it's visually distinct in the story.
const MockRouterLink = React.forwardRef(({ to, children, ...rest }, ref) => (
  <a ref={ref} data-router-link={to} {...rest} style={ { cursor: "alias" } }>{children}</a>
));
MockRouterLink.displayName = "MockRouterLink";


export default {
  title: "UI/latest/Button",
  component: Button,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind="story">
      <div style={ { display: "flex", flexDirection: "row", gap: "12px", flexWrap: "wrap" } }>
        <Button kind="primary"><Button.Label>Primary</Button.Label></Button>
        <Button kind="secondary"><Button.Label>Secondary</Button.Label></Button>
        <Button kind="tertiary"><Button.Label>Tertiary</Button.Label></Button>
      </div>
    </Cover>
  ),
};

export const PrimaryButtons = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Primary - High Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" em="high"><Button.Label>Primary</Button.Label></Button>
            <Button disabled={true} kind="primary" em="high"><Button.Label>Disabled</Button.Label></Button>
            <Button loading={true} kind="primary" em="high"><Button.Label>Loading</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Primary - Success</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" em="success"><Button.Label>Success</Button.Label></Button>
            <Button disabled={true} kind="primary" em="success"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Primary - Danger</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" em="danger"><Button.Label>Danger</Button.Label></Button>
            <Button disabled={true} kind="primary" em="danger"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const SecondaryButtons = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Secondary - High Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" em="high"><Button.Label>Secondary</Button.Label></Button>
            <Button disabled={true} kind="secondary" em="high"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Secondary - Low Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" em="low"><Button.Label>Secondary Low</Button.Label></Button>
            <Button disabled={true} kind="secondary" em="low"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Secondary - Success</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" em="success"><Button.Label>Success</Button.Label></Button>
            <Button disabled={true} kind="secondary" em="success"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Secondary - Danger</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" em="danger"><Button.Label>Danger</Button.Label></Button>
            <Button disabled={true} kind="secondary" em="danger"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const TertiaryButtons = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Tertiary - High Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="tertiary" em="high"><Button.Label>Tertiary</Button.Label></Button>
            <Button disabled={true} kind="tertiary" em="high"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Tertiary - Low Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="tertiary" em="low"><Button.Label>Tertiary Low</Button.Label></Button>
            <Button disabled={true} kind="tertiary" em="low"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Tertiary - Danger</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="tertiary" em="danger"><Button.Label>Danger</Button.Label></Button>
            <Button disabled={true} kind="tertiary" em="danger"><Button.Label>Disabled</Button.Label></Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const ButtonWithIcons = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Icon Only - Various Kinds and Emphasis</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" em="high" span="icon" title="View">
              <Button.Icon><Eye /></Button.Icon>
            </Button>
            <Button kind="secondary" em="high" span="icon" title="Edit">
              <Button.Icon><Edit /></Button.Icon>
            </Button>
            <Button kind="tertiary" em="low" span="icon" title="Delete">
              <Button.Icon><Delete /></Button.Icon>
            </Button>
            <Button kind="primary" em="success" span="icon" title="Confirm">
              <Button.Icon><Checkmark /></Button.Icon>
            </Button>
          </div>
        </div>
        <div>
          <h4>Icon with Label - Primary Kind</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" em="high">
              <Button.Icon><Download /></Button.Icon>
              <Button.Label>Download</Button.Label>
            </Button>
            <Button kind="primary" em="success">
              <Button.Icon><Checkmark /></Button.Icon>
              <Button.Label>Confirm</Button.Label>
            </Button>
          </div>
        </div>
        <div>
          <h4>Icon with Label - Secondary Kind</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" em="high">
              <Button.Icon><Copy /></Button.Icon>
              <Button.Label>Copy</Button.Label>
            </Button>
            <Button kind="secondary" em="low">
              <Button.Icon><Edit /></Button.Icon>
              <Button.Label>Edit</Button.Label>
            </Button>
          </div>
        </div>
        <div>
          <h4>Icon with Label - Tertiary Kind</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="tertiary" em="high">
              <Button.Icon><Eye /></Button.Icon>
              <Button.Label>Preview</Button.Label>
            </Button>
            <Button kind="tertiary" em="danger">
              <Button.Icon><Delete /></Button.Icon>
              <Button.Label>Remove</Button.Label>
            </Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const ButtonSizesAndSpans = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Full Width</h4>
          <Button kind="primary" span="full"><Button.Label>Full Width Button</Button.Label></Button>
        </div>
        <div>
          <h4>Half Width</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="secondary" span="half"><Button.Label>Half Width</Button.Label></Button>
            <Button kind="tertiary" span="half"><Button.Label>Half Width</Button.Label></Button>
          </div>
        </div>
        <div>
          <h4>Icon Only</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="tertiary" span="icon" title="Search">
              <Button.Icon><Eye /></Button.Icon>
            </Button>
            <Button kind="primary" span="icon" title="Confirm">
              <Button.Icon><Checkmark /></Button.Icon>
            </Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const InlineButtons = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Inline Button - Tertiary</h4>
          <p>This is a paragraph with an <Button kind="tertiary" inline={true}><Button.Label>inline button</Button.Label></Button> in the text.</p>
        </div>
        <div>
          <h4>Inline Button - Primary</h4>
          <p>This is a paragraph with a <Button kind="primary" inline={true}><Button.Label>primary inline button</Button.Label></Button> in the text.</p>
        </div>
        <div>
          <h4>Slim Inline - Tertiary</h4>
          <p>This is a paragraph with a <Button kind="tertiary" inline="slim"><Button.Label>slim inline button</Button.Label></Button> in the text.</p>
        </div>
        <div>
          <h4>Slim Inline - Primary</h4>
          <p>This is a paragraph with a <Button kind="primary" inline="slim"><Button.Label>slim primary button</Button.Label></Button> in the text.</p>
        </div>
        <div>
          <h4>Slim Inline - Secondary</h4>
          <p>This is a paragraph with a <Button kind="secondary" inline="slim"><Button.Label>slim secondary button</Button.Label></Button> in the text.</p>
        </div>
      </div>
    </Cover>
  ),
};

export const LoadingStates = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Loading - Various Kinds</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" loading={true}><Button.Label>Processing</Button.Label></Button>
            <Button kind="secondary" loading={true}><Button.Label>Loading</Button.Label></Button>
            <Button kind="tertiary" loading={true}><Button.Label>Wait</Button.Label></Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const AnchorLinks = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Default anchor links (no binding)</h4>
          <p>Without <code>bindLinkComponent</code>, buttons with <code>href</code> render plain anchor tags.</p>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" href="/internal-page">
              <Button.Label>Internal link (plain anchor)</Button.Label>
            </Button>
            <Button kind="secondary" href="https://example.com">
              <Button.Label>External link</Button.Label>
            </Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const BoundLinkComponent = {
  tags: ["!dev"],
  render: () => {
    const [bound, setBound] = React.useState(false);

    const onToggleBinding = React.useCallback(() => {
      setBound((currentBoundState) => {
        if (currentBoundState) {
          bindLinkComponent({ component: "a" });
        } else {
          bindLinkComponent({ component: MockRouterLink });
        }

        return !currentBoundState;
      });
    }, [setBound]);

    return (
      <Cover key={`bound-link-component-${bound}`} kind="card">
        <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
          <div>
            <h4>Bound Link Component</h4>
            <p>
              After calling <code>bindLinkComponent</code>, internal links render through the bound component
              (inspect the DOM — you will see an <code>&lt;a&gt;</code> with a <code>data-router-link</code> attribute) and a custom cursor style.
            </p>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px", margin: "0 0 12px 0" } }>
              <Button tooltip="Toggle the bound link component between the default anchor and a custom link component" onClick={onToggleBinding}>
                <Button.Label>{bound ? "Toggle: Unbind" : "Toggle: Bind"}</Button.Label>
              </Button>
            </div>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
              <Button kind="primary" href="/dashboard">
                <Button.Icon><Eye /></Button.Icon>
                <Button.Label>Dashboard {bound ? "(routed)" : "(not routed)"}</Button.Label>
              </Button>
              <Button kind="secondary" href="/settings">
                <Button.Label>Settings {bound ? "(routed)" : "(not routed)"}</Button.Label>
              </Button>
            </div>
          </div>
          <div>
            <h4>External links remain plain anchors</h4>
            <p>External URLs and the <code>external</code> prop bypass the bound component.</p>
            <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
              <Button kind="tertiary" href="https://figshare.com">
                <Button.Label>External URL (plain anchor)</Button.Label>
              </Button>
              <Button kind="tertiary" href="/forced-external" external={true}>
                <Button.Label>Forced external (plain anchor)</Button.Label>
              </Button>
            </div>
          </div>
        </div>
      </Cover>
    );
  },
};

export const Tooltips = {
  tags: ["!dev"],
  render: () => (
    <Cover kind="card">
      <div style={ { display: "flex", flexDirection: "column", gap: "24px" } }>
        <div>
          <h4>Icon Buttons with Tooltips</h4>
          <div style={ { display: "flex", flexDirection: "row", gap: "12px" } }>
            <Button kind="primary" span="icon" title="Download the file">
              <Button.Icon><Download /></Button.Icon>
            </Button>
            <Button kind="secondary" span="icon" title="Edit this item">
              <Button.Icon><Edit /></Button.Icon>
            </Button>
            <Button kind="tertiary" span="icon" title="Delete permanently">
              <Button.Icon><Delete /></Button.Icon>
            </Button>
          </div>
        </div>
      </div>
    </Cover>
  ),
};
