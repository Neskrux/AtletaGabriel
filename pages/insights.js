import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Shield, Zap, Moon, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Insights = () => {
  const { athlete, todayData, history } = useStore();
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    generateInsights();
    generateRecommendations();
  }, [todayData, history]);

  const generateInsights = () => {
    const newInsights = [];
    
    // Sleep Analysis
    if (todayData.sleepQuality === 'poor') {
      newInsights.push({
        id: 1,
        type: 'critical',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: 'SLEEP ALERT',
        message: 'Poor sleep quality detected. Recovery compromised. Adjust training intensity.',
        priority: 'HIGH'
      });
    } else if (todayData.sleepQuality === 'excellent') {
      newInsights.push({
        id: 2,
        type: 'positive',
        icon: <CheckCircle className="w-5 h-5" />,
        title: 'OPTIMAL RECOVERY',
        message: 'Excellent sleep quality. Body primed for intense training.',
        priority: 'LOW'
      });
    }
    
    // Energy Analysis
    if (todayData.energy < 50) {
      newInsights.push({
        id: 3,
        type: 'warning',
        icon: <Zap className="w-5 h-5" />,
        title: 'LOW ENERGY',
        message: 'Energy below 50%. Consider lighter training or active recovery.',
        priority: 'MEDIUM'
      });
    } else if (todayData.energy > 80) {
      newInsights.push({
        id: 4,
        type: 'positive',
        icon: <Zap className="w-5 h-5" />,
        title: 'HIGH ENERGY',
        message: 'Energy levels optimal. Perfect for high-intensity sessions.',
        priority: 'LOW'
      });
    }
    
    // Pain Check
    if (todayData.pain === 'moderate' || todayData.pain === 'severe') {
      newInsights.push({
        id: 5,
        type: 'critical',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: 'INJURY RISK',
        message: 'Pain detected. Consider physiotherapy or rest. Do not push through pain.',
        priority: 'HIGH'
      });
    }
    
    // Streak Analysis
    if (athlete.currentStreak >= 7) {
      newInsights.push({
        id: 6,
        type: 'positive',
        icon: <TrendingUp className="w-5 h-5" />,
        title: `${athlete.currentStreak} DAY STREAK`,
        message: 'Consistency is building champions. Keep the momentum.',
        priority: 'LOW'
      });
    }
    
    // Sleep Interruption
    if (todayData.wokeUpAtNight) {
      newInsights.push({
        id: 7,
        type: 'warning',
        icon: <Moon className="w-5 h-5" />,
        title: 'SLEEP DISRUPTION',
        message: 'Night waking detected. Check hydration and room temperature.',
        priority: 'MEDIUM'
      });
    }
    
    setInsights(newInsights);
  };

  const generateRecommendations = () => {
    const recs = [];
    const dayOfWeek = new Date().getDay();
    
    // Combat Days
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      recs.push({
        id: 1,
        category: 'COMBAT',
        title: 'FIGHT DAY PROTOCOL',
        items: [
          'Dynamic warm-up: 15 minutes minimum',
          'Hydration: 500ml before, 250ml every 20 min',
          'Post-training: Protein within 30 minutes',
          'Ice bath: 10 minutes for recovery'
        ]
      });
    }
    
    // Conditioning Days
    if (dayOfWeek === 2 || dayOfWeek === 4) {
      recs.push({
        id: 2,
        category: 'CONDITIONING',
        title: 'ENDURANCE FOCUS',
        items: [
          'Heart rate zone: 70-85% max',
          'Breathing: Nasal during steady state',
          'Electrolytes: Add salt to water',
          'Mobility: 20 minutes post-workout'
        ]
      });
    }
    
    // Nutrition Protocol
    recs.push({
      id: 3,
      category: 'NUTRITION',
      title: 'FIGHTER FUEL',
      items: [
        'Pre-training: Complex carbs 2h before',
        'During: BCAAs or coconut water',
        'Post: 30g protein + 40g carbs',
        'Evening: Casein protein before bed'
      ]
    });
    
    // Recovery Protocol
    recs.push({
      id: 4,
      category: 'RECOVERY',
      title: 'REGENERATION',
      items: [
        'Sleep target: 8-9 hours',
        'Cold therapy: 3x per week',
        'Massage/foam roll: Daily 15 min',
        'Meditation: 10 min before sleep'
      ]
    });
    
    setRecommendations(recs);
  };

  const getInsightStyle = (type) => {
    switch (type) {
      case 'positive': return 'border-green-600 bg-green-900/20';
      case 'warning': return 'border-yellow-600 bg-yellow-900/20';
      case 'critical': return 'border-red-600 bg-red-900/20';
      default: return 'border-dark-600 bg-dark-800';
    }
  };

  const getInsightIconColor = (type) => {
    switch (type) {
      case 'positive': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-steel-400';
    }
  };

  const combatTips = [
    { icon: '🥊', title: 'STRIKING', tip: 'Keep hands up, chin down' },
    { icon: '🥋', title: 'GRAPPLING', tip: 'Position before submission' },
    { icon: '🏃', title: 'CARDIO', tip: 'Control breathing rhythm' },
    { icon: '🧠', title: 'MENTAL', tip: 'Visualize success daily' }
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <h1 className="text-3xl font-bebas tracking-wider text-white">FIGHT INTELLIGENCE</h1>
          <p className="text-steel-400 text-sm uppercase tracking-wide">
            {format(new Date(), "EEEE, d MMM", { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blood-600 to-blood-500 p-6"
        >
          <div className="flex items-start gap-3">
            <Brain className="w-8 h-8 text-white" />
            <div className="flex-1">
              <h3 className="text-xl font-bebas tracking-wider text-white mb-2">PERFORMANCE ANALYSIS</h3>
              <p className="text-blood-100 text-sm leading-relaxed uppercase">
                Sleep: {todayData.sleepHours || 7}H ({todayData.sleepQuality || 'GOOD'}) | 
                Energy: {todayData.energy || 70}% | 
                Mental: {todayData.mood || 'FOCUSED'} | 
                Pain: {todayData.pain || 'NONE'}
              </p>
              <div className="mt-3 pt-3 border-t border-blood-400/30">
                <p className="text-white text-sm">
                  {todayData.energy > 70 
                    ? 'SYSTEM STATUS: COMBAT READY. ENGAGE AT MAXIMUM INTENSITY.'
                    : 'SYSTEM STATUS: RECOVERY MODE. ADJUST TRAINING VOLUME.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Critical Insights */}
        <div className="space-y-3">
          <h3 className="font-bebas text-lg tracking-wider text-white">
            <span className="text-blood-400">///</span> TACTICAL INSIGHTS
          </h3>
          
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`border p-4 ${getInsightStyle(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`${getInsightIconColor(insight.type)}`}>
                  {insight.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white uppercase tracking-wide">{insight.title}</h4>
                    <span className={`text-xs px-2 py-1 uppercase ${
                      insight.priority === 'HIGH' ? 'bg-red-900/50 text-red-400 border border-red-600' :
                      insight.priority === 'MEDIUM' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-600' :
                      'bg-dark-700 text-steel-400 border border-dark-600'
                    }`}>
                      {insight.priority}
                    </span>
                  </div>
                  <p className="text-sm text-steel-400">{insight.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          <h3 className="font-bebas text-lg tracking-wider text-white">
            <span className="text-blood-400">///</span> BATTLE PROTOCOLS
          </h3>
          
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-dark-800 border border-dark-700 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bebas text-white tracking-wider">{rec.title}</h4>
                <span className="text-xs bg-blood-900/30 text-blood-400 px-2 py-1 border border-blood-600 uppercase">
                  {rec.category}
                </span>
              </div>
              <ul className="space-y-2">
                {rec.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blood-400 mt-1">▸</span>
                    <span className="text-sm text-steel-400">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Combat Tips Grid */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> QUICK TACTICS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {combatTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-700 border border-dark-600 p-3"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h4 className="font-medium text-white text-sm uppercase">{tip.title}</h4>
                <p className="text-xs text-steel-400 mt-1">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Warrior Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-800 border-l-4 border-blood-600 p-6"
        >
          <p className="text-lg text-white italic mb-2">
            "The fight is won or lost far away from witnesses - behind the lines, in the gym, and out there on the road, long before I dance under those lights."
          </p>
          <p className="text-sm text-blood-400 uppercase">- Muhammad Ali</p>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Insights;