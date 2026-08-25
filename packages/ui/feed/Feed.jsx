import PropTypes from "prop-types";
import React, { useRef, useCallback, useEffect } from "react";


/*
This is for a bug on Google Chrome; when the browser zoom
or the OS scale are larger than 100%, the user can actually
scroll less than one pixel :facepalm:
*/
const CHROME_SAFE_SCROLLING = 1;


export default function Feed({
  children,
  className,
  component: Comp,
  innerRef,
  loading,
  render,
  scrollContainer: scrollContainerProp,
  scrollThreshold,
  values,
  onBottomReached,
  onScroll,
  onTopReached,
  ...props
}) {
  const feedNodeRef = useRef(null);
  const topReachedRef = useRef(true);
  const bottomReachedRef = useRef(false);
  const previousScrollPositionRef = useRef(0);


  // Set ref callback
  const setRef = useCallback(
    (node) => {
      feedNodeRef.current = node;
      if (innerRef) {
        innerRef(node);
      }
    },
    [innerRef]
  );

  // Render individual item
  const renderItem = useCallback(
    (item, index) => {
      const position = index + 1;

      const itemProps = {
        key: `feed-element-${position}`,
        "aria-posinset": position,
        "aria-setsize": values.length,
        "data-id": "feed-item",
      };

      if (children) {
        return children(item, itemProps);
      }

      if (render) {
        return render(item, itemProps);
      }

      if (Comp) {
        if (typeof Comp === "string") {
          return <Comp key={`feed-element-${position}`} {...itemProps}>{item}</Comp>;
        }

        return <Comp key={`feed-element-${position}`} {...itemProps} item={item} />;
      }

      return null;
    },
    [children, Comp, render, values.length]
  );

  // Handle scroll events
  const handleScroll = useCallback(
    (event) => {
      const node = scrollContainerProp || feedNodeRef.current;

      onScroll(event);

      if (!node || loading) {
        return;
      }

      const scroll = node.scrollTop || node.scrollY;

      const { offsetHeight: height, scrollHeight } = node;

      const topReached = scroll <= scrollThreshold;
      const bottomReached = scrollHeight - (scroll + height + CHROME_SAFE_SCROLLING) <= scrollThreshold;
      const scrollDirection = scroll - previousScrollPositionRef.current;

      if (scrollDirection < 0 && !topReachedRef.current && topReached) {
        onTopReached();
      }

      if (scrollDirection > 0 && !bottomReachedRef.current && bottomReached) {
        onBottomReached();
      }

      bottomReachedRef.current = bottomReached;
      topReachedRef.current = topReached;
      previousScrollPositionRef.current = scroll;
    },
    [scrollContainerProp, scrollThreshold, loading, onBottomReached, onTopReached, onScroll]
  );

  // Get focused article element
  const getFocusedArticle = useCallback(() => {
    if (!feedNodeRef.current) {
      return null;
    }

    let focusedElement = feedNodeRef.current.querySelector(":focus");

    if (!focusedElement) {
      return null;
    }

    while (focusedElement !== feedNodeRef.current && focusedElement.getAttribute("role") !== "article") {
      focusedElement = focusedElement.parentNode;
    }

    return focusedElement;
  }, []);

  // Get next focusable element
  const getNextFocusableElement = useCallback(() => {
    if (!feedNodeRef.current) {
      return null;
    }

    const selector = "button, a[href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
    const lastArticle = feedNodeRef.current.querySelector("[role=\"article\"]:last-child");
    const feedFocusableElements = Array.prototype.slice.call(feedNodeRef.current.querySelectorAll(selector));
    const allFocusableElements = Array.prototype.slice.call(document.querySelectorAll(selector)).filter((node) => {
      const isInFeed = feedFocusableElements.includes(node);

      return !isInFeed || node === lastArticle;
    });

    const index = allFocusableElements.indexOf(lastArticle);

    if (index !== -1) {
      let next = allFocusableElements[index + 1];

      if (!next) {
        next = allFocusableElements[0];
      }

      return next;
    }

    return null;
  }, []);

  // Get previous focusable element
  const getPreviousFocusableElement = useCallback(() => {
    if (!feedNodeRef.current) {
      return null;
    }

    const selector = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
    const firstArticle = feedNodeRef.current.querySelector("[role=\"article\"]:first-child");
    const feedFocusableElements = Array.prototype.slice.call(feedNodeRef.current.querySelectorAll(selector));
    const allFocusableElements = Array.prototype.slice.call(document.querySelectorAll(selector)).filter((node) => {
      const isInFeed = feedFocusableElements.includes(node);

      return !isInFeed || node === firstArticle;
    });

    const index = allFocusableElements.indexOf(firstArticle);

    if (index !== -1) {
      let previous = allFocusableElements[index - 1];

      if (!previous) {
        previous = allFocusableElements[allFocusableElements.length - 1];
      }

      return previous;
    }

    return null;
  }, []);

  // Handle keyboard key up
  const handleKeyUp = useCallback(
    (event) => {
      if (!feedNodeRef.current) {
        return;
      }

      const focusedArticle = getFocusedArticle();
      if (!focusedArticle) {
        return;
      }

      let nextFocusedElement = null;

      if (event.ctrlKey && event.key === "Home") {
        nextFocusedElement = getPreviousFocusableElement();
      }

      if (event.ctrlKey && event.key === "End") {
        nextFocusedElement = getNextFocusableElement();
      }

      if (nextFocusedElement) {
        event.preventDefault();
        setTimeout(() => nextFocusedElement.focus(), 0);
      }
    },
    [getFocusedArticle, getPreviousFocusableElement, getNextFocusableElement]
  );

  // Handle keyboard key down
  const handleKeyDown = useCallback(
    (event) => {
      if (!feedNodeRef.current) {
        return;
      }

      const focusedArticle = getFocusedArticle();
      if (!focusedArticle) {
        return;
      }

      let nextFocusedElement = null;

      if (event.key === "PageDown") {
        nextFocusedElement = focusedArticle.nextSibling;
      }

      if (event.key === "PageUp") {
        nextFocusedElement = focusedArticle.previousSibling;
      }

      if (event.ctrlKey && ["Home", "End"].includes(event.key)) {
        event.preventDefault();
      }

      if (nextFocusedElement) {
        event.preventDefault();
        nextFocusedElement.focus();

        const firstArticle = feedNodeRef.current.querySelector("[role=\"article\"]:first-child");
        const lastArticle = feedNodeRef.current.querySelector("[role=\"article\"]:last-child");

        if (nextFocusedElement === lastArticle) {
          onBottomReached();
        }

        if (nextFocusedElement === firstArticle) {
          onTopReached();
        }
      }
    },
    [getFocusedArticle, onBottomReached, onTopReached]
  );

  // Setup event listeners
  useEffect(() => {
    const container = scrollContainerProp || feedNodeRef.current;

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);

      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleKeyDown, handleKeyUp, handleScroll, scrollContainerProp]);

  if (!values || !values.length) {
    return null;
  }

  return (
    <ul
      {...props}
      ref={setRef}
      aria-busy={loading}
      className={className}
      role="feed"
      style={ { listStyleType: "none", paddingLeft: 0 } }
    >
      {values.map(renderItem)}
    </ul>
  );
}

Feed.propTypes = {
  children: PropTypes.func,
  className: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  innerRef: PropTypes.func,
  loading: PropTypes.bool,
  render: PropTypes.func,
  scrollContainer: PropTypes.object,
  scrollThreshold: PropTypes.number,
  values: PropTypes.array,
  onBottomReached: PropTypes.func,
  onScroll: PropTypes.func,
  onTopReached: PropTypes.func,
};

Feed.defaultProps = {
  children: null,
  className: undefined,
  component: null,
  innerRef: null,
  loading: false,
  render: null,
  scrollThreshold: 0,
  values: [],
  onBottomReached: () => undefined,
  onScroll: () => undefined,
  onTopReached: () => undefined,
  scrollContainer: undefined,
};
