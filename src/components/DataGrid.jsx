import React, { useState, useCallback } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import TableRenderers from 'react-pivottable/TableRenderers';
import Plot from 'react-plotly.js';
import createPlotlyRenderers from 'react-pivottable/PlotlyRenderers';

// Create Plotly renderers
const PlotlyRenderers = createPlotlyRenderers(Plot);

const DataGrid = ({ data, isExpanded, onToggleExpand }) => {
  // Set default pivot table state with some intelligent defaults based on data
  const getInitialPivotState = useCallback(() => {
    if (!data || data.length === 0) return {};
    
    const keys = Object.keys(data[0]);
    const numericColumns = keys.filter(key => typeof data[0][key] === 'number');
    const categoricalColumns = keys.filter(key => typeof data[0][key] === 'string');
    
    return {
      rows: categoricalColumns.slice(0, 1), // First categorical column as row
      cols: categoricalColumns.slice(1, 2), // Second categorical column as column
      vals: numericColumns.slice(0, 1), // First numeric column as value
      aggregatorName: "Sum", // Default aggregator
      rendererName: "Table", // Default to table view
      valueFilter: {}, // No filters by default
      sorters: {},
      plotlyOptions: {
        width: 900,
        height: 500
      }
    };
  }, [data]);

  const [pivotState, setPivotState] = useState(getInitialPivotState());

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={onToggleExpand}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md text-sm text-white/90 transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>

      <div className={`transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 bg-[#161616] p-4' : 'h-[400px] overflow-auto'
      }`}>
        <div className="bg-[#161616] text-white h-full">
          <PivotTableUI
            data={data}
            onChange={s => setPivotState(s)}
            renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
            {...pivotState}
            className="pivot-table-dark"
            unusedOrientationCutoff={Infinity} // Always show unused fields horizontally
          />
        </div>
      </div>

      {isExpanded && (
        <button
          onClick={onToggleExpand}
          className="fixed top-6 right-6 z-50 px-3 py-1 bg-white/10 hover:bg-white/20 
            rounded-md text-sm text-white/90 transition-colors"
        >
          Close
        </button>
      )}
    </div>
  );
};

export default DataGrid;