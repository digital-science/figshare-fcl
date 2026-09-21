import React from "react";

import styles from "./DataGrid.module.css";


type DataGridPartProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

type DataGridComponent = React.FC<DataGridPartProps> & {
  Header: React.FC<DataGridPartProps>;
  Subheader: React.FC<DataGridPartProps>;
  Content: React.FC<DataGridPartProps>;
  Row: React.FC<DataGridPartProps>;
  Cell: React.FC<DataGridPartProps>;
};


export const DataGrid: DataGridComponent = ({ children, ...props }: DataGridPartProps) => {
  return (
    <div className={styles.datagrid} {...props}>
      {children}
    </div>
  );
};

DataGrid.displayName = "DataGrid";

export function DataGridHeader({ children, ...props }: DataGridPartProps) {
  return (
    <div className={styles.header} {...props}>
      {children}
    </div>
  );
}

export function DataGridSubheader({ children, ...props }: DataGridPartProps) {
  return (
    <div className={styles.subheader} {...props}>
      {children}
    </div>
  );
}

export function DataGridContent({ children, ...props }: DataGridPartProps) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}

export function DataGridRow({ children, ...props }: DataGridPartProps) {
  return (
    <div className={styles.row} {...props}>
      {children}
    </div>
  );
}

export function DataGridCell({ children, ...props }: DataGridPartProps) {
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
