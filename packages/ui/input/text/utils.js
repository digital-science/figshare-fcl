/* eslint-disable no-inline-comments */
/**
 * Decide direction by whichever script (Arabic vs Latin) appears first in the string.
 * Falls back to null if neither is present.
 */
const RTL = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
const LTR =
  "A-Za-z\u00C0-\u00D6\u00D8-\u00F6" +
  "\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" +
  "\uFE00-\uFE6F\uFEFD-\uFFFF";

const RTL_REGEX = new RegExp(`^[^${LTR}]*[${RTL}]`);
const LTR_REGEX = new RegExp(`^[^${RTL}]*[${LTR}]`);
const RTL_CHECK = new RegExp(`[${RTL}]`);
const LTR_CHECK = new RegExp(`[${LTR}]`);


export const getTextDirection = (text) => {
  if (RTL_CHECK.test(text) && LTR_CHECK.test(text)) {
    return null;
  }

  if (RTL_REGEX.test(text)) {
    return "rtl";
  }
  if (LTR_REGEX.test(text)) {
    return "ltr";
  }

  return null;
};
