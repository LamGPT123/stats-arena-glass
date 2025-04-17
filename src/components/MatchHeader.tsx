
import React from 'react';
import { Teams } from '../types/match';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface MatchHeaderProps {
  teams: Teams;
  score: string;
  isLoading: boolean;
  isLiveMode: boolean;
  onToggleLiveMode: (value: boolean) => void;
  onToggleJsonView: () => void;
  showJsonView: boolean;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({
  teams,
  score,
  isLoading,
  isLiveMode,
  onToggleLiveMode,
  onToggleJsonView,
  showJsonView,
}) => {
  if (isLoading) {
    return (
      <Card className="glass mb-8 animate-pulse">
        <CardContent className="p-6">
          <div className="h-8 w-3/4 bg-darkAccent rounded mb-4 mx-auto"></div>
          <div className="h-12 w-1/2 bg-darkAccent rounded mx-auto"></div>
        </CardContent>
      </Card>
    );
  }

  const [homeScore, awayScore] = score.split('-');

  return (
    <Card className="glass mb-8 animate-fade-in border border-githubBlue/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="text-base text-gray-400 mb-2">Turkish Super Lig • Matchday 27</div>
          <div className="flex items-center justify-center space-x-4">
            <div className="flex flex-col items-center w-32">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-darkAccent to-darkBg border-2 border-samsunspor/30">
                <span className="text-lg font-bold text-samsunspor">{teams.home}</span>
              </div>
            </div>
            
            <div className="vs-circle">VS</div>
            
            <div className="flex flex-col items-center w-32">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-darkAccent to-darkBg border-2 border-galatasaray/30">
                <span className="text-lg font-bold text-galatasaray">{teams.away}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center px-5 py-2 rounded-full bg-darkAccent border border-githubBlue/20">
            <div className="flex flex-col items-center w-16">
              <div className="text-3xl font-bold text-samsunspor">{homeScore}</div>
            </div>
            
            <div className="mx-3 text-gray-500">-</div>
            
            <div className="flex flex-col items-center w-16">
              <div className="text-3xl font-bold text-galatasaray">{awayScore}</div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-darkAccent border border-githubBlue/20">
                  <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
                  <Switch id="live-mode" checked={isLiveMode} onCheckedChange={onToggleLiveMode} />
                  <Label htmlFor="live-mode" className="cursor-pointer text-sm">LIVE</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle simulated live mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-darkAccent border border-githubBlue/20">
                  <Switch id="json-view" checked={showJsonView} onCheckedChange={() => onToggleJsonView()} />
                  <Label htmlFor="json-view" className="cursor-pointer text-sm">API Data</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View raw API data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
