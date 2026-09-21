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

type TagComponent = React.FC<TagProps> & { colors: typeof TAG_COLORS };

export const Tag: TagComponent = ({ children, pill, color, className }: TagProps) => {
  return (
    <div
      data-part="tag"
      data-color={color}
      className={classnames(styles.tag, { [styles.pill]: pill }, className)}
    >
      <span>
        {children}
      </span>
    </div>
  );
};

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
