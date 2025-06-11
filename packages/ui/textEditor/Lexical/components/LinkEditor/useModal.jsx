import { useCallback, useMemo, useState } from "react";
import * as React from "react";
import { Overlay } from "@digital-science/figshare-fcl/overlay";

import styles from "./useModal.css";


export default function useModal() {
  const [modalContent, setModalContent] = useState(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }

    const { content, isVisible } = modalContent;

    return (
      <Overlay
        className={styles.editorOverlay}
        isVisible={isVisible}
        onClose={onClose}
      >
        {content}
      </Overlay>
    );
  }, [modalContent, onClose]);

  const showModal = useCallback(
    (
      getContent,
      isVisible = true,
    ) => {
      setModalContent({
        isVisible,
        content: getContent(onClose),
      });
    },
    [onClose],
  );

  return [modal, showModal];
}
