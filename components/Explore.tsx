
import React, { useState } from 'react';
import { PLACES, EVENTS, STORIES } from '../data/mockData';
import { ICONS } from '../constants';

const ExploreView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Food', 'Events', 'Culture', 'Services'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold mb-4">Explore</h2>
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center text-neutral-500">
            {ICONS.Search}
          </div>
          <input 
            type="text" 
            placeholder="Search Albany..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-500"
          />
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${activeFilter === f ? 'bg-yellow-500 text-black' : 'bg-neutral-900 text-neutral-400 border border-neutral-800'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Simplified Map Preview */}
        <div className="h-40 bg-neutral-800 rounded-3xl relative overflow-hidden flex items-center justify-center">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]"></div>
           <p className="text-yellow-500 font-bold text-sm z-10">Map View (Mock)</p>
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
             7 Places Nearby
           </div>
        </div>

        <section>
          {activeFilter === 'All' || activeFilter === 'Food' ? (
            <>
              <h3 className="text-lg font-bold mb-4">Recommended for You</h3>
              <div className="space-y-4">
                {PLACES.map(place => (
                  <div key={place.id} className="bg-neutral-900/40 rounded-3xl border border-neutral-800 overflow-hidden flex flex-col">
                    <img src={place.image} className="h-48 w-full object-cover" alt={place.name} />
                    <div className="p-5">
                      <div className="flex justify-between mb-2">
                        <h4 className="text-lg font-bold">{place.name}</h4>
                        <span className="text-yellow-500 font-bold">★ {place.rating}</span>
                      </div>
                      <p className="text-sm text-neutral-400 mb-4">{place.description}</p>
                      <div className="flex gap-2">
                        {place.tags.map(t => <span key={t} className="text-[10px] bg-neutral-800 px-3 py-1 rounded-full text-neutral-500">#{t}</span>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default ExploreView;
