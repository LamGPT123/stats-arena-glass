
import { MatchData } from '../types/match';

// Simulating API delay
const mockFetch = <T>(data: T, delay = 1500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Mock match data
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

// Mock API functions
export const fetchMatchData = (): Promise<MatchData> => {
  return mockFetch(mockMatchData);
};
