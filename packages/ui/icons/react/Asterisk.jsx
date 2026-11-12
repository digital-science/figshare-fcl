import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgAsterisk = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-1.06 -2.06 14.12 14.12"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      d="M0 4.71154L0.835098 2.4359C2.75946 3.03419 4.15734 3.55235 5.02874 3.99038C4.79879 2.05662 4.67776 0.726496 4.66566 0H7.29803C7.26172 1.05769 7.12254 2.38248 6.88048 3.97436C8.12708 3.4188 9.55522 2.90598 11.1649 2.4359L12 4.71154C10.4629 5.16026 8.95613 5.4594 7.47958 5.60897C8.21785 6.17521 9.2587 7.18483 10.6021 8.63782L8.4236 10C7.72163 9.15598 6.89259 8.00748 5.93646 6.55449C5.04085 8.0609 4.25416 9.2094 3.5764 10L1.43419 8.63782C2.83812 7.11004 3.84266 6.10043 4.44781 5.60897C2.88654 5.34188 1.40393 5.04274 0 4.71154Z"
      fill={props.color}
    />
  </svg>
);
SvgAsterisk.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgAsterisk.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgAsterisk.displayName = "SvgAsterisk";
const Memo = memo(SvgAsterisk);
export default Memo;
