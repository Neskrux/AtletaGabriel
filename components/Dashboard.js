import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, MapPin, Flame, Target, Activity, Zap } from 'lucide-react';
import useStore from '../lib/store';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { athlete, todayData, weeklySchedule, toggleActivity } = useStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayActivities, setTodayActivities] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const dayOfWeek = new Date().getDay();
    setTodayActivities(weeklySchedule[dayOfWeek] || []);
  }, [weeklySchedule]);

  const handleToggleActivity = (activityId) => {
    toggleActivity(activityId);
    const activity = todayActivities.find(a => a.id === activityId);
    
    if (todayData.completedActivities.includes(activityId)) {
      toast.error(`${activity.title} UNMARKED`, {
        style: {
          background: '#1a1a1a',
          color: '#fff',
          border: '1px solid #DC143C',
        },
      });
    } else {
      toast.success(`${activity.title} COMPLETED!`, {
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

  const completionRate = todayActivities.length > 0 
    ? (todayData.completedActivities.length / todayActivities.length) * 100 
    : 0;

  const getIntensityColor = (intensity) => {
    switch (intensity) {
      case 'extreme': return 'border-red-600 text-red-500';
      case 'high': return 'border-orange-600 text-orange-500';
      case 'medium': return 'border-yellow-600 text-yellow-500';
      case 'low': return 'border-green-600 text-green-500';
      default: return 'border-steel-600 text-steel-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'combat': return '⚔️';
      case 'strength': return '💪';
      case 'conditioning': return '🏃';
      case 'mental': return '🧠';
      case 'meal': return '🥩';
      case 'recovery': return '🛡️';
      default: return '📍';
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bebas tracking-wider text-white">
                {format(currentTime, 'HH:mm')}
              </h1>
              <p className="text-steel-400 text-sm uppercase tracking-wide">
                {format(currentTime, "EEEE, d MMM", { locale: ptBR })}
              </p>
            </div>
            <div className="relative w-20 h-20">
              <Image
                src={athlete.photos ? athlete.photos[selectedPhoto] : athlete.photo}
                alt={athlete.name}
                fill
                className="object-cover border-2 border-blood-600"
                style={{ filter: 'contrast(1.1)' }}
                onClick={() => setSelectedPhoto((selectedPhoto + 1) % (athlete.photos ? athlete.photos.length : 1))}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blood-600 flex items-center justify-center">
                <span className="text-xs font-bold text-white">{athlete.age}</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-dark-700 border border-dark-600 p-3">
              <Flame className="w-4 h-4 text-blood-400 mb-1" />
              <p className="text-xl font-bebas text-white">{athlete.currentStreak}</p>
              <p className="text-xs text-steel-400 uppercase">Streak</p>
            </div>
            
            <div className="bg-dark-700 border border-dark-600 p-3">
              <Target className="w-4 h-4 text-blood-400 mb-1" />
              <p className="text-xl font-bebas text-white">{Math.round(completionRate)}%</p>
              <p className="text-xs text-steel-400 uppercase">Today</p>
            </div>
            
            <div className="bg-dark-700 border border-dark-600 p-3">
              <Activity className="w-4 h-4 text-blood-400 mb-1" />
              <p className="text-xl font-bebas text-white">{todayData.energy || 0}%</p>
              <p className="text-xs text-steel-400 uppercase">Energy</p>
            </div>
            
            <div className="bg-dark-700 border border-dark-600 p-3">
              <Zap className="w-4 h-4 text-blood-400 mb-1" />
              <p className="text-xl font-bebas text-white">{athlete.totalTrainingDays}</p>
              <p className="text-xs text-steel-400 uppercase">Total</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="bg-dark-700 h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blood-600 to-blood-400"
              initial={{ width: 0 }}
              animate={{ width: `${completionRate}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-steel-400 mt-1 uppercase tracking-wide">
            {todayData.completedActivities.length}/{todayActivities.length} COMPLETED
          </p>
        </div>
      </div>

      {/* Today's Activities */}
      <div className="p-4">
        <h2 className="text-xl font-bebas tracking-wider text-white mb-4 flex items-center gap-2">
          <span className="text-blood-400">///</span> TODAY'S MISSION
        </h2>

        <div className="space-y-3">
          {todayActivities.map((activity, index) => {
            const isCompleted = todayData.completedActivities.includes(activity.id);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-dark-800 border border-dark-700 p-4 transition-all ${
                  isCompleted ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleToggleActivity(activity.id)}
                      className={`w-10 h-10 border-2 flex items-center justify-center transition-all ${
                        isCompleted
                          ? 'bg-blood-600 border-blood-400'
                          : 'border-dark-600 hover:border-blood-600'
                      }`}
                    >
                      {isCompleted && <Check className="w-6 h-6 text-white" />}
                    </button>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getTypeIcon(activity.type)}</span>
                        <h3 className={`font-bebas text-xl tracking-wider ${
                          isCompleted ? 'text-steel-600 line-through' : 'text-white'
                        }`}>
                          {activity.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-steel-400 flex items-center gap-1 uppercase">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </span>
                        
                        {activity.location && (
                          <span className="text-xs text-steel-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {activity.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={`px-3 py-1 border text-xs font-medium uppercase ${getIntensityColor(activity.intensity)}`}>
                    {activity.intensity}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Summary */}
        {todayData.sleepQuality && (
          <div className="mt-6 bg-dark-800 border border-dark-700 p-4">
            <h3 className="font-bebas text-lg tracking-wider text-white mb-3 flex items-center gap-2">
              <span className="text-blood-400">///</span> MORNING REPORT
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-dark-700 p-3">
                <p className="text-xs text-steel-400 uppercase">Wake Time</p>
                <p className="font-bebas text-xl text-blood-400">{todayData.wakeUpTime || '--:--'}</p>
              </div>
              
              <div className="bg-dark-700 p-3">
                <p className="text-xs text-steel-400 uppercase">Sleep</p>
                <p className="font-bebas text-xl text-blood-400">{todayData.sleepHours || 0}H</p>
              </div>
              
              <div className="bg-dark-700 p-3">
                <p className="text-xs text-steel-400 uppercase">Mental</p>
                <p className="font-bebas text-xl text-blood-400 uppercase">{todayData.mood || 'N/A'}</p>
              </div>
              
              <div className="bg-dark-700 p-3">
                <p className="text-xs text-steel-400 uppercase">Pain Level</p>
                <p className="font-bebas text-xl text-blood-400 uppercase">{todayData.pain || 'NONE'}</p>
              </div>
            </div>

            {todayData.weight && (
              <div className="mt-3 flex gap-3">
                <div className="flex-1 bg-dark-700 p-3">
                  <p className="text-xs text-steel-400 uppercase">Weight</p>
                  <p className="font-bebas text-xl text-blood-400">{todayData.weight} KG</p>
                </div>
                {todayData.heartRate && (
                  <div className="flex-1 bg-dark-700 p-3">
                    <p className="text-xs text-steel-400 uppercase">Heart Rate</p>
                    <p className="font-bebas text-xl text-blood-400">{todayData.heartRate} BPM</p>
                  </div>
                )}
              </div>
            )}

            {todayData.notes && (
              <div className="mt-3 p-3 bg-dark-700 border-l-2 border-blood-600">
                <p className="text-sm text-steel-400">{todayData.notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Motivational Quote */}
        {completionRate === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-gradient-to-r from-blood-600 to-blood-500 p-6"
          >
            <h3 className="text-2xl font-bebas tracking-wider text-white">MISSION COMPLETE!</h3>
            <p className="text-blood-100 mt-2 uppercase text-sm">
              You dominated today. Rest, recover, and come back stronger.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;