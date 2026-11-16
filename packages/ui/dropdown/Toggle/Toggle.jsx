import { useContext } from "react";
import { func, oneOf, string } from "prop-types";

import Context from "../context";


const DropdownToggle = ({ children, pattern, controls, ...props }) => {
  const context = useContext(Context);

  const { isVisible, onToggle, toggleRef } = context;

  // A disclosure toggle is a plain button that shows/hides a group of links or actions.
  // The combobox pattern (default) is only appropriate for select-like popups.
  const toggleProps = pattern === "disclosure" ? { "aria-controls": isVisible ? controls : undefined } : { "aria-haspopup": "listbox", role: "combobox" };

  return children({
    isVisible,
    onToggle,
    props: {
      ref: toggleRef,
      "aria-expanded": !!isVisible,
      ...toggleProps,
    },
    ...props,
  });
};

DropdownToggle.propTypes = {
  children: func.isRequired,
  /**
    Id of the element the toggle shows/hides. Only used by the `disclosure` pattern.
   */
  controls: string,
  /**
    `combobox` (default) keeps the select-like semantics. `disclosure` renders no role
    so the toggle is exposed as a regular button with `aria-expanded`.
   */
  pattern: oneOf(["combobox", "disclosure"]),
};

DropdownToggle.defaultProps = { controls: undefined, pattern: "combobox" };

export default DropdownToggle;
