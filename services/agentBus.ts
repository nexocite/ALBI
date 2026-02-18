
import { mcpTools } from './mcpService';
import { PLACES, EVENTS, STORIES, CHAMPIONS } from '../data/mockData';

export class AgentBus {
  static async routeRequest(intent: string, params: any) {
    console.log(`[AgentBus] Routing intent: ${intent}`, params);

    switch (intent) {
      case 'MOBILITY':
        return await mcpTools.getTransitInfo(params.location || 'Downtown');
      
      case 'FOOD':
        return PLACES.filter(p => p.category === 'Food');
      
      case 'EVENTS':
        return EVENTS;
      
      case 'CULTURE':
        return {
          stories: STORIES,
          venues: PLACES.filter(p => p.category === 'Culture')
        };

      case 'CHAMPIONS':
        return CHAMPIONS;

      case 'INCENTIVES':
        return [
          { id: 'inc1', title: '50% off Coffee at Iron Gate', code: 'ALBI50', expires: 'Today' }
        ];

      default:
        return { error: 'Unknown domain agent' };
    }
  }
}
