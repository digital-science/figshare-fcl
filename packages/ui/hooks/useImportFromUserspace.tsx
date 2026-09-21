import React, { useCallback, useMemo, useRef, useState } from "react";


const HIDDEN_STYLE = { display: "none" };
let FILE_INPUT_ID = 0;

function readAsText(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsText(file);
  });
}

type ImportStatus = "idle" | "importing" | "imported" | "success" | "failed";

type ImportStatusLabels = Record<ImportStatus, string>;

export const IMPORT_STATUS_LABELS: ImportStatusLabels = {
  idle: "Import",
  importing: "Importing...",
  imported: "Imported",
  success: "Done",
  failed: "Failed",
};

type ImportResult = {
  name: string;
  data: string | ArrayBuffer | null;
};

type UseImportFileFromUserspaceProps = {
  accept?: string;
  bytesLimit?: number;
  onImport: (result: ImportResult) => Promise<void> | void;
  readFile?: (file: File) => Promise<string | ArrayBuffer | null>;
  labels?: ImportStatusLabels;
};

type UseImportFileFromUserspaceReturn = {
  status: ImportStatus;
  reason: Error | undefined;
  onAttemptImport: () => void;
  renderFileInput: () => React.JSX.Element;
  statusLabel: string;
};

export function useImportFileFromUserspace({
  accept = "application/text",
  bytesLimit,
  onImport,
  readFile = readAsText,
  labels = IMPORT_STATUS_LABELS,
}: UseImportFileFromUserspaceProps): UseImportFileFromUserspaceReturn {
  const [inputKeyIndex, setInputKeyIndex] = useState(0);
  const labelsRef = useRef(labels);
  // eslint-disable-next-line no-plusplus
  const importerId = useMemo(() => `importer-${++FILE_INPUT_ID}`, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<ImportStatus>("idle");
  const [reason, setReason] = useState<Error | undefined>(undefined);
  const onAttemptImport = useCallback(() => {
    inputRef.current?.click?.();
  }, []);
  const onResolveImport = useCallback(async(event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = event.target;
      if (files && files.length) {
        setStatus("importing");
        setReason(undefined);
        const [file] = Array.from(files);
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
      setReason(e as Error);
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
