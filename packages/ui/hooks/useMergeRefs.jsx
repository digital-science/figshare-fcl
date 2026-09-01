/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import * as React from "react";

// Detect React version at module level for efficiency
const majorVersion = parseInt(React.version.split(".")[0], 10);
const shouldReturnCleanup = majorVersion >= 19;

export function assignRef(ref, value) {
  if (ref == null) return;

  if (typeof ref === "function") {

    return ref(value);
  }

  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}

// Hook to merge multiple refs into a single ref callback function.
// This is useful when you want to forward a ref to a child component while also using it in the parent component.
export function useMergeRefs(...refs) {

  const availableRefs = refs.filter((ref) => ref != null);

  if (shouldReturnCleanup) {
    // React 19+ - return cleanup function
    const cleanupMap = new Map();

    return (node) => {
      availableRefs.forEach((ref) => {
        const cleanup = assignRef(ref, node);
        if (cleanup) {
          cleanupMap.set(ref, cleanup);
        }
      });

      return () => {
        availableRefs.forEach((ref) => {
          const cleanup = cleanupMap.get(ref);
          if (cleanup && typeof cleanup === "function") {
            cleanup();
          } else {
            assignRef(ref, null);
          }
        });

        cleanupMap.clear();
      };
    };
  }

  // React 18 and lower - don't return cleanup function
  return (node) => {
    availableRefs.forEach((ref) => {
      assignRef(ref, node);
    });
    // Don't return a cleanup function to avoid React 18 warnings as it handles cleanup internally
  };
}

export default useMergeRefs;
