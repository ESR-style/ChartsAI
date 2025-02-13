import React from 'react';

const TableView = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const headers = Object.keys(data[0]);

  // Determine column alignment based on data type
  const getAlignment = (header, value) => {
    if (typeof value === 'number') return 'text-right';
    if (typeof value === 'string' && value.endsWith('%')) return 'text-right';
    return 'text-left';
  };

  return (
    <div className="overflow-x-auto my-2">
      <table className="min-w-full border border-white/10 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-white/5">
            {headers.map((header) => (
              <th key={header} className={`px-4 py-2 text-sm font-semibold text-gray-300 ${getAlignment(header, data[0][header])}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-t border-white/10 hover:bg-white/5">
              {headers.map((header) => (
                <td key={`${index}-${header}`} className={`px-4 py-2 text-sm text-gray-200 ${getAlignment(header, row[header])}`}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
