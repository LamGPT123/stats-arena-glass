
export interface PlayerAction {
  passes: number;
  shots: number;
  tackles: number;
  assists: number;
  goals: number;
  yellow_cards: number;
  red_cards: number;
}

export interface Player {
  team: string;
  name: string;
  number: number;
  position: string;
  actions: PlayerAction;
}

export interface Teams {
  home: string;
  away: string;
}

export interface MatchData {
  match_id: string;
  teams: Teams;
  score: string;
  players: Player[];
}
