import * as React from "react";
import { memo } from "react";
import { oneOfType, bool, string, number } from "prop-types";
const SvgOnlineResource = (props) => (
  <svg
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 24"
    focusable={false}
    aria-hidden={true}
    role="img"
    alt={props.title}
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M12.5 7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5h-5zm.3.8v4.4h4.4V7.8h-4.4z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M20 8a.5.5 0 0 1 .5-.5h7a.5.5 0 1 1 0 1h-7A.5.5 0 0 1 20 8zM20 10a.5.5 0 0 1 .5-.5h4a.5.5 0 1 1 0 1h-4a.5.5 0 0 1-.5-.5zM20 12a.5.5 0 0 1 .5-.5h7a.5.5 0 1 1 0 1h-7a.5.5 0 0 1-.5-.5z"
      fillRule="evenodd"
      fill={props.color}
    />
    <path
      clipRule="evenodd"
      d="M0 2.667A2.667 2.667 0 0 1 2.667 0h34.666A2.667 2.667 0 0 1 40 2.667v18.666A2.667 2.667 0 0 1 37.333 24H2.667A2.667 2.667 0 0 1 0 21.333V2.667zm8.129 1.479a.447.447 0 0 1 .31-.124L31.56 4c.243 0 .44.19.44.423V17l-24 .022V4.445a.417.417 0 0 1 .129-.3zM17.424 18l-10.897-.008A.518.518 0 0 0 6 18.5c0 1.123.944 1.46 2.109 1.46l23.782.04C33.056 20 34 19.623 34 18.5a.518.518 0 0 0-.527-.508h-9.897v.274c0 .468-.394.847-.88.847h-4.393c-.485 0-.879-.379-.879-.846V18z"
      fillRule="evenodd"
      fill={props.color}
    />
  </svg>
);
SvgOnlineResource.propTypes = {
  color: string,
  height: oneOfType([string, number]),
  title: string,
  width: oneOfType([string, number]),
};
SvgOnlineResource.defaultProps = {
  color: "currentColor",
  height: undefined,
  width: "1em",
  title: "Icon",
};
SvgOnlineResource.displayName = "SvgOnlineResource";
const Memo = memo(SvgOnlineResource);
export default Memo;
