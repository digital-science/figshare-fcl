import React from "react";
import { getTextDirection } from "@digital-science/figshare-fcl/input/text/utils";
import { stripHtmlTags } from "@digital-science/figshare-fcl/textEditor/Lexical/utils";

import useMergeRefs from "./useMergeRefs";


/**
 * A hook to determine the text direction of a given node.
 * It extracts text content directly from the node itself or uses children if it is a string node.
 * It can be any React node, so we pass the children prop to the hook to react to changes in the content
 * and re-evaluate the directionality.
 */
export function useTextDirection({ children, inferDirection = true, ref: providedRef }) {
  const ownRef = React.useRef(null);
  const ref = useMergeRefs(ownRef, providedRef);

  return React.useMemo(() => {
    const textContent = typeof children === "string" ? children : ownRef.current?.textContent;

    // if user opted into inferring directionality and we have text content,
    // determine the directionality and return it along with the ref
    if (inferDirection && textContent) {
      const dir = getTextDirection(stripHtmlTags(textContent));

      return { dir, props: { ref, dir } };
    }

    // always return the ref, even if we don't infer directionality or have no text content
    return { props: { ref } };
  }, [children, inferDirection]);
}
