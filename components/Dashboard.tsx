
import React from 'react';
import { ICONS } from '../constants';

const DashboardView: React.FC = () => {
  const points = 1250;
  const rank = "Insider";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-4">
        <div className="w-20 h-20 bg-yellow-500 rounded-3xl rotate-3 flex items-center justify-center shadow-lg shadow-yellow-500/20">
          <span className="text-black font-black text-3xl italic -rotate-3">JS</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Joel Smith</h2>
          <p className="text-yellow-500 font-bold">{rank} Level 4</p>
        </div>
      </header>

      <section className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest mb-1">Impact Points</p>
            <p className="text-3xl font-black text-white">{points.toLocaleString()}</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-widest mb-1">Spent Locally</p>
             <p className="text-lg font-bold text-yellow-500">$342.50</p>
          </div>
        </div>
        <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
          <div className="bg-yellow-500 h-full w-[65%]" />
        </div>
        <p className="text-[10px] text-neutral-500 mt-2">750 pts to Champion status</p>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton icon={ICONS.Clock} label="History" />
          <ActionButton icon={ICONS.MapPin} label="Saved Places" />
          <ActionButton icon={ICONS.Calendar} label="Bookings" />
          <ActionButton icon={ICONS.Settings} label="Preferences" />
        </div>
      </section>

      <section className="p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl border border-neutral-700/50">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl">
            {ICONS.Info}
          </div>
          <div>
            <h4 className="font-bold mb-1">Become a Champion</h4>
            <p className="text-xs text-neutral-400">Host your own Albany experiences and earn 80% on every booking.</p>
            <button className="mt-4 text-xs font-bold text-yellow-500 flex items-center gap-2">
              Learn more {ICONS.ArrowRight}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ActionButton: React.FC<{icon: React.ReactNode, label: string}> = ({icon, label}) => (
  <button className="flex flex-col items-center justify-center p-4 bg-neutral-900 rounded-2xl border border-neutral-800 gap-2 hover:border-yellow-500/50 transition-colors">
    <div className="text-neutral-500">{icon}</div>
    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{label}</span>
  </button>
);

export default DashboardView;
