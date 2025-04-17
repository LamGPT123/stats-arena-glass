
import { MatchData, Player } from '../types/match';

// Stats Perform API credentials
const API_USERNAME = 'statsperformdocs';
const API_PASSWORD = 'ti0ra#V8eg0AhSh';

// Base URLs for different endpoints
const BASE_URL = 'https://api.statsperform.com/v1';
const MATCH_STATS_URL = `${BASE_URL}/soccer/match/statistics`;

// Function to get auth token
const getAuthToken = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_USERNAME,
        client_secret: API_PASSWORD,
      }),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw error;
  }
};

// Helper to convert API player data to our app format
const mapPlayerData = (apiPlayer: any, teamName: string): Player => {
  return {
    team: teamName,
    name: apiPlayer.player.name || 'Unknown Player',
    number: apiPlayer.jerseyNumber || 0,
    position: apiPlayer.position || 'Unknown',
    actions: {
      passes: apiPlayer.stats?.passes?.total || 0,
      shots: apiPlayer.stats?.shots?.total || 0,
      tackles: apiPlayer.stats?.tackles?.total || 0,
      assists: apiPlayer.stats?.assists || 0,
      goals: apiPlayer.stats?.goals || 0,
      yellow_cards: apiPlayer.stats?.cards?.yellow || 0,
      red_cards: apiPlayer.stats?.cards?.red || 0
    }
  };
};

// Function to fetch match data
export const fetchMatchData = async (matchId = '2021-04-18-samsunspor-galatasaray'): Promise<MatchData> => {
  try {
    // First get the auth token
    const token = await getAuthToken();
    
    // Fetch match details
    const response = await fetch(`${MATCH_STATS_URL}/${matchId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch match data: ${response.status}`);
    }

    const matchData = await response.json();
    
    // Extract teams data
    const homeTeam = matchData.teams.find((team: any) => team.side === 'home') || {};
    const awayTeam = matchData.teams.find((team: any) => team.side === 'away') || {};
    
    // Extract player data
    const homePlayers = (homeTeam.players || []).map((player: any) => 
      mapPlayerData(player, homeTeam.name)
    );
    
    const awayPlayers = (awayTeam.players || []).map((player: any) => 
      mapPlayerData(player, awayTeam.name)
    );

    // Format the data for our app
    const formattedData: MatchData = {
      match_id: matchId,
      teams: {
        home: homeTeam.name || 'Home Team',
        away: awayTeam.name || 'Away Team'
      },
      score: `${homeTeam.score || 0}-${awayTeam.score || 0}`,
      players: [...homePlayers, ...awayPlayers]
    };

    return formattedData;
  } catch (error) {
    console.error('Error fetching match data:', error);
    
    // Fallback to mock data if API fails
    console.warn('Falling back to mock data due to API error');
    return fetchMockMatchData();
  }
};

// Fallback mock data if API fails
const fetchMockMatchData = (): Promise<MatchData> => {
  return mockFetch(mockMatchData);
};

