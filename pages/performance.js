import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, Activity, Zap, Flame } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { format, subDays } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const Performance = () => {
  const { athlete, history } = useStore();
  const { t, language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [performanceData, setPerformanceData] = useState([]);
  
  const locale = language === 'pt-BR' ? ptBR : enUS;

  useEffect(() => {
    const generatePerformanceData = () => {
      const data = [];
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dayData = history.find(h => 
          format(new Date(h.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
        );
        
        data.push({
          day: format(date, 'EEE', { locale }).toUpperCase(),
          date: format(date, 'dd/MM'),
          completed: dayData ? dayData.completedActivities.length : Math.floor(Math.random() * 6) + 1,
          energy: dayData?.energy || Math.floor(Math.random() * 40) + 60,
          percentage: dayData 
            ? (dayData.completedActivities.length / 6) * 100 
            : Math.floor(Math.random() * 40) + 60
        });
      }
      return data;
    };

    setPerformanceData(generatePerformanceData());
  }, [history, locale]);

  const stats = [
    {
      title: t('performance.currentStreak'),
      value: athlete.currentStreak,
      unit: t('performance.days'),
      icon: <Flame className="w-5 h-5" />,
      change: '+2',
      color: 'text-orange-500'
    },
    {
      title: t('performance.bestStreak'),
      value: athlete.bestStreak,
      unit: t('performance.days'),
      icon: <Award className="w-5 h-5" />,
      change: t('performance.record'),
      color: 'text-yellow-500'
    },
    {
      title: t('performance.totalSessions'),
      value: athlete.totalTrainingDays,
      unit: t('performance.days'),
      icon: <Target className="w-5 h-5" />,
      change: '+15',
      color: 'text-blood-400'
    },
    {
      title: t('performance.completionRate'),
      value: 87,
      unit: '%',
      icon: <Activity className="w-5 h-5" />,
      change: '+5%',
      color: 'text-green-500'
    }
  ];

  const radarData = [
    { skill: t('performance.striking'), value: 85 },
    { skill: t('performance.grappling'), value: 90 },
    { skill: t('performance.cardio'), value: 75 },
    { skill: t('performance.strength'), value: 80 },
    { skill: t('performance.flexibility'), value: 70 },
    { skill: t('performance.mental'), value: 88 }
  ];

  const weeklyGoals = [
    { id: 1, title: language === 'pt-BR' ? 'Completar todas as sessões de MMA' : 'Complete all MMA sessions', completed: true },
    { id: 2, title: language === 'pt-BR' ? 'Manter sequência de 7 dias' : 'Maintain 7-day streak', completed: true },
    { id: 3, title: language === 'pt-BR' ? '8 horas de sono em média' : '8 hours sleep average', completed: false },
    { id: 4, title: language === 'pt-BR' ? 'Nenhum treino perdido' : 'No missed workouts', completed: true },
    { id: 5, title: language === 'pt-BR' ? 'Sessão de recuperação no fim de semana' : 'Weekend recovery session', completed: false }
  ];

  const periodLabels = {
    'week': t('performance.week'),
    'month': t('performance.month'),
    'year': t('performance.year')
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20 pt-16" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <h1 className="text-3xl font-bebas tracking-wider text-white">{t('performance.title')}</h1>
          <p className="text-steel-400 text-sm uppercase tracking-wide">{t('performance.trackEvolution')}</p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Period Selector */}
        <div className="flex gap-2 bg-dark-800 p-1">
          {['week', 'month', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`flex-1 py-2 px-4 font-medium uppercase tracking-wider transition-all ${
                selectedPeriod === period
                  ? 'bg-blood-600 text-white'
                  : 'text-steel-400 hover:text-white'
              }`}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-800 border border-dark-700 p-4"
            >
              <div className={`${stat.color} mb-2`}>
                {stat.icon}
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bebas text-white">{stat.value}</span>
                <span className="text-sm text-steel-400">{stat.unit}</span>
              </div>
              <p className="text-xs text-steel-400 uppercase tracking-wide mt-1">{stat.title}</p>
              <p className={`text-xs ${stat.color} mt-2 font-medium`}>{stat.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance Chart */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> {t('performance.weeklyPerformance')}
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
              <XAxis dataKey="day" stroke="#71797E" fontSize={10} />
              <YAxis stroke="#71797E" fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #DC143C',
                  borderRadius: '0'
                }}
                labelStyle={{ color: '#DC143C' }}
              />
              <Line 
                type="monotone" 
                dataKey="percentage" 
                stroke="#DC143C" 
                strokeWidth={2}
                dot={{ fill: '#DC143C', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#71797E" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#71797E', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Radar */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> {t('performance.combatSkills')}
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#2e2e2e" />
              <PolarAngleAxis 
                dataKey="skill" 
                stroke="#71797E" 
                fontSize={10}
                tick={{ fill: '#71797E' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                stroke="#2e2e2e"
                tick={{ fill: '#71797E', fontSize: 10 }}
              />
              <Radar 
                name="Skills" 
                dataKey="value" 
                stroke="#DC143C" 
                fill="#DC143C" 
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Goals */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bebas text-lg tracking-wider text-white">
              <span className="text-blood-400">///</span> {t('performance.weeklyObjectives')}
            </h3>
            <span className="text-sm text-blood-400 font-medium uppercase">
              {weeklyGoals.filter(g => g.completed).length}/{weeklyGoals.length}
            </span>
          </div>
          
          <div className="space-y-2">
            {weeklyGoals.map((goal) => (
              <div 
                key={goal.id}
                className={`flex items-center gap-3 p-3 bg-dark-700 border border-dark-600 ${
                  goal.completed ? 'opacity-60' : ''
                }`}
              >
                <div className={`w-6 h-6 border-2 flex items-center justify-center ${
                  goal.completed 
                    ? 'bg-blood-600 border-blood-400' 
                    : 'border-dark-500'
                }`}>
                  {goal.completed && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm uppercase tracking-wide ${
                  goal.completed ? 'text-steel-600 line-through' : 'text-steel-400'
                }`}>
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fight Record */}
        <div className="bg-gradient-to-r from-blood-600 to-blood-500 p-6">
          <h3 className="text-2xl font-bebas tracking-wider text-white mb-4">{t('performance.professionalRecord')}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bebas text-white">{athlete.wins || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">{t('performance.wins')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bebas text-white">{athlete.losses || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">{t('performance.losses')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bebas text-white">{athlete.draws || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">{t('performance.draws')}</p>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Performance;