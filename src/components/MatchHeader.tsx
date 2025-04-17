
import React from 'react';
import { Teams } from '../types/match';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      <div className="glass p-6 rounded-xl mb-8 animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4 mx-auto"></div>
        <div className="h-12 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
      </div>
    );
  }

  const [homeScore, awayScore] = score.split('-');

  return (
    <div className="glass p-6 rounded-xl mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
          <span className="text-samsunspor">{teams.home}</span>
          <span className="text-gray-500 dark:text-gray-400 mx-2">vs</span>
          <span className="text-galatasaray">{teams.away}</span>
        </h1>
        
        <div className="flex items-center space-x-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch id="live-mode" checked={isLiveMode} onCheckedChange={onToggleLiveMode} />
                  <Label htmlFor="live-mode" className="cursor-pointer">Live Mode</Label>
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
                <div className="flex items-center space-x-2">
                  <Switch id="json-view" checked={showJsonView} onCheckedChange={() => onToggleJsonView()} />
                  <Label htmlFor="json-view" className="cursor-pointer">JSON View</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View raw API data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex justify-center items-center mt-6">
        <div className="flex items-center space-x-2 md:space-x-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-samsunspor/10 rounded-full flex items-center justify-center border-2 border-samsunspor">
              <span className="text-xl md:text-3xl font-bold text-samsunspor">{homeScore}</span>
            </div>
            <span className="text-xs md:text-sm font-medium mt-1 text-samsunspor">HOME</span>
          </div>
          
          <div className="text-xl md:text-3xl font-bold text-gray-400">-</div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-galatasaray/10 rounded-full flex items-center justify-center border-2 border-galatasaray">
              <span className="text-xl md:text-3xl font-bold text-galatasaray">{awayScore}</span>
            </div>
            <span className="text-xs md:text-sm font-medium mt-1 text-galatasaray">AWAY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchHeader;
