import React, { useState, useRef, useMemo, useContext, createContext, useCallback, Children, useEffect } from "react";
import { array, any, bool, func, string, number, node, oneOfType } from "prop-types";
import classnames from "classnames";
import { Button } from "@figshare/fcl/button";
import RenderSwitch from "@figshare/fcl/renderSwitch";
import { useControllableState } from "@figshare/fcl/helpers/useControllableState";
import {
  useFloating, autoUpdate,
  useInteractions,
  useClick,
  useDismiss,
  flip,
  FloatingFocusManager,
} from "@floating-ui/react";

import More from "../icons/react/More";
import useEventListener from "../helpers/useEventListener";
import { debounce } from "../helpers/utils/debounce";

import styles from "./Tabs.css";


export const TabsContext = createContext({});

TabsContext.displayName = "TabsContext";

export function Tabs({ children, value, defaultValue, onChange }) {
  const [tab, setTab] = useControllableState({ value, defaultValue, onChange });

  const onTabClick = useCallback((e) => {
    setTab(e.target.getAttribute("data-value"));
  }, [setTab]);

  const context = useMemo(() => {
    return { tab, setTab, onTabClick };
  }, [tab, setTab]);

  return <TabsContext.Provider value={context}>{children}</TabsContext.Provider>;
}

Tabs.propTypes = {
  /** should contain TabsList and TabsPanel elements */
  children: node.isRequired,
  /** an initial value for the selected tab */
  defaultValue: oneOfType([string, number]),
  /** A managed/controlled value for the selected tab */
  value: oneOfType([string, number]),
  /** A function to notify of, or to trigger (if value is provided) a tab change */
  onChange: func,
};

Tabs.defaultProps = {
  value: undefined,
  defaultValue: undefined,
  onChange: undefined,
};


function sumUp(indices, widths) {
  return indices.reduce((s, idx) => s + widths[idx], 0);
}

