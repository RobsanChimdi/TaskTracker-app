// Table.jsx
import React, { useState } from 'react';
import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import EditableCell from './Hed';
const Table = () => {
  const [data, setData] = useState([
    { name: 'Bacha', age: 17, educationLevel: 'degree' },
    { name: 'Tola', age: 18, educationLevel: 'masters' },
  ]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => <EditableCell value={info.getValue()} />,
    },
    {
      accessorKey: 'age',
      header: 'Age',
      cell: (info) => <p>{info.getValue()}</p>,
    },
    {
      accessorKey: 'educationLevel',
      header: 'Education Level',
      cell: (info) => <p>{info.getValue()}</p>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border px-4 py-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
