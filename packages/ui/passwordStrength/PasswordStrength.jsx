import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import Warning from "@digital-science/figshare-fcl/icons/react/Warning";
import Checkmark from "@digital-science/figshare-fcl/icons/react/Checkmark";
import CircleSolid from "@digital-science/figshare-fcl/icons/react/CircleSolid";

import styles from "./PasswordStrength.module.css";


export const PasswordStrength = ({
  allRulesPassedText = "",
  failedRuleType = "default",
  passed = false,
  text = "",
  rules = [],
}) => {
  const renderHeader = () => {
    let headerText = text;

    if (passed) {
      headerText = allRulesPassedText;
    }

    return (
      <div className={classnames(styles.header, { [styles.success]: passed })}>
        {headerText}
      </div>
    );
  };

  const renderRule = (rule, index) => {
    let iconText = "Dot Icon";
    let icon = (
      <CircleSolid
        aria-label={iconText}
        className={styles.dotIcon}
        role="img"
      />
    );
    let showError = false;

    if (!rule.passed && failedRuleType === "error") {
      iconText = "Warning icon";
      icon = (
        <Warning
          aria-label={iconText}
          className={styles.errorIcon}
          role="img"
        />
      );
      showError = true;
    }

    if (rule.passed) {
      iconText = "Checkmark icon";
      icon = (
        <Checkmark
          aria-label={iconText}
          className={styles.checkMarkIcon}
          role="img"
        />
      );
    }

    return (
      <li key={index} className={classnames(styles.rule, { [styles.error]: showError })}>
        <span className={styles.iconContainer}>
          {icon}
        </span>
        <span className={styles.speechMessage} >
          {iconText}
        </span>
        <span className={styles.ruleText}>{rule.text}</span>
      </li>
    );
  };

  const renderSpeechMessage = () => {
    let message = "";

    if (passed) {
      message = allRulesPassedText;
    } else {
      const failedRulesText = rules.
        filter((rule) => !rule.passed).
        reduce((acc, val, index, array) => {
          if (index === 0) {
            return val.text;
          }

          if (index === array.length - 1) {
            return `${acc} and ${val.text}`;
          }

          return `${acc}, ${val.text}`;
        }, "");

      message = `Please make sure the password contains: ${failedRulesText}`;
    }

    return (
      <span aria-live="assertive" className={styles.speechMessage} >
        {message}
      </span>
    );
  };

  return (
    <div>
      {renderHeader()}
      <ul className={styles.rules}>
        {rules.map(renderRule)}
      </ul>
      {renderSpeechMessage()}
    </div>
  );
};

PasswordStrength.propTypes = {
  allRulesPassedText: PropTypes.string,
  failedRuleType: PropTypes.oneOf(["default", "error"]),
  passed: PropTypes.bool,
  rules: PropTypes.array,
  text: PropTypes.string,
};

PasswordStrength.defaultProps = {
  allRulesPassedText: "",
  failedRuleType: "default",
  passed: false,
  text: "",
  rules: [],
};

export default PasswordStrength;
