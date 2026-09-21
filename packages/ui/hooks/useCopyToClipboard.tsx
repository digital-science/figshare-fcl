import { useState, useCallback } from "react";


export function useCopyToClipboard(text = "", tooltipDelay = 1000): [boolean, () => Promise<void>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async() => {
    try {
      await copyToClipboard(text);
      setCopied(true);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Clipboard not available", (err as Error).message);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, tooltipDelay);
    }
  }, [text]);

  return [copied, copy];
}

function copyToClipboard(text: string) {
  return navigator?.clipboard?.writeText?.(text);
}

export default useCopyToClipboard;
