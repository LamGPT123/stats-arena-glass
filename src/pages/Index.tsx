
import React, { useEffect, useState, useCallback } from 'react';
import { fetchMatchData, startLiveUpdates, stopLiveUpdates } from '../services/api';
import { MatchData } from '../types/match';
import MatchHeader from '../components/MatchHeader';
import TeamSection from '../components/TeamSection';
import JsonViewer from '../components/JsonViewer';
import { Separator } from "@/components/ui/separator";
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [matchData, setMatchData] = useState<MatchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [showJsonView, setShowJsonView] = useState<boolean>(false);
  const [matchId, setMatchId] = useState<string>('2021-04-18-samsunspor-galatasaray');

  // Callback function to update match data
  const updateMatchData = useCallback((data: MatchData) => {
    setMatchData(data);
    toast({
      title: "Match data updated",
      description: `Latest score: ${data.score}`,
    });
  }, []);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMatchData(matchId);
        setMatchData(data);
        toast({
          title: "Match data loaded",
          description: `${data.teams.home} vs ${data.teams.away}`,
        });
      } catch (error) {
        console.error("Error fetching match data:", error);
        toast({
          title: "Error loading match data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [matchId]);

  // Handle live updates
  useEffect(() => {
    if (isLiveMode && matchData) {
      startLiveUpdates(matchId, updateMatchData);
    } else {
      stopLiveUpdates();
    }

    // Cleanup on component unmount
    return () => {
      stopLiveUpdates();
    };
  }, [isLiveMode, matchId, matchData, updateMatchData]);

  const toggleLiveMode = (value: boolean) => {
    setIsLiveMode(value);
    toast({
      title: value ? "Live mode activated" : "Live mode deactivated",
      description: value 
        ? "Updates will be received in real-time" 
        : "Real-time updates paused",
    });
  };

  const toggleJsonView = () => {
    setShowJsonView(!showJsonView);
  };

  // Filter players by team
  const homeTeamPlayers = matchData?.players.filter(player => player.team === matchData.teams.home) || [];
  const awayTeamPlayers = matchData?.players.filter(player => player.team === matchData.teams.away) || [];

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Match Header */}
        <MatchHeader 
          teams={matchData?.teams || {home: "", away: ""}}
          score={matchData?.score || "0-0"}
          isLoading={isLoading}
          isLiveMode={isLiveMode}
          onToggleLiveMode={toggleLiveMode}
          onToggleJsonView={toggleJsonView}
          showJsonView={showJsonView}
        />

        {/* Main Content */}
        {showJsonView ? (
          <JsonViewer data={matchData} isLoading={isLoading} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Home Team */}
            <TeamSection 
              team={matchData?.teams.home || ""}
              players={homeTeamPlayers}
              isLoading={isLoading}
            />
            
            {/* Separator */}
            <div className="hidden lg:block">
              <Separator orientation="vertical" className="h-full bg-githubBlue/20" />
            </div>
            <div className="block lg:hidden">
              <Separator orientation="horizontal" className="w-full bg-githubBlue/20" />
            </div>
            
            {/* Away Team */}
            <TeamSection 
              team={matchData?.teams.away || ""}
              players={awayTeamPlayers}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <p>Football Match Stats Viewer &copy; 2025</p>
          <p className="mt-1">Betting Odds & Match Analysis</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
