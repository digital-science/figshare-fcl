
// Internal reference to a link component used by the Button when rendering anchor tags.
// It can be used to override the default link component rendered by the Button component when an anchor tag is needed.

import React from "react";
import { ButtonProps } from "./types";

// For example it can be used to integrate with a routing library like React Router by providing a custom link component.
export const Link: { Internal: React.ElementType; External: React.ElementType } = {
  Internal: "a",
  External: "a",
};

function mapLinkProps({ href, external, ...rest }: any) {
  return { to: href, ...rest };
}

// Binds a custom link component to be used internally 
// and optionally externally by the Button component
// when an anchor is needed.
export function bindLinkComponent({ component, mapProps = mapLinkProps, bindExternal = false, }: { component: React.ElementType; mapProps?: (props: React.ComponentProps<any>) => React.ComponentProps<ButtonProps | any>; bindExternal?: boolean }) {
  // When binding a native element (e.g. "a"), reset directly without prop mapping
  if (typeof component === "string") {
    Link.Internal = component;

    if (bindExternal) {
      Link.External = component;
    }

    return component;
  }

  const LinkComponent = component;

  const BoundLinkComponent = React.forwardRef((props, ref) => {
    const mappedProps = mapProps(props);

    return <LinkComponent {...mappedProps} ref={ref}>{mappedProps.children}</LinkComponent>;
  });
  BoundLinkComponent.displayName = "BoundLink";


  Link.Internal = BoundLinkComponent;

  if (bindExternal) {
    Link.External = BoundLinkComponent;
  }

  return BoundLinkComponent;
}

// Function to test if a link is an external anchor
// and should not route through internal routing (e.g., handled by the browser directly).
export function isExternalLink(props: any) {
  if (props.external) {
    return true;
  }

  return typeof props.href === "string" && /^(?:https?:\/\/|ftp:\/\/|mailto:|tel:|\/\/)/i.test(props.href);
}