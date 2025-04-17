
import React from 'react';
import { MatchData } from '../types/match';

interface JsonViewerProps {
  data: MatchData | null;
  isLoading: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass p-6 rounded-xl animate-pulse h-96">
        <div className="h-full w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-xl animate-fade-in">
      <h2 className="text-xl font-bold mb-4">Raw API Response</h2>
      <div className="overflow-auto max-h-[600px] bg-gray-900 p-4 rounded-lg">
        <pre className="text-green-400 text-sm whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JsonViewer;
