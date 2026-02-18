
import React from 'react';
import { UserProfile, AppTab, Place, Champion, Experience } from '../types';
import { ICONS, COLORS } from '../constants';
import { PLACES, EVENTS, STORIES, CHAMPIONS } from '../data/mockData';
import { Utensils, Ticket, UserCheck, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  user: UserProfile;
  onAction: (tab: AppTab) => void;
  onNavigate: (place: Place) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ user, onAction, onNavigate }) => {
  const minutesFree = 45; // Mock data for CAG

  // Extract foodie tours from champions
  const foodieTours = CHAMPIONS.filter(c => c.category === 'Foodie').flatMap(c => 
    c.experiences.map(e => ({ ...e, championName: c.name.split(' "')[0], championImage: c.image }))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header section with Greeting and Minutes */}
      <header>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">Hey {user.name},</h2>
            <p className="text-neutral-500 flex items-center gap-1">
              {ICONS.Zap} You have <span className="text-yellow-500 font-bold">{minutesFree} minutes</span> free
            </p>
          </div>
          <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800 text-center min-w-[80px]">
            <p className="text-[10px] uppercase text-neutral-500 font-bold">Transit</p>
            <p className="text-lg font-black text-yellow-500">8m</p>
          </div>
        </div>
      </header>

      {/* Primary Contextual CTA */}
      <section className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl p-6 text-black shadow-xl">
        <h3 className="text-xl font-bold mb-1 italic">Make it count.</h3>
        <p className="text-sm opacity-90 mb-4">You can grab a custom blend at Iron Gate or walk the Capitol steps before your bus.</p>
        <button 
          onClick={() => onAction(AppTab.CHAT)}
          className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm"
        >
          Plan my gap
        </button>
      </section>

      {/* Cultural Story Micro-Card */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Albany Lore</h3>
          <span className="text-xs text-yellow-500">Nearby</span>
        </div>
        <div className="bg-neutral-900 rounded-2xl p-4 border border-neutral-800">
          <h4 className="font-bold text-yellow-500 mb-2">{STORIES[0].title}</h4>
          <p className="text-sm text-neutral-400 line-clamp-2">{STORIES[0].content}</p>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-600">
            {ICONS.MapPin} {STORIES[0].location}
          </div>
        </div>
      </section>

      {/* Lunch Nearby */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Lunch Nearby</h3>
          <button onClick={() => onAction(AppTab.EXPLORE)} className="text-xs text-neutral-500 flex items-center gap-1">
            See all <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
          {PLACES.filter(p => p.category === 'Food').map(place => (
            <div key={place.id} className="min-w-[240px] bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
              <img src={place.image} className="h-32 w-full object-cover" alt={place.name} />
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm">{place.name}</h4>
                  <div className="flex items-center gap-1 text-yellow-500 text-xs">
                    <Star size={12} fill="currentColor" /> {place.rating}
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mb-3">{place.address}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onNavigate(place)}
                    className="flex-1 bg-yellow-500 text-black text-[10px] font-bold py-2 rounded-lg active:bg-yellow-400 transition-colors"
                  >
                    Go
                  </button>
                  <button className="px-3 border border-neutral-700 rounded-lg text-neutral-400 flex items-center justify-center">
                    {ICONS.Calendar}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Foodie Tours */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Utensils size={18} className="text-yellow-500" /> Available Foodie Tours
          </h3>
          <button onClick={() => onAction(AppTab.CHAMPIONS)} className="text-xs text-neutral-500 flex items-center gap-1">
            Find Champions <ChevronRight size={12} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 no-scrollbar">
          {foodieTours.map((tour, idx) => (
            <div key={idx} className="min-w-[280px] bg-neutral-900/40 rounded-3xl border border-neutral-800 p-4">
              <div className="flex gap-3 mb-3">
                <img src={tour.championImage} className="w-12 h-12 rounded-xl object-cover" alt={tour.championName} />
                <div>
                  <h4 className="font-bold text-sm leading-tight">{tour.title}</h4>
                  <p className="text-[10px] text-yellow-500 uppercase font-bold tracking-wider">with {tour.championName}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 mb-4 line-clamp-2 h-8">{tour.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-black">${tour.price}</span>
                <button 
                  onClick={() => onAction(AppTab.CHAMPIONS)}
                  className="bg-neutral-800 text-white border border-neutral-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider hover:border-yellow-500 transition-colors"
                >
                  Book Tour
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Happening Today */}
      <section>
        <h3 className="text-lg font-bold mb-4">Happening Today</h3>
        {EVENTS.map(event => (
          <div key={event.id} className="flex gap-4 bg-neutral-900/50 p-3 rounded-2xl mb-4 border border-neutral-800/50 group">
            <img src={event.image} className="w-24 h-24 rounded-xl object-cover" alt={event.title} />
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-sm">{event.title}</h4>
                  <span className="text-[10px] font-bold text-yellow-500">
                    {event.price && event.price > 0 ? `$${event.price}` : 'FREE'}
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 mb-2 uppercase tracking-widest font-bold">
                  {new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {event.location}
                </p>
                <div className="flex gap-1 mb-3">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-[8px] bg-neutral-800/50 px-1.5 py-0.5 rounded text-neutral-400 border border-neutral-700/30">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                {event.price && event.price > 0 ? (
                  <button className="flex-1 bg-yellow-500 text-black py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-transform">
                    <Ticket size={12} /> Buy Now
                  </button>
                ) : (
                  <button className="flex-1 bg-neutral-800 text-white border border-neutral-700 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-transform hover:border-yellow-500/50">
                    <UserCheck size={12} /> Claim Free Seat
                  </button>
                )}
                <button className="px-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-500">
                  {ICONS.Info}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Star: React.FC<{size: number, fill?: string}> = ({size, fill}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

export default HomeView;
