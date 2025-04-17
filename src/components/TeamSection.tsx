
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
        <div className="h-8 bg-darkAccent rounded mb-6 w-1/2 mx-auto animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="glass h-36 animate-pulse">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-darkAccent rounded-full mr-2"></div>
                  <div>
                    <div className="h-3 bg-darkAccent rounded w-24 mb-2"></div>
                    <div className="h-2 bg-darkAccent rounded w-16"></div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-full h-1 bg-darkAccent rounded"></div>
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
      <h2 className={`text-xl font-bold mb-4 text-center ${teamColor} border-b border-gray-700 pb-2`}>{team}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {players.map((player) => (
          <PlayerCard key={`${player.team}-${player.number}`} player={player} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
