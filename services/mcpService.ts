
import { PLACES, EVENTS, STORIES, CHAMPIONS } from '../data/mockData';

export const mcpTools = {
  getTransitInfo: async (location: string) => {
    // Mock GTFS real-time data
    return {
      status: 'Live',
      routes: [
        { route: 'Route 10', next: '4 mins', destination: 'Western Ave' },
        { route: 'Route 12', next: '12 mins', destination: 'Washington Ave' },
        { route: 'Route 805', next: '22 mins', destination: 'Schenectady' }
      ]
    };
  },

  getNearbyPlaces: async (lat: number, lng: number, category?: string) => {
    let results = PLACES;
    if (category) results = results.filter(p => p.category === category);
    return results.slice(0, 3);
  },

  getUpcomingEvents: async () => {
    return EVENTS.slice(0, 3);
  },

  getAIGreeting: (name: string, minutesFree: number) => {
    return `Hey ${name}, ALBI here. You've got ${minutesFree} minutes before your next bus. Let's make it count.`;
  },

  getWeather: async () => {
    return { temp: '72°F', condition: 'Clear Sky', icon: '☀️' };
  }
};
