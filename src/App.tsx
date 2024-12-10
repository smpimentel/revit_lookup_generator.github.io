import React from 'react';
import { ParameterInput } from './components/ParameterInput';
import { Preview } from './components/Preview';
import { Download } from 'lucide-react';
import { useParameterStore } from './store/useParameterStore';

function App() {
  const { parameters } = useParameterStore();

  const handleDownload = () => {
    const headers = ['Description', ...parameters.map(p => `${p.name}##${p.type}##${p.unit}`)].join(',');
    const values = parameters.map(p => p.values);
    
    const generateCombinations = (arrays: string[][]): string[][] => {
      if (arrays.length === 0) return [[]];
      const [first, ...rest] = arrays;
      const combinations = generateCombinations(rest);
      return first.flatMap(x => combinations.map(c => [x, ...c]));
    };

    const combinations = generateCombinations(values);
    const rows = combinations.map((row, index) => [`Row_${index + 1}`, ...row].join(','));
    const csvContent = [headers, ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'revit-lookup-table.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Revit Lookup Table Generator
          </h1>
          <p className="text-gray-600">
            Create parameter combinations with proper Revit formatting
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <ParameterInput />
        </div>

        {parameters.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Table</h2>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download size={20} />
                Download CSV
              </button>
            </div>
            <Preview />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;