import React, { useState, useCallback } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const DataGrid = ({ data, isExpanded, onToggleExpand }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const downloadExcel = () => {
    if (!data || data.length === 0) return;
    
    // Convert data to TSV format (Excel can open this)
    const headers = Object.keys(data[0]);
    const tsvContent = [
      headers.join('\t'), // Header row
      ...data.map(row => headers.map(header => {
        let cell = row[header]?.toString() || '';
        // Escape tabs and wrap in quotes if contains tab or newline
        if (cell.includes('\t') || cell.includes('\n')) {
          cell = `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join('\t'))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data_export.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Set default pivot table state with some intelligent defaults based on data
  const getInitialPivotState = useCallback(() => {
    if (!data || data.length === 0) return {};
    
    const keys = Object.keys(data[0]);
    const numericColumns = keys.filter(key => typeof data[0][key] === 'number');
    const categoricalColumns = keys.filter(key => typeof data[0][key] === 'string');
    
    return {
      rows: categoricalColumns.slice(0, 1),
      cols: [],
      vals: numericColumns.slice(0, 1),
      aggregatorName: "Sum",
      rendererName: "Table",
      valueFilter: {},
      sorters: {},
      plotlyOptions: {
        width: window.innerWidth - 100,
        height: window.innerHeight - 200
      }
    };
  }, [data]);

  const [pivotState, setPivotState] = useState(getInitialPivotState());

  // Pagination calculations
  const totalPages = Math.ceil((data?.length || 0) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  // Pagination controls
  const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

  return (
    <div className="relative">
      <div className={`transition-all duration-300 ${
        isExpanded ? 'fixed inset-0 z-50 bg-white p-4 overflow-auto' : ''
      }`}>
        <div className="bg-white text-gray-800 h-full w-full">
          {isExpanded ? (
            <div className="w-full h-full">
              <PivotTableUI
                data={data}
                onChange={s => setPivotState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...pivotState}
                className="pivot-table-light"
                unusedOrientationCutoff={Infinity}
              />
            </div>
          ) : (
            <div className="w-full">
              {data && data.length > 0 && (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      <thead>
                        <tr>
                          {Object.keys(data[0]).map((header, index) => (
                            <th
                              key={index}
                              className="px-4 py-3 text-left text-sm font-semibold text-gray-800 bg-gray-100"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.slice(startIndex, endIndex).map((row, rowIndex) => (
                          <tr key={rowIndex} className="hover:bg-gray-50">
                            {Object.keys(data[0]).map((header, colIndex) => (
                              <td
                                key={`${rowIndex}-${colIndex}`}
                                className="px-4 py-2 text-sm text-gray-700"
                              >
                                {row[header]?.toString()}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-between items-center mt-4 px-4 py-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-700">
                      Showing {startIndex + 1}-{Math.min(endIndex, data.length)} of {data.length} entries
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 
                          transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                      >
                        Previous
                      </button>
                      <span className="px-3 py-1 text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm text-gray-700 
                          transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <button
          onClick={onToggleExpand}
          className="fixed top-6 right-6 z-50 px-3 py-1 bg-gray-100 hover:bg-gray-200 
            rounded-md text-sm text-gray-700 transition-colors cursor-pointer border border-gray-200"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default DataGrid;