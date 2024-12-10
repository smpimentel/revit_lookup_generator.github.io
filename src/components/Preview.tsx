import React from 'react';
import { useParameterStore } from '../store/useParameterStore';
import { TableHeader } from './TableHeader';

export const Preview: React.FC = () => {
  const { parameters } = useParameterStore();
  
  const generateCombinations = () => {
    const values = parameters.map((p) => p.values);
    const result: string[][] = [];
    
    const combine = (current: string[], depth: number) => {
      if (depth === values.length) {
        result.push([...current]);
        return;
      }
      
      for (const value of values[depth]) {
        current.push(value);
        combine(current, depth + 1);
        current.pop();
      }
    };
    
    combine([], 0);
    return result;
  };

  const combinations = generateCombinations();

  return (
    <div className="mt-8">
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader parameters={parameters} />
          <tbody className="bg-white divide-y divide-gray-200">
            {combinations.map((combination, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 text-sm text-gray-900 border-r whitespace-nowrap">
                  Row_{index + 1}
                </td>
                {combination.map((value, valueIndex) => (
                  <td
                    key={valueIndex}
                    className="px-4 py-2 text-sm text-gray-900 border-r whitespace-nowrap"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};