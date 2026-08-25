import React from "react";
import PropTypes from "prop-types";


export function ValueProvider({ initialValue, children }) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <>{children(value, setValue)}</>;
}

ValueProvider.propTypes = {
  children: PropTypes.func.isRequired,
  initialValue: PropTypes.any,
};

ValueProvider.defaultProps = { initialValue: undefined };
