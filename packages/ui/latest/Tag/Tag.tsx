import React from "react";
import classnames from "classnames";

import styles from "./Tag.module.css";

type TagColors = "neutral" | "blue" | "green" | "green-filled" | "orange" | "red" | "purple";

type TagProps = {
  children: React.ReactNode;
  pill?: boolean;
  color?: TagColors;
  className?: string;
};

type TagComponent = React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLDivElement>> & { colors: typeof TAG_COLORS };

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(({ children, pill, color, className }, ref) => {
  return (
    <div
      ref={ref}
      data-part="tag"
      data-color={color}
      className={classnames(styles.tag, { [styles.pill]: pill }, className)}
    >
      <span>
        {children}
      </span>
    </div>
  );
}) as TagComponent;

Tag.displayName = "Tag";

const TAG_COLORS = {
  neutral: "neutral",
  blue: "blue",
  green: "green",
  greenFilled: "green-filled",
  orange: "orange",
  red: "red",
  purple: "purple",
};

Tag.colors = TAG_COLORS;

export default Tag;
