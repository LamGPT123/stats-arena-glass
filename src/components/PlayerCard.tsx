
import React from 'react';
import { Player } from '../types/match';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
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
  
  // Action icons with tooltips
  const actionIcons = [
    { 
      name: 'Passes', 
      value: player.actions.passes, 
      icon: <Network size={18} />,
      color: 'bg-statNeutral/10 text-statNeutral'
    },
    { 
      name: 'Shots', 
      value: player.actions.shots, 
      icon: <Target size={18} />,
      color: 'bg-statNeutral/10 text-statNeutral'
    },
    { 
      name: 'Tackles', 
      value: player.actions.tackles, 
      icon: <Shield size={18} />,
      color: 'bg-statNeutral/10 text-statNeutral'
    },
    { 
      name: 'Assists', 
      value: player.actions.assists, 
      icon: <Smile size={18} />,
      color: 'bg-statGood/10 text-statGood'
    },
    { 
      name: 'Goals', 
      value: player.actions.goals, 
      icon: <Goal size={18} />,
      color: 'bg-statGood/10 text-statGood'
    },
    { 
      name: 'Cards', 
      value: player.actions.yellow_cards + player.actions.red_cards, 
      icon: <AlertCircle size={18} />,
      color: 'bg-statBad/10 text-statBad'
    },
  ];

  return (
    <div className="glass hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden h-full transform hover:scale-[1.02]">
      <div className={`p-4 ${teamBgClass}`}>
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 rounded-full border ${teamColorClass} flex items-center justify-center`}>
            <span className="text-sm font-semibold">{player.number}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold truncate">{player.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{player.position}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <TooltipProvider>
          <div className="grid grid-cols-3 gap-2">
            {actionIcons.map((action) => (
              <Tooltip key={action.name}>
                <TooltipTrigger asChild>
                  <div className={`flex flex-col items-center p-2 rounded-lg ${action.color}`}>
                    <div className="mb-1">{action.icon}</div>
                    <div className="text-sm font-medium">{action.value}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
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
      </div>
    </div>
  );
};

export default PlayerCard;
