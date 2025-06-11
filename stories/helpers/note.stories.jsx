import classnames from "classnames";
import React from "react";
import Eye from "@digital-science/figshare-fcl/icons/eye/visible/medium";
import Info from "@digital-science/figshare-fcl/icons/info/medium";
import Warning from "@digital-science/figshare-fcl/icons/warning/medium";

import styles from "./note.css";


const styleTypes = {
  note: styles.note,
  tip: styles.tip,
  info: styles.info,
  warning: styles.warning,
  danger: styles.danger,
};

const icons = {
  note: Info,
  tip: Info,
  info: Info,
  warning: Warning,
  danger: Eye,
};

export const note = ({ type = "note", label, children }) => {
  const Icon = icons[type];
  const containerClassNames = [styles.container, styleTypes[type]];

  return (
    <div className={classnames(containerClassNames)}>
      <div className={styles.title}>
        <Icon className={styles.icon} />
        {label}
      </div>
      {children}
    </div>
  );
};
