import React from "react";
import { node } from "prop-types";

import styles from "./DataGrid.module.css";


export function DataGrid({ children, ...props }) {
  return (
    <div className={styles.datagrid} {...props}>
      {children}
    </div>
  );
}

DataGrid.propTypes = { children: node.isRequired };

export function DataGridHeader({ children, ...props }) {
  return (
    <div className={styles.header} {...props}>
      {children}
    </div>
  );
}

DataGridHeader.propTypes = { children: node.isRequired };

export function DataGridSubheader({ children, ...props }) {
  return (
    <div className={styles.subheader} {...props}>
      {children}
    </div>
  );
}

DataGridSubheader.propTypes = { children: node.isRequired };

export function DataGridContent({ children, ...props }) {
  return (
    <div className={styles.content} {...props}>
      {children}
    </div>
  );
}

DataGridContent.propTypes = { children: node.isRequired };

export function DataGridRow({ children, ...props }) {
  return (
    <div className={styles.row} {...props}>
      {children}
    </div>
  );
}

DataGridRow.propTypes = { children: node.isRequired };

export function DataGridCell({ children, ...props }) {
  return (
    <div className={styles.cell} {...props}>
      {children}
    </div>
  );
}

DataGridCell.propTypes = { children: node.isRequired };

DataGrid.Header = DataGridHeader;
DataGrid.Subheader = DataGridSubheader;
DataGrid.Content = DataGridContent;
DataGrid.Row = DataGridRow;
DataGrid.Cell = DataGridCell;

export default DataGrid;
