import React, { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { bool, string, object } from "prop-types";
import classnames from "classnames";

import styles from "./index.module.css";


const BLANK_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export const Avatar = forwardRef(function Avatar(props, ref) {
  const {
    className,
    decorative = false,
    firstName = "", lastName = "",
    imageProps = {}, initialsProps = {},
    url: givenUrl,
    ...rest
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
  // When decorative (the name is already conveyed elsewhere) or unnamed, the avatar is hidden from assistive tech.
  const hasName = !decorative && !!fullName;
  const initialsAriaHidden = !hasName || (loaded && !error) || undefined;

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
      {...rest}
      ref={ref}
      className={classnames(styles.avatar, className)}
    >
      <div
        aria-hidden={initialsAriaHidden}
        aria-label={hasName ? fullName : undefined}
        className={styles.initials}
        role={hasName ? "img" : undefined}
        {...initialsProps}
      >
        {initialsStr}
      </div>
      {!error &&
      <img
        alt={hasName ? fullName : ""}
        aria-hidden={imageAriaHidden}
        className={styles.image}
        src={src}
        onError={onImageError}
        onLoad={onImageLoad}
        {...imageProps}
      />
      }
    </div>
  );
});


Avatar.propTypes = {
  className: string,
  /**
    Hides the avatar from assistive technology. Use when the user's name is already provided by adjacent text or a label.
   */
  decorative: bool,
  firstName: string,
  imageProps: object,
  initialsProps: object,
  lastName: string,
  url: string,
};

Avatar.defaultProps = {
  className: undefined,
  decorative: false,
  firstName: "",
  imageProps: {},
  initialsProps: {},
  lastName: "",
  url: "",
};

export default Avatar;
