import React, { useContext } from "react";
import { string, oneOf } from "prop-types";
import classnames from "classnames";

import OrientationContext from "../../helpers/OrientationContext";

import styles from "./Separator.module.css";


type OrientationValue = "horizontal" | "vertical";
type OrientationValueAlias = "rows" | "columns";

type SeparatorProps = {
  className?: string;
  orientation?: OrientationValue | OrientationValueAlias;
  margin?: true | false | "small";
  role?: string;
};

const ORIENTATION_MAP = { horizontal: "horizontal", vertical: "vertical", rows: "horizontal", columns: "vertical" };

export function Separator({ className, orientation, margin = true, role, ...props }: SeparatorProps) {
  const contextual = useContext(OrientationContext);
  const finalOrientation = (ORIENTATION_MAP[orientation] ?? contextual) as OrientationValue;

  return (
    <span
      role={role}
      aria-orientation={finalOrientation}
      className={classnames(styles.separator, className)}
      data-part="separator"
      data-scope="list"
      data-margin={margin}
      {...props}
    />
  );
}


Separator.propTypes = {
  className: string,
  orientation: oneOf(["vertical", "horizontal", "rows", "columns"]),
  margin: oneOf([true, false, "small"]),
  role: string,
};
Separator.defaultProps = { className: undefined, orientation: undefined, margin: true, role: "separator" };

export default Separator;
