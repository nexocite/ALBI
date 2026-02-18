
import React, { useState } from 'react';
import { CHAMPIONS } from '../data/mockData';
import { Champion, Experience } from '../types';
import { ICONS } from '../constants';

const ChampionsView: React.FC = () => {
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null);

  if (selectedChampion) {
    return (
      <div className="animate-in slide-in-from-right duration-300">
        <button onClick={() => setSelectedChampion(null)} className="mb-6 flex items-center gap-2 text-yellow-500 font-bold">
          ← Back to People
        </button>
        
        <div className="relative h-64 rounded-3xl overflow-hidden mb-6">
          <img src={selectedChampion.image} className="w-full h-full object-cover" alt={selectedChampion.name} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h2 className="text-3xl font-bold">{selectedChampion.name}</h2>
            <p className="text-yellow-500 font-bold">{selectedChampion.tagline}</p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">{selectedChampion.bio}</p>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Experiences</h3>
            {selectedChampion.experiences.map(exp => (
              <div key={exp.id} className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">{exp.title}</h4>
                  <span className="text-yellow-500 font-bold">${exp.price}</span>
                </div>
                <p className="text-xs text-neutral-500 mb-4">{exp.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{exp.duration} • {exp.meetingPoint}</span>
                  <button className="bg-yellow-500 text-black px-4 py-2 rounded-xl text-xs font-bold">Book Now</button>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800">
             <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
               AI Twin <span className="text-[10px] bg-yellow-500 text-black px-2 py-0.5 rounded-full uppercase">Beta</span>
             </h3>
             <p className="text-xs text-neutral-500 mb-4">Chat with {selectedChampion.name.split(' ')[0]}'s digital double to see if the vibe is right.</p>
             <button className="w-full py-4 rounded-xl border border-yellow-500/50 text-yellow-500 font-bold flex items-center justify-center gap-2">
               {ICONS.Chat} Chat with AI Twin
             </button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold">Champion Network</h2>
        <p className="text-neutral-500">Book human-led experiences from locals who love Albany.</p>
      </header>

      <div className="space-y-4">
        {CHAMPIONS.map(champion => (
          <div 
            key={champion.id} 
            onClick={() => setSelectedChampion(champion)}
            className="flex gap-4 bg-neutral-900 p-4 rounded-3xl border border-neutral-800 cursor-pointer active:scale-95 transition-transform"
          >
            <img src={champion.image} className="w-24 h-24 rounded-2xl object-cover" alt={champion.name} />
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold">{champion.name}</h4>
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  ★ {champion.rating}
                </div>
              </div>
              <p className="text-[10px] uppercase text-yellow-500 mb-2 font-bold tracking-wider">{champion.category}</p>
              <p className="text-xs text-neutral-400 line-clamp-2">{champion.tagline}</p>
              <div className="mt-3 text-[10px] text-neutral-600 font-bold uppercase">
                From ${champion.pricePerHour}/hr
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionsView;
