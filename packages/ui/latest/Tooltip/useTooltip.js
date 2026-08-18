
import React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  inline,
  hide,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useClick,
  useDelayGroup,
  safePolygon,
} from "@floating-ui/react";


export function useTooltip({
  initialOpen = false,
  placement = "top",
  strategy = "absolute",
  role: providedRole = "tooltip",
  interactive = false,
  inline: referenceIsInline,
  hoverWithInteractive = false,
  theme,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  middleware,
  autoHideMs,
}) {
  const arrowRef = React.useRef(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  // Auto-dismiss the tooltip after `autoHideMs` so it does not linger and
  // overlap with content (a dropdown menu opened from the same trigger).
  React.useEffect(() => {
    if (!autoHideMs || !open) {
      return undefined;
    }

    const timer = setTimeout(() => setOpen(false), autoHideMs);

    return () => clearTimeout(timer);
  }, [autoHideMs, open, setOpen]);

  const defaultMiddleware = [
    offset(10 + 5),
    flip({
      crossAxis: placement.includes("-"),
      fallbackAxisSideDirection: "start",
      padding: 5,
    }),
    shift({ padding: 5 }),
    arrow({ element: arrowRef }),
    hide(),
  ];

  if (referenceIsInline) {
    defaultMiddleware.unshift(inline());
  }

  const data = useFloating({
    placement,
    strategy,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: middleware ?? defaultMiddleware,
  });

  const { context } = data;

  const { delay } = useDelayGroup(context);
  const hover = useHover(context, {
    move: false,
    enabled: hoverWithInteractive || !interactive,
    delay,
    handleClose: hoverWithInteractive ? safePolygon() : undefined,
  });
  const focus = useFocus(context, { enabled: !interactive });
  const click = useClick(context, { enabled: interactive });
  const dismiss = useDismiss(context);
  // use role="tooltip" for elements with text content
  // use role="label" for elements without it
  const role = useRole(context, { role: providedRole });

  const interactions = useInteractions([click, hover, focus, dismiss, role]);

  return React.useMemo(
    () => {
      return {
        open,
        setOpen,
        interactive,
        theme,
        ...interactions,
        ...data,
        arrowRef,
      };
    },
    [open, setOpen, interactive, theme, interactions, data, arrowRef]
  );
}

export const TooltipContext = React.createContext(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context === null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};
