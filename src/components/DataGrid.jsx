import React, { useState, useCallback } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

const PlotlyRenderers = createPlotlyRenderers(Plot);

const DataGrid = ({ data }) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  
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
        width: 900,
        height: 500
      }
    };
  }, [data]);

  const [pivotState, setPivotState] = useState(getInitialPivotState());

  // Basic table rendering function
  const renderBasicTable = () => {
    if (!data || data.length === 0) return null;
    const headers = Object.keys(data[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-semibold text-white/90 bg-white/5"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {data.slice(0, 100).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-white/5">
                {headers.map((header, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className="px-4 py-2 text-sm text-white/80"
                  >
                    {row[header]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-sm text-white/90 transition-colors cursor-pointer"
          >
            {showAnalysis ? 'Show Table' : 'Data Analysis'}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ${
        showAnalysis ? 'fixed inset-4 z-50 bg-[#161616] p-4 overflow-auto' : 'h-[400px] overflow-auto'
      }`}>
        <div className="bg-[#161616] text-white h-full">
          {showAnalysis ? (
            <div>
              <PivotTableUI
                data={data}
                onChange={s => setPivotState(s)}
                renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
                {...pivotState}
                className="pivot-table-dark"
                unusedOrientationCutoff={Infinity}
              />
            </div>
          ) : (
            renderBasicTable()
          )}
        </div>
      </div>

      {showAnalysis && (
        <button
          onClick={() => setShowAnalysis(false)}
          className="fixed top-6 right-6 z-50 px-3 py-1 bg-white/10 hover:bg-white/20 
            rounded-md text-sm text-white/90 transition-colors cursor-pointer"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default DataGrid;