import React, { useState, useContext, createContext, useCallback, useMemo, useRef, useEffect } from "react";

import type {
  DisclosureContextValue,
  DisclosureComponent,
  DisclosureProps,
  DisclosureToggleProps,
  DisclosureContentProps,
  ToggleRenderProps,
  ContentRenderProps,
} from "./types";
import { useId } from "../../hooks/useId";

const DisclosureContext = createContext<DisclosureContextValue>({
  id: "",
  visible: false,
  onToggle: null,
  keepMounted: true,
});

export const Disclosure: DisclosureComponent = ({
  children,
  visible: controlledVisible,
  onToggle,
  defaultVisible = false,
  keepMounted = true,
}: DisclosureProps) => {
  const [uncontrolledVisible, setUncontrolledVisible] = useState(defaultVisible);
  const id = useId();
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : uncontrolledVisible;

  const visibleRef = useRef(visible);
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  const handleToggle = useCallback(() => {
    const newVisible = !visibleRef.current;
    if (!isControlled) {
      setUncontrolledVisible(newVisible);
    }
    onToggle?.(newVisible);
  }, [isControlled, onToggle]);

  const contextValue = useMemo(() => {
    return {
      id,
      visible,
      onToggle: handleToggle,
      keepMounted,
    };
  }, [id, visible, handleToggle, keepMounted]);

  return (
    <DisclosureContext.Provider value={contextValue}>
      {children}
    </DisclosureContext.Provider>
  );
};

Disclosure.displayName = "Disclosure";

export const DisclosureToggle = ({ children }: DisclosureToggleProps) => {
  const context = useContext(DisclosureContext);

  const props: ToggleRenderProps = {
    visible: context.visible,
    "aria-controls": context.id,
    "aria-expanded": context.visible,
    role: "button",
    onClick: context.onToggle,
  };

  return children(props);
};

DisclosureToggle.displayName = "DisclosureToggle";

export const DisclosureContent = ({ children }: DisclosureContentProps) => {
  const context = useContext(DisclosureContext);

  const props: ContentRenderProps = {
    id: context.id,
    visible: context.visible,
    "aria-hidden": !context.visible,
  };

  if (!context.keepMounted && !context.visible) {
    return null;
  }

  return children(props);
};

DisclosureContent.displayName = "DisclosureContent";

Disclosure.Toggle = DisclosureToggle;
Disclosure.Content = DisclosureContent;

export default Disclosure;
