
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { WORK_LOCATIONS, GOALS, INTERESTS, COLORS } from '../constants';

interface OnboardingProps {
  onFinish: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    name: '',
    language: 'English',
    interests: [],
    goals: [],
    workLocation: '',
    dwellTimeHabit: 'lunch',
    isFirstTime: true
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleInterest = (interest: string) => {
    setProfile(p => ({
      ...p,
      interests: p.interests?.includes(interest) 
        ? p.interests.filter(i => i !== interest)
        : [...(p.interests || []), interest]
    }));
  };

  const toggleGoal = (goal: string) => {
    setProfile(p => ({
      ...p,
      goals: p.goals?.includes(goal)
        ? p.goals.filter(g => g !== goal)
        : [...(p.goals || []), goal].slice(0, 3)
    }));
  };

  const steps = [
    {
      title: "Welcome to ALBI",
      subtitle: "Your sovereign companion for Downtown Albany.",
      content: (
        <div className="space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/30">
              <span className="text-black font-black text-4xl italic">A</span>
            </div>
          </div>
          <input 
            type="text" 
            placeholder="What should I call you?" 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white focus:outline-none focus:border-yellow-500"
            value={profile.name}
            onChange={e => setProfile({...profile, name: e.target.value})}
          />
        </div>
      )
    },
    {
      title: "What brings you Downtown?",
      subtitle: "Select up to 3 goals to help ALBI personalize your feeds.",
      content: (
        <div className="grid grid-cols-1 gap-3">
          {GOALS.map(goal => (
            <button 
              key={goal}
              onClick={() => toggleGoal(goal)}
              className={`p-4 rounded-xl border transition-all text-left ${profile.goals?.includes(goal) ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}
            >
              {goal}
            </button>
          ))}
        </div>
      )
    },
    {
      title: "Where's your home base?",
      subtitle: "Helps with hyper-local transit and dining alerts.",
      content: (
        <div className="space-y-4">
          <select 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-white appearance-none"
            value={profile.workLocation}
            onChange={e => setProfile({...profile, workLocation: e.target.value})}
          >
            <option value="">Select Work Location</option>
            {WORK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
            <p className="text-xs text-neutral-500 mb-2 uppercase tracking-widest font-bold">Privacy Promise</p>
            <p className="text-sm text-neutral-400">Your location is only used to calculate proximity. We never sell your data.</p>
          </div>
        </div>
      )
    },
    {
      title: "What do you enjoy?",
      subtitle: "Help ALBI recommend culture, events, and food.",
      content: (
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => (
            <button 
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${profile.interests?.includes(interest) ? 'bg-yellow-500 border-yellow-500 text-black font-bold' : 'bg-neutral-900 border-neutral-800 text-neutral-400'}`}
            >
              {interest}
            </button>
          ))}
        </div>
      )
    }
  ];

  const currentStepData = steps[step];

  return (
    <div className="h-screen w-full bg-black text-white p-6 flex flex-col max-w-md mx-auto">
      <div className="flex-1 mt-12">
        <h1 className="text-3xl font-bold mb-2">{currentStepData.title}</h1>
        <p className="text-neutral-400 mb-10">{currentStepData.subtitle}</p>
        {currentStepData.content}
      </div>

      <div className="flex gap-4 mb-8">
        {step > 0 && (
          <button 
            onClick={prevStep}
            className="flex-1 py-4 rounded-xl font-bold bg-neutral-800 text-white"
          >
            Back
          </button>
        )}
        <button 
          onClick={step === steps.length - 1 ? () => onFinish(profile as UserProfile) : nextStep}
          disabled={step === 0 && !profile.name}
          className="flex-[2] py-4 rounded-xl font-bold bg-yellow-500 text-black disabled:opacity-50"
        >
          {step === steps.length - 1 ? 'Get Started' : 'Next'}
        </button>
      </div>

      <div className="flex justify-center gap-1 mb-4">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-8 bg-yellow-500' : 'w-2 bg-neutral-800'}`} />
        ))}
      </div>
    </div>
  );
};

export default Onboarding;
