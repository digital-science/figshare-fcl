import React from "react";
import PropTypes from "prop-types";
import serialize from "serialize-javascript";


export function WindowInjection({ data, globalName, isJSON = true, nonce = "" }) {
  if (!globalName || !data) {
    return null;
  }

  const safeValue = serialize(data, { isJSON });
  const dataInjection = `;(function() { window.${globalName} = ${safeValue}; }());`;

  return <script dangerouslySetInnerHTML={ { __html: dataInjection } } nonce={nonce} />;
}

WindowInjection.propTypes = {
  data: PropTypes.object.isRequired,
  globalName: PropTypes.string.isRequired,
  isJSON: PropTypes.bool,
  nonce: PropTypes.string,
};

WindowInjection.defaultProps = {
  isJSON: true,
  nonce: "",
};
