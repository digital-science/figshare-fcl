import classnames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Logo from "./logo";
import Text from "./text";
import styles from "./index.module.css";


export default class FigshareFullLogo extends PureComponent {
  static propTypes = { className: PropTypes.string }

  static defaultProps = { className: styles.default }

  render() {
    const { className, ...props } = this.props;

    return (
      <figure
        aria-label="figshare"
        role="img"
        {...props}
        className={classnames(styles.figure, className)}
      >
        <Logo className={styles.logo} />
        <Text className={styles.text} />
      </figure>
    );
  }
}
