import React, { Fragment } from "react";
import { string, bool, node, func, any } from "prop-types";

import { IconButton } from "../../../../../button";

import styles from "./Tool.module.css";


export function Tool({ active, disabled, label, type, group, icon, onToolSelect }) {

  return (
    <IconButton
      key={type}
      Icon={icon}
      aria-label={label}
      className={styles.tool}
      data-tool-active={active}
      data-tool-group={group}
      data-tool-type={type}
      disabled={disabled}
      theme="primary"
      onClick={onToolSelect}
    >
      {label}
    </IconButton>);
}

Tool.propTypes = {
  group: string.isRequired,
  label: node.isRequired,
  type: string.isRequired,
  onToolSelect: func.isRequired,
  active: bool,
  disabled: bool,
  icon: any,
};

Tool.defaultProps = { active: false, disabled: false, icon: Fragment };

export default Tool;
