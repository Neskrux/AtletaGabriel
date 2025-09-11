import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Activity, Moon, Battery, Brain, AlertTriangle, Clock } from 'lucide-react';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSelector from './LanguageSelector';
import toast from 'react-hot-toast';
import Image from 'next/image';

const MorningCheckIn = () => {
  const { updateTodayData, athlete, completeCheckIn } = useStore();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    wakeUpTime: '',
    sleepQuality: '',
    sleepHours: 7,
    hunger: '',
    mood: '',
    energy: 50,
    pain: '',
    hadDreams: false,
    wokeUpAtNight: false,
    notes: '',
    weight: '',
    heartRate: ''
  });

  const steps = [
    {
      id: 'welcome',
      title: t('checkin.warriorCheckin'),
      subtitle: t('checkin.timeToDominate'),
      type: 'intro'
    },
    {
      id: 'wakeUpTime',
      title: t('checkin.wakeUpTime'),
      subtitle: t('checkin.disciplineConsistency'),
      type: 'time'
    },
    {
      id: 'sleep',
      title: t('checkin.sleepAnalysis'),
      subtitle: t('checkin.recoveryPerformance'),
      type: 'sleep'
    },
    {
      id: 'energy',
      title: t('checkin.energyLevel'),
      subtitle: t('checkin.rateEnergy'),
      type: 'slider'
    },
    {
      id: 'mood',
      title: t('checkin.mentalState'),
      subtitle: t('checkin.mindControlsBody'),
      type: 'choice',
      options: [
        { value: 'focused', label: t('checkin.focused'), color: 'border-green-500 text-green-500' },
        { value: 'motivated', label: t('checkin.motivated'), color: 'border-blood-400 text-blood-400' },
        { value: 'neutral', label: t('checkin.neutral'), color: 'border-steel-400 text-steel-400' },
        { value: 'tired', label: t('checkin.tired'), color: 'border-yellow-600 text-yellow-600' },
        { value: 'stressed', label: t('checkin.stressed'), color: 'border-orange-600 text-orange-600' }
      ]
    },
    {
      id: 'pain',
      title: t('checkin.painCheck'),
      subtitle: t('checkin.anyInjuries'),
      type: 'choice',
      options: [
        { value: 'none', label: t('checkin.noPain'), color: 'border-green-500 text-green-500' },
        { value: 'mild', label: t('checkin.mild'), color: 'border-yellow-600 text-yellow-600' },
        { value: 'moderate', label: t('checkin.moderate'), color: 'border-orange-600 text-orange-600' },
        { value: 'severe', label: t('checkin.severe'), color: 'border-red-600 text-red-600' }
      ]
    },
    {
      id: 'metrics',
      title: t('checkin.bodyMetrics'),
      subtitle: t('checkin.trackPhysical'),
      type: 'metrics'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      updateTodayData(answers);
      completeCheckIn();
      toast.success('CHECK-IN COMPLETE. TIME TO FIGHT!', {
        style: {
          background: '#1a1a1a',
          color: '#DC143C',
          border: '1px solid #DC143C',
        },
        iconTheme: {
          primary: '#DC143C',
          secondary: '#1a1a1a',
        },
      });
    }
  };

  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Language Selector - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 bg-dark-700 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blood-600 to-blood-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-steel-400 text-xs mt-2 text-center font-mono">
            {t('checkin.step')} {currentStep + 1}/{steps.length}
          </p>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-800 border border-dark-600 p-8"
          >
            {/* Title */}
            <h2 className="text-2xl font-bebas tracking-wider text-white mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-steel-400 text-sm mb-8 uppercase tracking-wide">
              {currentStepData.subtitle}
            </p>

            {/* Content based on type */}
            {currentStepData.type === 'intro' && (
              <div className="space-y-6">
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-blood-600 to-blood-400 blur-xl opacity-50"></div>
                  <Image
                    src={athlete.photos ? athlete.photos[0] : athlete.photo}
                    alt={athlete.name}
                    fill
                    className="object-cover border-2 border-blood-600"
                    style={{ filter: 'contrast(1.2) saturate(0.8)' }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-3xl font-bebas text-white tracking-wider">{athlete.name}</h3>
                  <p className="text-blood-400 font-russo text-sm">{athlete.category}</p>
                  <div className="flex justify-center gap-6 mt-4">
                    <div>
                      <span className="text-2xl font-bebas text-blood-400">{athlete.currentStreak}</span>
                      <p className="text-xs text-steel-400 uppercase">{t('dashboard.streak')}</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bebas text-blood-400">{athlete.totalTrainingDays}</span>
                      <p className="text-xs text-steel-400 uppercase">{t('profile.sessions')}</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bebas text-blood-400">{athlete.wins || 0}</span>
                      <p className="text-xs text-steel-400 uppercase">{t('performance.wins')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStepData.type === 'time' && (
              <div className="space-y-4">
                <input
                  type="time"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white text-lg focus:border-blood-400 focus:outline-none transition-colors font-mono"
                  value={answers.wakeUpTime}
                  onChange={(e) => handleAnswer('wakeUpTime', e.target.value)}
                />
              </div>
            )}

            {currentStepData.type === 'sleep' && (
              <div className="space-y-6">
                <div>
                  <label className="text-steel-400 text-xs uppercase tracking-wide mb-2 block">
                    {t('checkin.hoursOfSleep')}
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="0.5"
                      value={answers.sleepHours}
                      onChange={(e) => handleAnswer('sleepHours', parseFloat(e.target.value))}
                      className="flex-1 accent-blood-400"
                    />
                    <span className="text-2xl font-bebas text-blood-400 w-16 text-center">
                      {answers.sleepHours}h
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-steel-400 text-xs uppercase tracking-wide mb-3 block">
                    {t('checkin.sleepQuality')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['poor', 'fair', 'good', 'excellent'].map(quality => (
                      <button
                        key={quality}
                        onClick={() => handleAnswer('sleepQuality', quality)}
                        className={`py-3 border uppercase font-medium transition-all ${
                          answers.sleepQuality === quality
                            ? 'bg-blood-600 border-blood-400 text-white'
                            : 'bg-dark-700 border-dark-600 text-steel-400 hover:border-blood-600'
                        }`}
                      >
                        {t(`checkin.${quality}`)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer('hadDreams', !answers.hadDreams)}
                    className={`flex-1 py-2 border text-sm uppercase ${
                      answers.hadDreams
                        ? 'bg-dark-600 border-blood-400 text-blood-400'
                        : 'bg-dark-700 border-dark-600 text-steel-400'
                    }`}
                  >
                    {t('checkin.hadDreams')}
                  </button>
                  <button
                    onClick={() => handleAnswer('wokeUpAtNight', !answers.wokeUpAtNight)}
                    className={`flex-1 py-2 border text-sm uppercase ${
                      answers.wokeUpAtNight
                        ? 'bg-dark-600 border-blood-400 text-blood-400'
                        : 'bg-dark-700 border-dark-600 text-steel-400'
                    }`}
                  >
                    {t('checkin.wokeAtNight')}
                  </button>
                </div>
              </div>
            )}

            {currentStepData.type === 'slider' && (
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <span className="text-6xl font-bebas text-blood-400">{answers.energy}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={answers.energy}
                  onChange={(e) => handleAnswer('energy', parseInt(e.target.value))}
                  className="w-full accent-blood-400"
                />
                <div className="flex justify-between text-xs text-steel-400 uppercase">
                  <span>{t('checkin.empty')}</span>
                  <span>{t('checkin.readyToFight')}</span>
                </div>
              </div>
            )}

            {currentStepData.type === 'choice' && (
              <div className="space-y-3">
                {currentStepData.options.map(option => (
                  <button
                    key={option.value}
                    className={`w-full p-4 border-2 transition-all uppercase font-medium ${
                      answers[currentStepData.id] === option.value
                        ? `bg-dark-600 ${option.color} border-current`
                        : 'border-dark-600 text-steel-400 hover:border-dark-500'
                    }`}
                    onClick={() => handleAnswer(currentStepData.id, option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            {currentStepData.type === 'metrics' && (
              <div className="space-y-4">
                <div>
                  <label className="text-steel-400 text-xs uppercase tracking-wide mb-2 block">
                    {t('checkin.currentWeight')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                    value={answers.weight}
                    onChange={(e) => handleAnswer('weight', e.target.value)}
                    placeholder={t('checkin.optional')}
                  />
                </div>
                
                <div>
                  <label className="text-steel-400 text-xs uppercase tracking-wide mb-2 block">
                    {t('checkin.restingHeartRate')}
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                    value={answers.heartRate}
                    onChange={(e) => handleAnswer('heartRate', e.target.value)}
                    placeholder={t('checkin.optional')}
                  />
                </div>

                <div>
                  <label className="text-steel-400 text-xs uppercase tracking-wide mb-2 block">
                    {t('checkin.notes')}
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none resize-none"
                    value={answers.notes}
                    onChange={(e) => handleAnswer('notes', e.target.value)}
                    rows={3}
                    placeholder={t('checkin.anyObservations')}
                  />
                </div>
              </div>
            )}

            {/* Next Button */}
            <button
              className={`w-full mt-8 py-4 font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                (currentStepData.type === 'time' && !answers.wakeUpTime)
                  ? 'bg-dark-700 text-dark-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blood-600 to-blood-500 text-white hover:from-blood-500 hover:to-blood-400'
              }`}
              onClick={handleNext}
              disabled={currentStepData.type === 'time' && !answers.wakeUpTime}
            >
              {currentStep === steps.length - 1 ? t('checkin.complete') : t('checkin.next')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MorningCheckIn;