import { renderHook, act } from "@testing-library/react-hooks";

import { useImportFileFromUserspace, IMPORT_STATUS_LABELS } from "./useImportFromUserspace";


describe("useImportFileFromUserspace", () => {
  const mockFile = new File(["test content"], "test.txt", { type: "text/plain" });
  const mockReadFile = jest.fn(() => Promise.resolve("test content"));
  const mockOnImport = jest.fn(() => Promise.resolve());

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize status to \"idle\"", () => {
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFile })
    );
    expect(result.current.status).toBe("idle");
    expect(result.current.statusLabel).toBe(IMPORT_STATUS_LABELS.idle);
  });

  it("should trigger file input click on onAttemptImport", () => {
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFile })
    );

    act(() => {
      result.current.onAttemptImport();
    });
  });

  it("should handle file selection and update status", async() => {
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFile })
    );

    const input = { files: [mockFile] };
    await act(async() => {
      await result.current.renderFileInput().props.children.props.onChange({ target: input });
    });

    expect(mockReadFile).toHaveBeenCalledWith(mockFile);
    expect(mockOnImport).toHaveBeenCalledWith({ name: "test.txt", data: "test content" });
    expect(result.current.status).toBe("success");
    expect(result.current.statusLabel).toBe(IMPORT_STATUS_LABELS.success);
  });

  it("should handle file selection failure and update status", async() => {
    const mockReadFileFail = jest.fn(() => Promise.reject(new Error("Read failed")));
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFileFail })
    );

    const input = { files: [mockFile] };
    await act(async() => {
      await result.current.renderFileInput().props.children.props.onChange({ target: input });
    });

    expect(mockReadFileFail).toHaveBeenCalledWith(mockFile);
    expect(result.current.status).toBe("failed");
    expect(result.current.statusLabel).toBe(IMPORT_STATUS_LABELS.failed);
  });

  it("should reset status to idle after 3 seconds", async() => {
    jest.useFakeTimers();
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFile })
    );

    const input = { files: [mockFile] };
    await act(async() => {
      await result.current.renderFileInput().props.children.props.onChange({ target: input });
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.statusLabel).toBe(IMPORT_STATUS_LABELS.idle);
    jest.useRealTimers();
  });

  it("Should increment input key index on file import", async() => {
    const { result } = renderHook(() =>
      useImportFileFromUserspace({ onImport: mockOnImport, readFile: mockReadFile })
    );
    const initialKey = result.current.renderFileInput().props.children.key;

    const input = { files: [mockFile] };
    await act(async() => {
      await result.current.renderFileInput().props.children.props.onChange({ target: input });
    });

    const newKey = result.current.renderFileInput().props.children.key;
    expect(newKey).not.toBe(initialKey);
  });

  it("should use custom labels if provided", async() => {
    const customLabels = {
      idle: "Custom Idle",
      importing: "Custom Importing",
      imported: "Custom Imported",
      success: "Custom Success",
      failed: "Custom Failed",
    };
    const { result } = renderHook(() =>
      useImportFileFromUserspace({
        onImport: mockOnImport,
        readFile: mockReadFile,
        labels: customLabels,
      })
    );

    expect(result.current.statusLabel).toBe(customLabels.idle);

    const input = { files: [mockFile] };
    await act(async() => {
      await result.current.renderFileInput().props.children.props.onChange({ target: input });
    });

    expect(result.current.statusLabel).toBe(customLabels.success);
  });
});
