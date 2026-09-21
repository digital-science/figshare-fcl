import React from "react";
import { Button } from "../latest/Button";
import { Block } from "../latest/Block";


/**
 * A hook to manage a list by limiting the number of items displayed at a time
 * It exposes the limited list to be rendered, and functions to show more or less items.
 * It also exposes the remaining items, and all state related to the pagination so it can be controlled.
 * */
export function useLimitedList<T>(list: T[], itemsPerPage = 10, entriesLabel = "entries") {
  const [page, setPage] = React.useState(1);

  // Reset to page 1 whenever the list identity changes (e.g. navigating to a different item).
  React.useEffect(() => {
    setPage(1);
  }, [list]);

  const { limitedList, remainingList } = React.useMemo(() => {
    // Always start at the beginning of the list,
    // and show itemsPerPage items for each page.
    const startIndex = 0;
    const endIndex = ((page - 1) * itemsPerPage) + itemsPerPage;

    return {
      limitedList: list.slice(startIndex, endIndex),
      remainingList: list.slice(endIndex),
    };
  }, [list, page, itemsPerPage]);


  const onShowMore = React.useCallback(() => setPage((p) => p + 1), []);
  const onShowLess = React.useCallback(() => setPage(1), []);

  if (!list.length) {
    return {
      limitedList: [] as T[], remainingList: [] as T[], remainingCount: 0,
      canShowMore: false, canShowLess: false,
      onShowMore, onShowLess,
      page, setPage,
      entriesLabel,
    };
  }

  const remainingCount = Math.max(list.length - limitedList.length, 0);
  const canShowMore = remainingCount > 0;
  const canShowLess = false;
  // NOTE: show less is deactivated for now, but can be enabled here
  // const canShowLess = !canShowMore && page > 1;

  return {
    limitedList, remainingList, remainingCount,
    canShowMore, canShowLess,
    onShowMore, onShowLess,
    page, setPage,
    entriesLabel,
  };
}

type LimitedListShowMoreControlsProps = {
  canShowMore?: boolean;
  canShowLess?: boolean;
  remainingCount?: number;
  onShowMore?: () => void;
  onShowLess?: () => void;
  entriesLabel?: string;
};

/**
 * A component to render a default set of show more / show less controls for a list that is being paginated with useLimitedList.
 * It receives most of the state from the hook and renders the appropriate buttons with the appropriate labels and aria attributes.
 * */
export function LimitedListShowMoreControls({
  canShowMore = false,
  canShowLess = false,
  remainingCount = 0,
  onShowMore,
  onShowLess,
  entriesLabel = "entries",
}: LimitedListShowMoreControlsProps) {
  return (<>
    {(canShowMore || canShowLess) && (
      <Block kind="layout-rows gap-2 align-start justify-start">
        {canShowMore && (
          <Button
            aria-label={`Show more ${entriesLabel} (${remainingCount} remaining)`}
            kind="tertiary"
            em="high"
            span="content"
            onClick={onShowMore}
          >
            <Button.Label>Show more ({remainingCount} more)</Button.Label>
          </Button>
        )}
        {canShowLess && (
          <Button
            aria-label={`Show less ${entriesLabel}`}
            kind="tertiary"
            em="high"
            span="content"
            onClick={onShowLess}
          >
            <Button.Label>Show less</Button.Label>
          </Button>
        )}
      </Block >
    )}
  </>);
}
