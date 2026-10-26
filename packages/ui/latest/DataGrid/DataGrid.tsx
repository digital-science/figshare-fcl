import React from "react";

import styles from "./DataGrid.module.css";


type CellLayout = "center" | "row" | "center row" | "row center" | "absolute-center" | "flex-start" | "flex-end" | "space-between";
type CellSize = "s" | "s2" | "m" | "grow" | "grow-full" | "shrink" | "normal";
type CellWrap = "word" | "anywhere";
type TextAlign = "left" | "center" | "right";
type Booleanish = "true" | "false" | boolean;

type CellDataAttributes = {
  "data-cell-layout"?: CellLayout;
  "data-size"?: CellSize;
  "data-wrap"?: CellWrap;
  "data-truncate"?: Booleanish;
  "data-align"?: TextAlign;
  "data-selected"?: Booleanish;
};

type DataGridProps = {
  children: React.ReactNode;
  "data-cell-padding"?: "dense" | "compact" | "none";
  "data-border"?: "none";
  "data-hover"?: Booleanish;
  "data-striped"?: Booleanish;
  [key: string]: unknown;
};

type DataGridHeaderProps = {
  children: React.ReactNode;
  "data-layout"?: "column";
  "data-sticky"?: Booleanish;
  [key: string]: unknown;
};

type DataGridContentProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

type DataGridRowProps = {
  children: React.ReactNode;
  "data-layout"?: "column";
  "data-root-row"?: Booleanish;
  [key: string]: unknown;
};

type DataGridCellProps = CellDataAttributes & {
  children: React.ReactNode;
  [key: string]: unknown;
};

type DataGridSubheaderProps = CellDataAttributes & {
  children: React.ReactNode;
  [key: string]: unknown;
};

type DataGridComponent = React.FC<DataGridProps> & {
  Header: React.FC<DataGridHeaderProps>;
  Subheader: React.FC<DataGridSubheaderProps>;
  Content: React.FC<DataGridContentProps>;
  Row: React.FC<DataGridRowProps>;
  Cell: React.FC<DataGridCellProps>;
};


export const DataGrid: DataGridComponent = ({ children, ...props }: DataGridProps) => {
  return (
    <div className={styles.datagrid} {...props}>
      {children}
    </div>
  );
};

DataGrid.displayName = "DataGrid";

export function DataGridHeader({ children, ...props }: DataGridHeaderProps) {
  return (
    <div className={styles.header} {...props}>
      {children}
    </div>
  );
}

export function DataGridSubheader({ children, ...props }: DataGridSubheaderProps) {
  return (
    <div className={styles.subheader} {...props}>
      {children}
    </div>
  );
}

export function DataGridContent({ children, ...props }: DataGridContentProps) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}

export function DataGridRow({ children, ...props }: DataGridRowProps) {
  return (
    <div className={styles.row} {...props}>
      {children}
    </div>
  );
}

export function DataGridCell({ children, ...props }: DataGridCellProps) {
  return (
    <div className={styles.cell} {...props}>
      {children}
    </div>
  );
}

DataGrid.Header = DataGridHeader;
DataGrid.Subheader = DataGridSubheader;
DataGrid.Content = DataGridContent;
DataGrid.Row = DataGridRow;
DataGrid.Cell = DataGridCell;

export default DataGrid;
