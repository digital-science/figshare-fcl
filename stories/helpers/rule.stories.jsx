import React, { Fragment } from "react";

import { all } from "./a11y/index.stories";
import styles from "./rule.css";


const renderChildren = (children) => {
  if (!children) {
    return null;
  }

  return (
    <Fragment>
      <hr />
      {children}
    </Fragment>
  );
};

export const renderLink = (href, text) => {
  if (!href) {
    return null;
  }

  return (
    <Fragment>
      <a href={href} rel="noopener noreferrer" target="_blank">
        {text}
      </a>
      {" | "}
    </Fragment>
  );
};

export const rule = ({ id, children }) => {
  const item = all[id];

  if (!item) {
    return null;
  }

  const {
    type,
    titleExtended,
    desc,
    wcagUrl,
    wcagSuccessUrl,
    wuhcagUrl,
  } = item;

  return (
    <div className={styles.rule}>
      <div className={styles.title}>
        {`(${type}) `}
        {titleExtended}
      </div>
      <div className={styles.links}>
        {"| "}
        {renderLink(wcagUrl, "wcag")}
        {renderLink(wcagSuccessUrl, "wcagSuccess")}
        {renderLink(wuhcagUrl, "wuhcag")}
      </div>
      <span className={styles.description}>{desc}</span>
      {renderChildren(children)}
    </div>
  );
};

export default { title: "Helpers/Rule", includeStories: [] };
