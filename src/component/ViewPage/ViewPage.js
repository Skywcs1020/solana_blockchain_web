import React, { useMemo } from "react";
import { useTable } from "react-table";
import "./ViewPage.css";

const fakeData = [
  {
    time: "Jan 1, 2024 2:00 PM",
    organization_name: "Fresh Fields",
    address: "98 Meadow Street, Green Meadows, Australia",
    document: "View",
  },
  {
    time: "Jan 3, 2024 8:00 AM",
    organization_name: "Farmers' Choice",
    address: "65 Orchard Road, Wellington, New Zealand",
    document: "View",
  },
  {
    time: "Jan 5, 2024 9:15 AM",
    organization_name: "Fresh Market",
    address: "21 Main Street, City Center, New York",
    document: "View",
  },
  {
    time: "Jan 6, 2024 4:20 PM",
    organization_name: "Healthy Harvest Co-op",
    address: "45 Elm Street, Green Valley, California",
    document: "View",
  },
  {
    time: "Jan 8, 2024 1:30 PM",
    organization_name: "Organic Oasis",
    address: "87 Spring Avenue, Sunshine City, Florida",
    document: "View",
  },
  {
    time: "Jan 9, 2024 10:00 AM",
    organization_name: "Green Farm",
    address: "76 Harvest Road, Greensville, California",
    document: "View",
  },
];

function ViewPage() {
  const data = useMemo(() => fakeData, []);
  const columns = useMemo(
    () => [
      {
        Header: "Updated time",
        accessor: "time",
      },
      {
        Header: "Organization Name",
        accessor: "organization_name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Document",
        accessor: "document",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <center>
      <div className="view">
        <h4>Lion Custard Powder</h4>
        <h4>Product ID: 7495</h4>

        <center className="container">
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </center>
      </div>
    </center>
  );
}

export default ViewPage;
