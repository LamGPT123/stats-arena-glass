
import React from 'react';
import { Player } from '../types/match';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Shield, 
  Target, 
  Network, 
  Smile, 
  Goal, 
  AlertCircle 
} from 'lucide-react';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const isGalatasaray = player.team === 'Galatasaray';
  const teamColorClass = isGalatasaray ? 'text-galatasaray border-galatasaray' : 'text-samsunspor border-samsunspor';
  const teamBgClass = isGalatasaray ? 'bg-galatasaray/10' : 'bg-samsunspor/10';
  
  const getMaxValue = (statName: string) => {
    switch(statName) {
      case 'Passes': return 50;
      case 'Shots': return 10;
      case 'Tackles': return 10;
      case 'Assists': return 5;
      case 'Goals': return 5;
      case 'Cards': return 5;
      default: return 10;
    }
  };
  
  const getProgressColor = (statName: string) => {
    switch(statName) {
      case 'Goals':
      case 'Assists':
        return 'bg-statGood';
      case 'Cards':
        return 'bg-statBad';
      default:
        return 'bg-githubBlue';
    }
  };
  
  // Action icons with tooltips
  const actionIcons = [
    { 
      name: 'Passes', 
      value: player.actions.passes, 
      icon: <Network size={16} />,
      maxValue: getMaxValue('Passes'),
      color: getProgressColor('Passes')
    },
    { 
      name: 'Shots', 
      value: player.actions.shots, 
      icon: <Target size={16} />,
      maxValue: getMaxValue('Shots'),
      color: getProgressColor('Shots')
    },
    { 
      name: 'Tackles', 
      value: player.actions.tackles, 
      icon: <Shield size={16} />,
      maxValue: getMaxValue('Tackles'),
      color: getProgressColor('Tackles')
    },
    { 
      name: 'Assists', 
      value: player.actions.assists, 
      icon: <Smile size={16} />,
      maxValue: getMaxValue('Assists'),
      color: getProgressColor('Assists')
    },
    { 
      name: 'Goals', 
      value: player.actions.goals, 
      icon: <Goal size={16} />,
      maxValue: getMaxValue('Goals'),
      color: getProgressColor('Goals')
    },
    { 
      name: 'Cards', 
      value: player.actions.yellow_cards + player.actions.red_cards, 
      icon: <AlertCircle size={16} />,
      maxValue: getMaxValue('Cards'),
      color: getProgressColor('Cards')
    },
  ];

  return (
    <Card className="betting-card">
      <CardHeader className={`py-3 px-4 ${teamBgClass}`}>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full border ${teamColorClass} flex items-center justify-center animate-pulse-glow`}>
            <span className="text-sm font-semibold">{player.number}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold truncate text-base">{player.name}</h3>
            <p className="text-xs text-gray-400">{player.position}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-3">
        <TooltipProvider>
          <div className="space-y-2">
            {actionIcons.map((action) => (
              <Tooltip key={action.name}>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 flex justify-center">{action.icon}</div>
                    <div className="flex-1">
                      <Progress 
                        value={(action.value / action.maxValue) * 100} 
                        className="h-1.5"
                      />
                    </div>
                    <div className="text-xs font-medium w-5 text-right">{action.value}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-sm">{action.name}: {action.value}</p>
                  {action.name === 'Cards' && (
                    <div className="text-xs text-gray-400">
                      Yellow: {player.actions.yellow_cards}, Red: {player.actions.red_cards}
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
