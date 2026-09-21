

export type DisclosureContextValue = {
  id: string;
  visible: boolean;
  onToggle: (() => void) | null;
  keepMounted: boolean;
};

export type DisclosureProps = {
  children?: React.ReactNode;
  visible?: boolean;
  defaultVisible?: boolean;
  keepMounted?: boolean;
  onToggle?: (visible: boolean) => void;
};

export type ToggleRenderProps = {
  visible: boolean;
  "aria-controls": string;
  "aria-expanded": boolean;
  role: string;
  onClick: (() => void) | null;
};

export type DisclosureToggleProps = {
  children: (props: ToggleRenderProps) => React.ReactNode;
};

export type ContentRenderProps = {
  id: string;
  visible: boolean;
  "aria-hidden": boolean;
};

export type DisclosureContentProps = {
  children: (props: ContentRenderProps) => React.ReactNode;
};

export type DisclosureComponent = React.FC<DisclosureProps> & {
  Toggle: React.FC<DisclosureToggleProps>;
  Content: React.FC<DisclosureContentProps>;
};
