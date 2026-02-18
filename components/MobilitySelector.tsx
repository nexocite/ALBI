
import React from 'react';
import { Place, MobilityMode } from '../types';
import { ICONS } from '../constants';
import { Bike, Bus, Users, Car, MapPin } from 'lucide-react';

interface MobilitySelectorProps {
  destination: Place;
  onSelect: (mode: MobilityMode) => void;
  onCancel: () => void;
}

interface MobilityOption {
  id: MobilityMode;
  name: string;
  icon: React.ReactNode;
  eta: string;
  cost: string;
  description: string;
  color: string;
}

const MobilitySelector: React.FC<MobilitySelectorProps> = ({ destination, onSelect, onCancel }) => {
  const options: MobilityOption[] = [
    {
      id: 'ebike',
      name: 'CDPHP Cycle!',
      icon: <Bike size={24} />,
      eta: '6 min',
      cost: '$2.00',
      description: 'E-bike nearby at State St station',
      color: 'bg-green-500/10 border-green-500/50 text-green-500'
    },
    {
      id: 'transit',
      name: 'CDTA Transit',
      icon: <Bus size={24} />,
      eta: '12 min',
      cost: '$1.50',
      description: 'Route 12 arrives in 4 mins',
      color: 'bg-blue-500/10 border-blue-500/50 text-blue-500'
    },
    {
      id: 'uber',
      name: 'Uber/Lyft',
      icon: <Car size={24} />,
      eta: '4 min wait',
      cost: '$12.40',
      description: 'Multiple drivers active nearby',
      color: 'bg-neutral-800 border-neutral-700 text-white'
    },
    {
      id: 'carpool',
      name: 'Local Carpool',
      icon: <Users size={24} />,
      eta: '8 min',
      cost: 'Free',
      description: 'Sarah is heading that way',
      color: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500'
    },
    {
      id: 'walk',
      name: 'Walk',
      icon: <MapPin size={24} />,
      eta: '15 min',
      cost: 'Free',
      description: 'Pleasant walk via Plaza',
      color: 'bg-neutral-800 border-neutral-700 text-neutral-400'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-6 animate-in fade-in zoom-in-95 duration-300">
      <header className="mb-8 mt-4">
        <button onClick={onCancel} className="text-neutral-500 mb-6 font-bold flex items-center gap-2">
          ← Cancel
        </button>
        <h2 className="text-3xl font-bold mb-2">How are we moving?</h2>
        <p className="text-neutral-400">Destination: <span className="text-yellow-500 font-bold">{destination.name}</span></p>
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pb-12">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full flex items-center gap-4 p-5 rounded-3xl border transition-all active:scale-[0.98] ${option.color}`}
          >
            <div className="p-3 rounded-2xl bg-white/5">
              {option.icon}
            </div>
            <div className="flex-1 text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-lg">{option.name}</span>
                <span className="text-xs font-black uppercase tracking-widest">{option.cost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs opacity-70">{option.description}</span>
                <span className="font-bold text-sm">{option.eta}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="pt-6 pb-12 safe-area-bottom">
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex gap-3 items-center">
          <div className="text-yellow-500">
            {ICONS.Zap}
          </div>
          <p className="text-[10px] text-yellow-500/80 font-medium uppercase tracking-wider leading-relaxed">
            ALBI recommendation: CDPHP Cycle! is fastest and helps your local impact score.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobilitySelector;
