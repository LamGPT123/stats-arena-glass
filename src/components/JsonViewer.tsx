
import React from 'react';
import { MatchData } from '../types/match';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JsonViewerProps {
  data: MatchData | null;
  isLoading: boolean;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="glass animate-pulse h-96 border border-githubBlue/20">
        <CardContent className="h-full w-full flex items-center justify-center">
          <div className="h-4/5 w-4/5 bg-darkAccent rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass animate-fade-in border border-githubBlue/20">
      <CardHeader>
        <CardTitle className="text-githubBlue">API Response Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[600px] bg-[#0d1117] p-4 rounded-lg border border-githubBlue/10">
          <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default JsonViewer;
