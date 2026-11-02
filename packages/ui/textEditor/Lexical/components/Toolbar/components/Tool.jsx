import React, { Fragment } from "react";
import { string, bool, node, func, any } from "prop-types";

import { Button } from "../../../../../latest/Button";

import styles from "./Tool.module.css";


export function Tool({ active, disabled, label, type, group, icon: Icon, onToolSelect }) {

  return (
    <Button
      key={type}
      aria-label={label}
      className={styles.tool}
      data-tool-active={active}
      data-tool-group={group}
      data-tool-type={type}
      disabled={disabled}
      em="high"
      kind="tertiary"
      span="icon"
      tooltip={label}
      onClick={onToolSelect}
    >
      <Button.Icon><Icon /></Button.Icon>
    </Button>
  );
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