// Simulate API delay for mock data
const mockFetch = <T>(data: T, delay = 1500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Mock match data - used as fallback if API fails
const mockMatchData: MatchData = {
  match_id: "SG-2024-01",
  teams: {
    home: "Samsunspor",
    away: "Galatasaray"
  },
  score: "1-2",
  players: [
    // Galatasaray Players
    {
      team: "Galatasaray",
      name: "Kerem Aktürkoğlu",
      number: 7,
      position: "Midfielder",
      actions: {
        passes: 34,
        shots: 3,
        tackles: 1,
        assists: 1,
        goals: 1,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Mauro Icardi",
      number: 9,
      position: "Forward",
      actions: {
        passes: 18,
        shots: 5,
        tackles: 0,
        assists: 0,
        goals: 1,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Fernando Muslera",
      number: 1,
      position: "Goalkeeper",
      actions: {
        passes: 25,
        shots: 0,
        tackles: 0,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Victor Osimhen",
      number: 45,
      position: "Forward",
      actions: {
        passes: 15,
        shots: 4,
        tackles: 0,
        assists: 1,
        goals: 0,
        yellow_cards: 1,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Davinson Sánchez",
      number: 6,
      position: "Defender",
      actions: {
        passes: 42,
        shots: 0,
        tackles: 4,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Lucas Torreira",
      number: 34,
      position: "Midfielder",
      actions: {
        passes: 47,
        shots: 1,
        tackles: 5,
        assists: 0,
        goals: 0,
        yellow_cards: 1,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Dries Mertens",
      number: 10,
      position: "Forward",
      actions: {
        passes: 28,
        shots: 2,
        tackles: 0,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Abdülkerim Bardakcı",
      number: 42,
      position: "Defender",
      actions: {
        passes: 35,
        shots: 0,
        tackles: 3,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Barış Alper Yılmaz",
      number: 50,
      position: "Midfielder",
      actions: {
        passes: 29,
        shots: 1,
        tackles: 2,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Kaan Ayhan",
      number: 4,
      position: "Defender",
      actions: {
        passes: 38,
        shots: 0,
        tackles: 2,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Galatasaray",
      name: "Yunus Akgün",
      number: 11,
      position: "Midfielder",
      actions: {
        passes: 23,
        shots: 1,
        tackles: 2,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },

    // Samsunspor Players
    {
      team: "Samsunspor",
      name: "Moryke Fofana",
      number: 10,
      position: "Forward",
      actions: {
        passes: 21,
        shots: 2,
        tackles: 0,
        assists: 0,
        goals: 1,
        yellow_cards: 1,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Okan Kocuk",
      number: 1,
      position: "Goalkeeper",
      actions: {
        passes: 23,
        shots: 0,
        tackles: 0,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Landry Dimata",
      number: 9,
      position: "Forward",
      actions: {
        passes: 17,
        shots: 3,
        tackles: 0,
        assists: 1,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Taylan Antalyalı",
      number: 6,
      position: "Midfielder",
      actions: {
        passes: 45,
        shots: 1,
        tackles: 4,
        assists: 0,
        goals: 0,
        yellow_cards: 1,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Zeki Yavru",
      number: 20,
      position: "Defender",
      actions: {
        passes: 30,
        shots: 0,
        tackles: 3,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Philip Kalu",
      number: 11,
      position: "Midfielder",
      actions: {
        passes: 22,
        shots: 1,
        tackles: 2,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Alim Öztürk",
      number: 15,
      position: "Defender",
      actions: {
        passes: 34,
        shots: 0,
        tackles: 2,
        assists: 0,
        goals: 0,
        yellow_cards: 1,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Youssef Ait Bennasser",
      number: 8,
      position: "Midfielder",
      actions: {
        passes: 38,
        shots: 0,
        tackles: 3,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Okan Erdoğan",
      number: 28,
      position: "Defender",
      actions: {
        passes: 29,
        shots: 0,
        tackles: 1,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Ercan Kara",
      number: 99,
      position: "Forward",
      actions: {
        passes: 12,
        shots: 2,
        tackles: 0,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    },
    {
      team: "Samsunspor",
      name: "Simon Falette",
      number: 23,
      position: "Defender",
      actions: {
        passes: 32,
        shots: 0,
        tackles: 4,
        assists: 0,
        goals: 0,
        yellow_cards: 0,
        red_cards: 0
      }
    }
  ]
};

// Set up polling for live data updates
let liveUpdateInterval: number | null = null;

export const startLiveUpdates = (
  matchId: string, 
  callback: (data: MatchData) => void, 
  interval = 30000
): void => {
  // Clear any existing interval
  stopLiveUpdates();
  
  // Set new interval to fetch data
  liveUpdateInterval = window.setInterval(async () => {
    try {
      const data = await fetchMatchData(matchId);
      callback(data);
    } catch (error) {
      console.error('Error in live update:', error);
    }
  }, interval);
};

export const stopLiveUpdates = (): void => {
  if (liveUpdateInterval !== null) {
    clearInterval(liveUpdateInterval);
    liveUpdateInterval = null;
  }
};
