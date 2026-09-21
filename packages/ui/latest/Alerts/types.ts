

export type AlertType = "info" | "warning" | "error" | "success" | "notice";
export type StackType = "single" | "list" | "stack";

export type AlertMessage = {
  id: string;
  type?: AlertType;
  message?: React.ReactNode;
  children?: React.ReactNode;
  persistent?: boolean;
  attributes?: Record<string, unknown>;
  title?: string;
  padded?: boolean;
};

export type TicketEntry = {
  id: string;
  ticket: ReturnType<typeof setTimeout>;
};
