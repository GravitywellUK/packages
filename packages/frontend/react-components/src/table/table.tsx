/* eslint-disable react/jsx-key */
import React, {
  PropsWithChildren,
  ReactElement
} from "react";
import {
  useTable,
  TableOptions,
  Row,
  SortingRule,
  Filters
} from "react-table";

import DefaultTableStyles from "./styles";

type Obj = Record<string, unknown>;

type FetchData<T extends Obj> = ({
  pageIndex, pageSize, tableFilters, sortBy
}: {
  pageIndex: number;
  pageSize: number;
  tableFilters?: Filters<T>;
  sortBy?: Array<SortingRule<keyof T>>
}) => void;

export interface TableProps<T extends Obj = Obj> extends TableOptions<T> {
  /** Unique name for local storage */
  slug?: string;
  /** Header title */
  title?: string;
  /** Fetch Data */
  fetchData: FetchData<T>
  /** Set hidden columns */
  hiddenColumns?: string[];
  /** Set sort by */
  sortBy?: Array<SortingRule<keyof T>>;
  /** Handle clicking on a row */
  onRowClick?: (row: Row<T>) => void;
  /** Handle selecting a row */
  onRowSelect?: (selectedRows: T[]) => void;
  /** Show loading UI */
  loading: boolean;
  /** Override the loading UI */
  loadingUI?: JSX.Element;
  /** Override the "no data" UI */
  notFoundUI?: string | JSX.Element;
  /** useBulkSelect */
  useBulkSelect?: boolean;
  /** usePagination */
  usePagination?: boolean;
  /** useHideColumns */
  useHideColumns?: boolean;
  /** useSortBy */
  useSortBy?: boolean;
  /** useResizeColumns */
  useResizeColumns?: boolean;
  /** useFilters */
  useFilters?: boolean;
}

export type { Column } from "react-table";

export function Table<T extends Obj>(props: PropsWithChildren<TableProps<T>>): ReactElement {
  const { columns, data } = props;

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <DefaultTableStyles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </DefaultTableStyles>
  );
}
