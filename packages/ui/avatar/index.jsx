import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { string, object } from "prop-types";
import classnames from "classnames";

import styles from "./index.css";


const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export const Avatar = forwardRef(function Avatar(props, ref) {
  const {
    className,
    firstName = "", lastName = "",
    imageProps = {}, initialsProps = {},
    url: givenUrl,
  } = props;
  const [state, setState] = useState({ browser: false, loaded: false, error: false, url: givenUrl });
  const { browser, loaded, error, url } = state;

  useEffect(() => {
    setState({
      browser: true,
      url: givenUrl,
      error: !givenUrl,
      loaded: false,
    });
  }, [givenUrl]);

  const fullName = useMemo(() => `${firstName} ${lastName}`.trim(), [firstName, lastName]);
  const initialsStr = useMemo(() => {
    const a = firstName?.[0] ?? "";
    const b = lastName?.[0] ?? "";

    return `${a}${b}`;
  }, [firstName, lastName]);
  const initialsAriaHidden = (loaded && !error) || undefined;

  const src = !browser || error ? BLANK_IMAGE : url;
  const imageAriaHidden = !loaded || error || undefined;
  const onImageLoad = useCallback(() => setState((prev) => {
    return { ...prev, loaded: true };
  }), [setState]);
  const onImageError = useCallback(() => setState((prev) => {
    return { ...prev, error: true };
  }), [setState]);

  return (
    <div
      ref={ref}
      className={classnames(styles.avatar, className)}
    >
      <div
        aria-hidden={initialsAriaHidden}
        aria-label={fullName}
        className={styles.initials}
        role="img"
        title={fullName}
        {...initialsProps}
      >
        {initialsStr}
      </div>
      {!error &&
      <img
        alt={fullName}
        aria-hidden={imageAriaHidden}
        className={styles.image}
        src={src}
        onError={onImageError}
        onLoad={onImageLoad}
        {...imageProps}
      />
      }
    </div>);
});


Avatar.propTypes = {
  className: string,
  firstName: string,
  imageProps: object,
  initialsProps: object,
  lastName: string,
  url: string,
};

Avatar.defaultProps = {
  className: undefined,
  firstName: "",
  imageProps: {},
  initialsProps: {},
  lastName: "",
  url: "",
};

export default Avatar;
