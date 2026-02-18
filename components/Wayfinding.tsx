
import React, { useState, useEffect } from 'react';
import { Place } from '../types';
import { ICONS } from '../constants';
import { MapPin } from 'lucide-react';

interface WayfindingProps {
  destination: Place;
  onCancel: () => void;
}

const Wayfinding: React.FC<WayfindingProps> = ({ destination, onCancel }) => {
  const [distance, setDistance] = useState<number>(0.4); // Miles
  const [eta, setEta] = useState<number>(8); // Minutes
  const [currentStep, setCurrentStep] = useState(0);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);

  const steps = [
    { instruction: "Head north on S Pearl St toward State St", icon: "↑", dist: "0.1 mi" },
    { instruction: "Turn left onto State St", icon: "←", dist: "0.2 mi" },
    { instruction: "Turn right onto Washington Ave", icon: "→", dist: "0.1 mi" },
    { instruction: "Your destination will be on the left", icon: "📍", dist: "100 ft" }
  ];

  useEffect(() => {
    // Attempt to get real geolocation
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          // In a real app, we'd calculate actual distance to destination here
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Simulate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => Math.max(0, prev - 0.01));
      setEta(prev => Math.max(0, prev - 0.2));
      if (distance < 0.3 && currentStep === 0) setCurrentStep(1);
      if (distance < 0.1 && currentStep === 1) setCurrentStep(2);
      if (distance < 0.05 && currentStep === 2) setCurrentStep(3);
    }, 3000);
    return () => clearInterval(timer);
  }, [distance, currentStep]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in slide-in-from-bottom duration-500">
      {/* Top Navigation Bar */}
      <div className="bg-neutral-900/80 backdrop-blur-xl p-6 pt-12 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-black text-3xl font-black">
            {steps[currentStep].icon}
          </div>
          <div className="flex-1">
            <p className="text-sm text-yellow-500 font-bold uppercase tracking-widest">{steps[currentStep].dist}</p>
            <h2 className="text-xl font-bold leading-tight">{steps[currentStep].instruction}</h2>
          </div>
        </div>
      </div>

      {/* Simulated Map View */}
      <div className="flex-1 relative overflow-hidden bg-[#0f0f0f]">
        {/* Abstract Map Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(-100px)]"></div>
        
        {/* Navigation Path */}
        <div className="absolute left-1/2 bottom-0 w-2 bg-yellow-500/50 h-[80%] -translate-x-1/2 blur-sm"></div>
        <div className="absolute left-1/2 bottom-0 w-1 bg-yellow-500 h-[80%] -translate-x-1/2 shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>

        {/* User Indicator */}
        <div className="absolute left-1/2 bottom-20 -translate-x-1/2 transition-all duration-1000">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>
          <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping"></div>
        </div>

        {/* Destination Pin */}
        <div className="absolute left-1/2 top-20 -translate-x-1/2 text-center">
          <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-black mb-2 shadow-lg uppercase tracking-wider">
            {destination.name}
          </div>
          <div className="text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,1)]">
            <MapPin size={40} />
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-2">
          <button className="w-12 h-12 bg-neutral-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white">
            <CompassIcon size={20} />
          </button>
          <button className="w-12 h-12 bg-neutral-900/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white">
            +
          </button>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-neutral-900 p-6 pb-12 border-t border-white/10 flex items-center justify-between">
        <div className="flex gap-6">
          <div>
            <p className="text-3xl font-black">{Math.ceil(eta)}<span className="text-sm font-normal text-neutral-500 ml-1">min</span></p>
            <p className="text-xs text-neutral-500 uppercase font-bold">Arrival: {(new Date(Date.now() + eta * 60000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <div className="h-10 w-px bg-neutral-800 self-center"></div>
          <div>
            <p className="text-3xl font-black">{distance.toFixed(1)}<span className="text-sm font-normal text-neutral-500 ml-1">mi</span></p>
            <p className="text-xs text-neutral-500 uppercase font-bold">Distance</p>
          </div>
        </div>
        
        <button 
          onClick={onCancel}
          className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-2xl font-bold active:scale-95 transition-all"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

const CompassIcon: React.FC<{size: number}> = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
);

export default Wayfinding;
