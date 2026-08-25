import React, { useState, useContext, createContext, useCallback, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useId } from "../../hooks/useId";


const DisclosureContext = createContext({
  id: "",
  visible: false,
  onToggle: null,
  keepMounted: true,
});

export const Disclosure = ({
  children,
  visible: controlledVisible,
  onToggle,
  defaultVisible = false,
  keepMounted = true,
}) => {
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

Disclosure.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onToggle: PropTypes.func,
};

Disclosure.defaultProps = {
  children: null,
  visible: undefined,
  defaultVisible: false,
  onToggle: null,
  keepMounted: true,
};

export const DisclosureToggle = ({ children }) => {
  const context = useContext(DisclosureContext);

  const props = {
    visible: context.visible,
    "aria-controls": context.id,
    "aria-expanded": context.visible,
    role: "button",
    onClick: context.onToggle,
  };

  return children(props);
};

DisclosureToggle.propTypes = { children: PropTypes.func.isRequired };

export const DisclosureContent = ({ children }) => {
  const context = useContext(DisclosureContext);

  const props = {
    id: context.id,
    visible: context.visible,
    "aria-hidden": !context.visible,
  };

  if (!context.keepMounted && !context.visible) {
    return null;
  }

  return children(props);
};

DisclosureContent.propTypes = { children: PropTypes.func.isRequired };

Disclosure.Toggle = DisclosureToggle;
Disclosure.Content = DisclosureContent;

export default Disclosure;
