
import React from 'react';
import { Home, Compass, MessageSquare, Star, Settings, User, MapPin, Clock, Calendar, Search, ArrowRight, Check, Zap, Info } from 'lucide-react';

export const WORK_LOCATIONS = [
  'Empire State Plaza',
  'Capitol',
  'Federal Building',
  'Downtown Albany',
  'Other'
];

export const GOALS = [
  'Lunch Discovery',
  'After-work Activities',
  'Culture & History',
  'City Services',
  'Make the most of my time'
];

export const INTERESTS = [
  'Coffee', 'Healthy', 'Casual', 'Fine Dining',
  'Music', 'Culture', 'Fitness', 'Learning',
  'Quiet', 'Social', 'Energetic'
];

export const ICONS = {
  Home: <Home size={24} />,
  Explore: <Compass size={24} />,
  Chat: <MessageSquare size={24} />,
  Champions: <Star size={24} />,
  User: <User size={24} />,
  Settings: <Settings size={24} />,
  MapPin: <MapPin size={16} />,
  Clock: <Clock size={16} />,
  Calendar: <Calendar size={16} />,
  Search: <Search size={20} />,
  ArrowRight: <ArrowRight size={20} />,
  Check: <Check size={20} />,
  Zap: <Zap size={18} />,
  Info: <Info size={16} />
};

export const COLORS = {
  primary: '#EAB308', // Tailwind yellow-500
  background: '#0a0a0a',
  surface: '#171717',
  text: '#f5f5f5',
  textMuted: '#a3a3a3'
};
