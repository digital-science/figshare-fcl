import React from "react";
import { Alert } from "@digital-science/figshare-fcl/latest/Alert";

import { Cover } from "../story-utils/Cover";


export default {
  title: "UI/latest/Alert",
  component: Alert,
  parameters: { docs: { canvas: { withToolbar: true } } },
};

export const Overview = {
  render: () => (
    <Cover kind={"story"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "12px" } }>
        <Alert persistent={true} type="info" title="Information" message="This is an informational alert" />
        <Alert persistent={true} type="success" title="Success" message="The operation completed successfully" />
        <Alert persistent={true} type="warning" title="Warning" message="Please review this warning message" />
        <Alert persistent={true} type="error" title="Error" message="An error occurred" />
      </div>
    </Cover>
  ),
};

export const AlertTypes = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Info Alert</h4>
          <Alert persistent={true} type="info" title="Information" message="This is an informational message" />
        </div>
        <div>
          <h4>Success Alert</h4>
          <Alert persistent={true} type="success" title="Success" message="Your operation completed successfully" />
        </div>
        <div>
          <h4>Warning Alert</h4>
          <Alert persistent={true} type="warning" title="Warning" message="Please pay attention to this warning" />
        </div>
        <div>
          <h4>Error Alert</h4>
          <Alert persistent={true} type="error" title="Error" message="An error has occurred" />
        </div>
        <div>
          <h4>Notice Alert</h4>
          <Alert persistent={true} type="notice" title="Notice" message="This is a notice message" />
        </div>
      </div>
    </Cover>
  ),
};

export const AlertVariants = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Translucent Variant (Default)</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Alert persistent={true} type="info" variant="translucent" title="Info" message="Translucent variant" />
            <Alert persistent={true} type="success" variant="translucent" title="Success" message="Translucent variant" />
          </div>
        </div>
        <div>
          <h4>Solid Variant</h4>
          <div style={ { display: "flex", flexDirection: "column", gap: "8px" } }>
            <Alert persistent={true} type="info" variant="solid" title="Info" message="Solid variant" />
            <Alert persistent={true} type="success" variant="solid" title="Success" message="Solid variant" />
          </div>
        </div>
      </div>
    </Cover>
  ),
};

export const AlertContentOptions = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Title Only</h4>
          <Alert persistent={true} type="info" title="Information Alert" />
        </div>
        <div>
          <h4>Message Only</h4>
          <Alert persistent={true} type="success" message="Operation completed successfully" />
        </div>
        <div>
          <h4>Title and Message</h4>
          <Alert persistent={true} type="warning" title="Warning" message="Please review this warning message carefully" />
        </div>
        <div>
          <h4>With Padding</h4>
          <Alert padded={true} persistent={true} type="error" title="Error" message="An error has occurred" />
        </div>
      </div>
    </Cover>
  ),
};

export const DismissibleAlerts = {
  tags: ["!dev"],
  render: () => (
    <Cover kind={"card"}>
      <div style={ { display: "flex", flexDirection: "column", gap: "16px" } }>
        <div>
          <h4>Dismissible Alert</h4>
          <Alert
            type="info"
            title="Closeable Alert"
            message="This alert can be dismissed by clicking the close button"
            persistent={false}
            onClose={() => undefined}
          />
        </div>
      </div>
    </Cover>
  ),
};
