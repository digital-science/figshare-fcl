import React from "react";
import PropTypes from "prop-types";

import SelectWithSummary from "./SelectWithSummary";
import Summary from "./Summary";


export { Summary };
export default SelectWithSummary;

// Export uncontrolled variant
export const UncontrolledSelectWithSummary = React.forwardRef(({
  defaultValue,
  onChange: onChangeCallback,
  ...props
}, ref) => {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = React.useCallback((newValue) => {
    setValue(newValue);
    onChangeCallback?.(newValue);
  }, [onChangeCallback]);

  return (
    <SelectWithSummary
      {...props}
      ref={ref}
      value={value}
      onChange={handleChange}
    />
  );
});

UncontrolledSelectWithSummary.displayName = "UncontrolledSelectWithSummary";

UncontrolledSelectWithSummary.propTypes = {
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

UncontrolledSelectWithSummary.defaultProps = {
  defaultValue: undefined,
  onChange: () => undefined,
};
