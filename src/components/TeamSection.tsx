
import React from 'react';
import { Player } from '../types/match';
import PlayerCard from './PlayerCard';

interface TeamSectionProps {
  team: string;
  players: Player[];
  isLoading: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team, players, isLoading }) => {
  const teamColor = team === 'Galatasaray' ? 'text-galatasaray' : 'text-samsunspor';
  const animationClass = team === 'Galatasaray' ? 'animate-slide-in-right' : 'animate-slide-in-left';
  
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-1/2 mx-auto animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="glass h-48 animate-pulse">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full mr-2"></div>
                  <div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${animationClass}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${teamColor}`}>{team}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {players.map((player) => (
          <PlayerCard key={`${player.team}-${player.number}`} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
