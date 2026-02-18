
export interface UserProfile {
  id: string;
  name: string;
  language: string;
  interests: string[];
  goals: string[];
  workLocation: string;
  dwellTimeHabit: 'lunch' | 'after-work' | 'both';
  isFirstTime: boolean;
}

export interface Place {
  id: string;
  name: string;
  category: 'Food' | 'Culture' | 'Services' | 'Retail';
  description: string;
  address: string;
  geo: { lat: number; lng: number };
  hours: string;
  rating: number;
  image: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  organizer: string;
  tags: string[];
  image: string;
  price?: number; // 0 or undefined means free
}

export interface CulturalStory {
  id: string;
  title: string;
  content: string;
  location: string;
  geo: { lat: number; lng: number };
  source: string;
}

export interface Champion {
  id: string;
  name: string;
  category: 'History' | 'Foodie' | 'Art' | 'Influencer';
  tagline: string;
  bio: string;
  rating: number;
  pricePerHour: number;
  availability: string[];
  image: string;
  experiences: Experience[];
}

export interface Experience {
  id: string;
  championId: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  meetingPoint: string;
}

export interface Booking {
  id: string;
  userId: string;
  experienceId: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentId?: string;
}

export enum AppTab {
  HOME = 'home',
  EXPLORE = 'explore',
  CHAT = 'chat',
  CHAMPIONS = 'champions',
  DASHBOARD = 'dashboard'
}

export type MobilityMode = 'ebike' | 'transit' | 'carpool' | 'uber' | 'taxi' | 'walk';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}