export function TabsList({ children, className, ...rest }) {
  const info = useRef({ scrollWidth: 0, isSet: false, widths: [], shown: [], hidden: [], children });
  const [indices, setIndices] = useState({ shown: Object.keys(Children.toArray(children)), hidden: [] });
  const showToggle = !!indices.hidden.length;
  const visibleListRef = useRef(null);
  const hiddenListRef = useRef(null);

  useEffect(() => {
    info.current.children = children;
  }, [children]);

  const onResize = useCallback(debounce(() => {
    const visibleList = visibleListRef.current ?? { scrollWidth: 0, clientWidth: 0 };
    const hiddenList = hiddenListRef.current ?? { childNodes: [] };
    const { scrollWidth, clientWidth } = visibleList;
    const { children: rclist } = info.current;

    if (scrollWidth <= clientWidth || rclist.length <= 1) {
      setIndices({ shown: Object.keys(Children.toArray(rclist)), hidden: [] });

      return;
    }

    info.current.clientWidth = clientWidth;
    info.current.scrollWidth = scrollWidth;
    info.current.widths = Array.from(hiddenList.childNodes, (child) => child.clientWidth);
    info.current.totals = { shown: 0, hidden: 0, toggle: 48 };

    const { widths } = info.current;

    const all = Object.keys(Children.toArray(rclist));
    let hidden = [];
    let total = sumUp(all, widths) + info.current.totals.toggle;
    const shown = [];

    if (total <= clientWidth) {
      setIndices({ shown: all, hidden });

      return;
    }

    total = info.current.totals.toggle;

    for (let i = 0; i < all.length; i += 1) {
      const check = total + widths[i];

      if (check > clientWidth) {
        hidden = all.slice(i);
        break;
      } else {
        total = check;
        shown.push(i);
      }
    }

    setIndices({ shown, hidden });
  }, 200), []);

  useEventListener("resize", onResize, window);
  useEffect(() => {
    setTimeout(() => {
      onResize();
    }, 0);
  }, []);

  return (
    <div
      ref={visibleListRef}
      aria-orientation="horizontal"
      className={classnames(styles.tabs, className)}
      data-id="tabs"
      data-part="tab-list"
      data-scope="tabs"
      role="tablist"
      {...rest}
    >
      {indices.shown.map((i) => <React.Fragment key={i}>{children[i]}</React.Fragment>)}
      {showToggle && <TabOverflow elements={indices.hidden.map((i) => children[i])} />}
      <div
        ref={hiddenListRef}
        aria-hidden="true"
        className={styles.hidden}
        data-orientation="horizontal"
        data-part="hidden-tab-list"
        data-scope="tabs"
        role="presentation"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}

TabsList.propTypes = {
  /** should contain Tab item elements */
  children: node,
  className: string,
};

TabsList.defaultProps = {
  className: undefined,
  children: undefined,
};


export function TabOverflow({ elements }) {
  const { tab, onTabClick } = useContext(TabsContext);
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [flip()],
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  if (!elements.length) {
    return null;
  }

  return (
    <div
      className={styles.tabOverflow}
      data-part="overflow-container"
      data-scope="tabs"
    >
      <Button
        className={styles.tabOverflowButton}
        innerRef={refs.setReference}
        theme="secondaryAlt"
        tooltip="View additional tabs"
        {...getReferenceProps()}
      >
        <More />
      </Button>
      {isOpen && (
        <FloatingFocusManager context={context} returnFocus={true}>
          <ol
            ref={refs.setFloating}
            className={styles.tabOverflowList}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {elements.map((el, i) => {
              const isActive = el.props.active ?? (el.props.value !== undefined && tab === el.props.value);
              const onClickWithClose = (event) => {
                const onClick = el.props.onClick ?? onTabClick;

                if (typeof onClick === "function") {
                  onClick(event);
                }

                setIsOpen(false);
              };

              return (
                <li
                  key={el.props.value ?? i}
                  className={styles.tabOverflowItem}
                >
                  <Button
                    role="tab"
                    {...el.props}
                    aria-selected={isActive}
                    data-active={isActive}
                    data-value={el.props.value}
                    style={ {} }
                    theme="tertiaryAlt"
                    onClick={onClickWithClose}
                  >
                    {el.props.children}
                  </Button>
                </li>
              );
            })}
          </ol>
        </FloatingFocusManager>)}
    </div>
  );
}

TabOverflow.propTypes = { elements: array.isRequired };

export function Tab({ value, active, disabled, children, className, ...rest }) {
  const { tab, onTabClick } = useContext(TabsContext);
  const isActive = active ?? (value !== undefined && tab === value);

  return (
    <button
      key={value}
      aria-disabled={disabled}
      aria-selected={isActive}
      className={classnames(styles.tab, className)}
      data-active={isActive}
      data-part="tab"
      data-scope="tabs"
      data-value={value}
      disabled={disabled}
      id={`tab-${value}`}
      role="tab"
      onClick={onTabClick}
      {...rest}
    >
      {children}
    </button>
  );
}

Tab.propTypes = {
  children: node.isRequired,
  /** The tab value that this tab will trigger */
  value: oneOfType([string, number]).isRequired,
  /** Controls wether this tab is active or not.
   * It is optional, as long as a Tabs parent exists, as this value can be computed from the TabsContext
   * by comparing `value` with the active `tab` value in the context.
   **/
  active: bool,
  className: string,
  disabled: bool,
};

Tab.defaultProps = {
  active: undefined,
  className: undefined,
  disabled: false,
};


export function TabsPanel({ value, children, ...rest }) {
  const { tab, setTab } = useContext(TabsContext);
  const activeValue = setTab ? tab : value;

  return (
    <div
      aria-labelledby={`tab-${activeValue}`}
      data-id="tabs-panel"
      data-part="content"
      data-scope="tabs"
      data-value={activeValue}
      role="tabpanel"
      {...rest}
    >
      <RenderSwitch value={activeValue}>{children}</RenderSwitch>
    </div>
  );
}

TabsPanel.propTypes = {
  /** should contain TabEntry elements */
  children: any.isRequired,
  /**
   * The active value associated with a `Tab` item
   * It can be ommited, if a Tabs parent exists,
   * as this value will be taken directly from the TabsContext it provides.
   */
  value: oneOfType([string, number]),
};
TabsPanel.defaultProps = { value: undefined };


export function TabEntry({ value, children }) {
  return (
    <RenderSwitch.Case value={value}>{children}</RenderSwitch.Case>
  );
}

TabEntry.propTypes = {
  children: oneOfType([node, func]).isRequired,
  /** The value associated with a Tab item */
  value: oneOfType([string, number]).isRequired,
};

Tabs.List = TabsList;
Tabs.Tab = Tab;
Tabs.Panel = TabsPanel;
Tabs.Content = TabsPanel;
Tabs.Entry = TabEntry;


export default Tabs;
