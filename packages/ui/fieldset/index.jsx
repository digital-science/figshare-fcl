/* eslint-disable react/jsx-boolean-value */
import React from "react";
import { node, string, oneOf } from "prop-types";
import classnames from "classnames";

import styles from "./index.module.css";


export function Fieldset({ children, className, ...rest }) {
  return (
    <fieldset className={classnames(styles.fieldset, className)} {...rest}>
      {children}
    </fieldset>
  );
}

Fieldset.propTypes = {
  /**
   * Fieldset contents. Should contain a Fieldset.Legend node,
   * and optionally a Fieldset.Items node that can group and align the items (radios, inputs etc).
   */
  children: node,
  /**
   * Optional extra class for the Fieldset.
   */
  className: string,
};

Fieldset.defaultProps = {
  className: undefined,
  children: undefined,
};

Fieldset.Legend = Legend;
Fieldset.Items = Items;

export function Legend({ children, className, type, ...rest }) {
  return (
    <legend
      {...rest}
      className={classnames(styles.legend, className, {
        [styles.hidden]: type === "hidden",
        [styles.primary]: type === "primary",
        [styles.secondary]: type === "secondary",
        [styles.tertiary]: type === "tertiary",
      })}
    >{children}</legend>
  );
}

Legend.propTypes = {
  /**
   * Contents of the legend. Can be text or a complex node
   * for example one which includes an <Info/> tooltip.
   */
  children: node,
  /**
   * Optional extra class for the Legend.
   */
  className: string,
  /**
   * Visual styling choice for the legend label.
   */
  type: oneOf(["hidden", "primary", "secondary", "tertiary"]),
};

Legend.defaultProps = {
  children: node,
  className: string,
  type: "hidden",
};

export function Items({ children, className, alignment, ...rest }) {
  return (
    <div
      {...rest}
      className={classnames(styles.items, className)}
      data-alignment={alignment}
      data-fragment="fieldset-items"
    >
      {children}
    </div>
  );
}

Items.propTypes = {
  /**
   * Visual styling choice for the items flow.
   * Wether items should be displayed in a vertical or horizontal list.
   */
  alignment: oneOf(["vertical", "horizontal"]),
  /**
   * Items to group inside the fieldset. Can be a list of Radio or Checkbox components,
   * or any type of Input or field groups.
   */
  children: node,
  /**
   * Optional extra class to append to the Items node.
   */
  className: string,
};

Items.defaultProps = {
  alignment: "vertical",
  children: undefined,
  className: undefined,
};

export default Fieldset;
