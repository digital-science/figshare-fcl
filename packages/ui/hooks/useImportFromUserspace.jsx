import React, { useCallback, useMemo, useRef, useState } from "react";


const HIDDEN_STYLE = { display: "none" };
let FILE_INPUT_ID = 0;

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

export const IMPORT_STATUS_LABELS = {
  idle: "Import",
  importing: "Importing...",
  imported: "Imported",
  success: "Done",
  failed: "Failed",
};

export function useImportFileFromUserspace({
  accept = "application/text",
  bytesLimit,
  onImport,
  readFile = readAsText,
  labels = IMPORT_STATUS_LABELS,
}) {
  const [inputKeyIndex, setInputKeyIndex] = useState(0);
  const labelsRef = useRef(labels);
  // eslint-disable-next-line no-plusplus
  const importerId = useMemo(() => `importer-${++FILE_INPUT_ID}`, []);
  const inputRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [reason, setReason] = useState(undefined);
  const onAttemptImport = useCallback(() => {
    inputRef.current?.click?.();
  }, []);
  const onResolveImport = useCallback(async(event) => {
    try {
      const { files } = event.target;
      if (files.length) {
        setStatus("importing");
        setReason(undefined);
        const [file] = files;
        const { name, size } = file;

        if (bytesLimit && size > bytesLimit) {
          throw new Error(`File exceeds ${bytesLimit} bytes size limit.`);
        }

        const data = await readFile(file);
        setStatus("imported");
        // remount input
        setInputKeyIndex((i) => i + 1);
        await onImport({ name, data });
        setStatus("success");
      }
    } catch (e) {
      setStatus("failed");
      setReason(e);
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  }, [onImport, setStatus, setReason]);

  const renderFileInput = useCallback(() => (
    <form id={`${importerId}-form`} role="presentation">
      <input
        key={`input-instance-${inputKeyIndex}`}
        ref={inputRef}
        accept={accept}
        id={`${importerId}-input`}
        name="userspace.importer.file"
        style={HIDDEN_STYLE}
        type="file"
        onChange={onResolveImport}
      />
    </form>
  ), [inputKeyIndex, importerId, inputRef, onResolveImport]);

  return useMemo(() => {
    return { status, reason, onAttemptImport, renderFileInput, statusLabel: labelsRef.current[status] };
  }, [status, onAttemptImport, renderFileInput, labelsRef]);
}
