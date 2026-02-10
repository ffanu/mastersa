
import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  getRowId?: (item: T) => string;
}

const Table = <T,>({ 
  data, 
  columns, 
  selectable, 
  selectedIds = [], 
  onSelectionChange, 
  getRowId 
}: TableProps<T>) => {
  
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelectionChange || !getRowId) return;
    if (e.target.checked) {
      onSelectionChange(data.map(getRowId));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (!onSelectionChange) return;
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="bg-white border border-gray-300 rounded overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#f8f9fa] border-b border-gray-300">
            <tr>
              {selectable && getRowId && (
                <th className="px-4 py-2 w-10 border-r border-gray-200">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 cursor-pointer"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th key={i} className="px-4 py-2 text-[11px] uppercase tracking-wider font-bold text-[#495057] border-r border-gray-200 last:border-0">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-gray-500 italic text-sm">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : data.map((row, i) => {
              const rowId = getRowId ? getRowId(row) : i.toString();
              const isSelected = selectedIds.includes(rowId);
              
              return (
                <tr key={rowId} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f9fa]'} hover:bg-[#e9ecef] transition-colors`}>
                  {selectable && getRowId && (
                    <td className="px-4 py-2 border-r border-gray-200">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 cursor-pointer"
                        checked={isSelected}
                        onChange={() => handleSelectRow(rowId)}
                      />
                    </td>
                  )}
                  {columns.map((col, j) => (
                    <td key={j} className="px-4 py-2 whitespace-nowrap text-sm text-[#212529] border-r border-gray-200 last:border-0">
                      {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
