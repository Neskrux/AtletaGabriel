import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Shield, Zap, Moon, Target, TrendingDown, ArrowUp, ArrowDown, Activity } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const { athlete, todayData, history, analyzeEvolution, saveDayToHistory } = useStore();
  const { t, language } = useLanguage();
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [evolution, setEvolution] = useState(null);
  const [weekData, setWeekData] = useState([]);
  
  const locale = language === 'pt-BR' ? ptBR : enUS;

  useEffect(() => {
    // Analisar evolução
    const evolutionData = analyzeEvolution();
    setEvolution(evolutionData);
    
    // Preparar dados da semana para gráfico
    if (history.length > 0) {
      const last7Days = history.slice(-7).map(day => ({
        date: format(new Date(day.date), 'dd/MM'),
        sleep: day.sleepHours || 0,
        energy: day.energy || 0,
        completion: day.metrics?.completionRate || 0
      }));
      setWeekData(last7Days);
    }
    
    generateInsights();
    generateRecommendations();
  }, [todayData, history, language, analyzeEvolution]);

  const generateInsights = () => {
    const newInsights = [];
    const evolutionData = analyzeEvolution();
    
    // Insights baseados na evolução
    if (evolutionData) {
      // Comparação com dia anterior
      if (evolutionData.comparison.sleepDiff < -1) {
        newInsights.push({
          id: 'sleep-decline',
          type: 'critical',
          icon: <Moon className="w-5 h-5" />,
          title: t('evolution.sleepDecline'),
          message: `Você dormiu ${Math.abs(evolutionData.comparison.sleepDiff).toFixed(1)}h menos que ontem. Isso afetará sua performance.`,
          priority: t('insights.high')
        });
      }
      
      if (evolutionData.comparison.energyDiff < -15) {
        newInsights.push({
          id: 'energy-drop',
          type: 'warning',
          icon: <Zap className="w-5 h-5" />,
          title: t('evolution.energyDrop'),
          message: `Energia ${Math.abs(evolutionData.comparison.energyDiff)}% menor que ontem. Ajuste a intensidade do treino.`,
          priority: t('insights.medium')
        });
      }
      
      // Insights de melhoria
      evolutionData.improvements.forEach(improvement => {
        newInsights.push({
          id: `improvement-${improvement.type}`,
          type: 'positive',
          icon: <CheckCircle className="w-5 h-5" />,
          title: t('evolution.improvementDetected'),
          message: improvement.message,
          priority: t('insights.low')
        });
      });
      
      // Insights de problemas
      evolutionData.problems.forEach(problem => {
        newInsights.push({
          id: `problem-${problem.type}`,
          type: problem.severity === 'high' ? 'critical' : 'warning',
          icon: <AlertTriangle className="w-5 h-5" />,
          title: problem.message,
          message: problem.recommendation,
          priority: problem.severity === 'high' ? t('insights.high') : t('insights.medium')
        });
      });
    }
    
    // Sleep Analysis
    if (todayData.sleepQuality === 'poor') {
      newInsights.push({
        id: 1,
        type: 'critical',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: t('insights.sleepAlert'),
        message: 'Qualidade de sono ruim detectada. Recuperação comprometida. Ajuste a intensidade do treino.',
        priority: t('insights.high')
      });
    } else if (todayData.sleepQuality === 'excellent') {
      newInsights.push({
        id: 2,
        type: 'positive',
        icon: <CheckCircle className="w-5 h-5" />,
        title: t('insights.optimalRecovery'),
        message: 'Excelente qualidade de sono. Corpo preparado para treino intenso.',
        priority: t('insights.low')
      });
    }
    
    // Energy Analysis
    if (todayData.energy < 50) {
      newInsights.push({
        id: 3,
        type: 'warning',
        icon: <Zap className="w-5 h-5" />,
        title: t('insights.lowEnergy'),
        message: 'Energia abaixo de 50%. Considere treino mais leve ou recuperação ativa.',
        priority: t('insights.medium')
      });
    } else if (todayData.energy > 80) {
      newInsights.push({
        id: 4,
        type: 'positive',
        icon: <Zap className="w-5 h-5" />,
        title: t('insights.highEnergy'),
        message: 'Níveis de energia ótimos. Perfeito para sessões de alta intensidade.',
        priority: t('insights.low')
      });
    }
    
    // Pain Check
    if (todayData.pain === 'moderate' || todayData.pain === 'severe') {
      newInsights.push({
        id: 5,
        type: 'critical',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: t('insights.injuryRisk'),
        message: 'Dor detectada. Considere fisioterapia ou descanso. Não force através da dor.',
        priority: t('insights.high')
      });
    }
    
    // Streak Analysis
    if (athlete.currentStreak >= 7) {
      newInsights.push({
        id: 6,
        type: 'positive',
        icon: <TrendingUp className="w-5 h-5" />,
        title: `${athlete.currentStreak} ${t('evolution.dayStreak')}`,
        message: 'Consistência está construindo campeões. Mantenha o ritmo.',
        priority: t('insights.low')
      });
    }
    
    // Sleep Interruption
    if (todayData.wokeUpAtNight) {
      newInsights.push({
        id: 7,
        type: 'warning',
        icon: <Moon className="w-5 h-5" />,
        title: t('insights.sleepDisruption'),
        message: 'Despertar noturno detectado. Verifique hidratação e temperatura do quarto.',
        priority: t('insights.medium')
      });
    }
    
    setInsights(newInsights);
  };

  const generateRecommendations = () => {
    const recs = [];
    const dayOfWeek = new Date().getDay();
    const evolutionData = analyzeEvolution();
    
    // Recomendações adaptativas baseadas na evolução
    if (evolutionData && evolutionData.adaptiveGoals.length > 0) {
      recs.push({
        id: 'adaptive',
        category: t('evolution.adaptiveGoals'),
        title: t('evolution.adjustmentsToday'),
        items: evolutionData.adaptiveGoals.map(goal => 
          `${goal.message} (${t('evolution.current')}: ${goal.current.toFixed(1)}, ${t('evolution.target')}: ${goal.target})`
        )
      });
    }
    
    // Combat Days
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      recs.push({
        id: 1,
        category: t('protocol.combat'),
        title: t('protocol.fightDay'),
        items: [
          t('protocol.dynamicWarmup'),
          t('protocol.hydration'),
          t('protocol.postProtein'),
          t('protocol.iceBath')
        ]
      });
    }
    
    // Conditioning Days
    if (dayOfWeek === 2 || dayOfWeek === 4) {
      recs.push({
        id: 2,
        category: t('protocol.conditioning'),
        title: t('protocol.enduranceFocus'),
        items: [
          t('protocol.heartRate'),
          t('protocol.breathing'),
          t('protocol.electrolytes'),
          t('protocol.mobility')
        ]
      });
    }
    
    // Nutrition Protocol
    recs.push({
      id: 3,
      category: t('protocol.nutrition'),
      title: t('protocol.fighterFuel'),
      items: [
        t('protocol.preTraining'),
        t('protocol.during'),
        t('protocol.post'),
        t('protocol.evening')
      ]
    });
    
    // Recovery Protocol
    recs.push({
      id: 4,
      category: t('protocol.recovery'),
      title: t('protocol.regeneration'),
      items: [
        t('protocol.sleepTarget'),
        t('protocol.coldTherapy'),
        t('protocol.massage'),
        t('protocol.meditation')
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
    { 
      icon: '🥊', 
      title: 'STRIKING', 
      tip: 'Mãos altas, queixo baixo' 
    },
    { 
      icon: '🥋', 
      title: 'GRAPPLING', 
      tip: 'Posição antes de finalização' 
    },
    { 
      icon: '🏃', 
      title: 'CARDIO', 
      tip: 'Controle o ritmo respiratório' 
    },
    { 
      icon: '🧠', 
      title: 'MENTAL', 
      tip: 'Visualize o sucesso diariamente' 
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20 pt-16" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <h1 className="text-3xl font-bebas tracking-wider text-white">{t('insights.title')}</h1>
          <p className="text-steel-400 text-sm uppercase tracking-wide">
            {format(new Date(), "EEEE, d MMM", { locale })}
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Evolution Analysis - NEW SECTION */}
        {evolution && history.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800 border border-dark-700 p-6"
          >
            <h3 className="text-xl font-bebas tracking-wider text-white mb-4">
              <span className="text-blood-400">///</span> {t('evolution.title')}
            </h3>
            
            {/* Comparison with Yesterday */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-700 p-3 border border-dark-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-steel-400 uppercase">{t('evolution.sleep')}</span>
                  {evolution.comparison.sleepDiff > 0 ? 
                    <ArrowUp className="w-4 h-4 text-green-500" /> : 
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                <p className={`text-lg font-bebas ${evolution.comparison.sleepDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {evolution.comparison.sleepDiff > 0 ? '+' : ''}{evolution.comparison.sleepDiff.toFixed(1)}h
                </p>
              </div>
              
              <div className="bg-dark-700 p-3 border border-dark-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-steel-400 uppercase">{t('evolution.energy')}</span>
                  {evolution.comparison.energyDiff > 0 ? 
                    <ArrowUp className="w-4 h-4 text-green-500" /> : 
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                <p className={`text-lg font-bebas ${evolution.comparison.energyDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {evolution.comparison.energyDiff > 0 ? '+' : ''}{evolution.comparison.energyDiff}%
                </p>
              </div>
              
              <div className="bg-dark-700 p-3 border border-dark-600">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-steel-400 uppercase">{t('evolution.completion')}</span>
                  {evolution.comparison.completionDiff > 0 ? 
                    <ArrowUp className="w-4 h-4 text-green-500" /> : 
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  }
                </div>
                <p className={`text-lg font-bebas ${evolution.comparison.completionDiff > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {evolution.comparison.completionDiff > 0 ? '+' : ''}{evolution.comparison.completionDiff.toFixed(0)}%
                </p>
              </div>
            </div>
            
            {/* 7-Day Trends */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <p className="text-xs text-steel-400 uppercase mb-1">{t('evolution.avgSleep')}</p>
                <p className="text-xl font-bebas text-white">{evolution.trends.avgSleepHours.toFixed(1)}h</p>
                <p className={`text-xs ${evolution.trends.sleep === 'improving' ? 'text-green-500' : 'text-red-500'}`}>
                  {evolution.trends.sleep === 'improving' ? 
                    t('evolution.improving') : 
                    t('evolution.declining')
                  }
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-steel-400 uppercase mb-1">{t('evolution.avgEnergy')}</p>
                <p className="text-xl font-bebas text-white">{evolution.trends.avgEnergy.toFixed(0)}%</p>
                <p className={`text-xs ${evolution.trends.energy === 'improving' ? 'text-green-500' : 'text-red-500'}`}>
                  {evolution.trends.energy === 'improving' ? 
                    t('evolution.improving') : 
                    t('evolution.declining')
                  }
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-steel-400 uppercase mb-1">{t('evolution.avgCompletion')}</p>
                <p className="text-xl font-bebas text-white">{evolution.trends.avgCompletion.toFixed(0)}%</p>
                <p className={`text-xs ${evolution.trends.avgCompletion > 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {evolution.trends.avgCompletion > 80 ? 
                    t('evolution.excellent') : 
                    t('evolution.improve')
                  }
                </p>
              </div>
            </div>
            
            {/* Week Performance Chart */}
            {weekData.length > 0 && (
              <div className="mt-4">
                <p className="text-xs text-steel-400 uppercase mb-2">{t('evolution.weeklyEvolution')}</p>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={weekData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2e2e2e" />
                    <XAxis dataKey="date" stroke="#71797E" fontSize={10} />
                    <YAxis stroke="#71797E" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a1a', 
                        border: '1px solid #DC143C',
                        borderRadius: '0'
                      }}
                      labelStyle={{ color: '#DC143C' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="#DC143C" 
                      fill="#DC143C" 
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#71797E" 
                      fill="#71797E"
                      fillOpacity={0.2}
                      strokeWidth={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        )}

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blood-600 to-blood-500 p-6"
        >
          <div className="flex items-start gap-3">
            <Brain className="w-8 h-8 text-white" />
            <div className="flex-1">
              <h3 className="text-xl font-bebas tracking-wider text-white mb-2">{t('insights.performanceAnalysis')}</h3>
              <p className="text-blood-100 text-sm leading-relaxed uppercase">
                SONO: {todayData.sleepHours || 7}H ({t(`checkin.${todayData.sleepQuality}`) || t('checkin.good')}) | 
                ENERGIA: {todayData.energy || 70}% | 
                MENTAL: {t(`checkin.${todayData.mood}`) || t('checkin.focused')} | 
                DOR: {todayData.pain ? t(`checkin.${todayData.pain}`) : t('checkin.noPain')}
              </p>
              <div className="mt-3 pt-3 border-t border-blood-400/30">
                <p className="text-white text-sm">
                  {todayData.energy > 70 
                    ? t('insights.combatReady')
                    : t('insights.recoveryMode')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Critical Insights */}
        <div className="space-y-3">
          <h3 className="font-bebas text-lg tracking-wider text-white">
            <span className="text-blood-400">///</span> {t('insights.tacticalInsights')}
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
                      insight.priority === t('insights.high') ? 'bg-red-900/50 text-red-400 border border-red-600' :
                      insight.priority === t('insights.medium') ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-600' :
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
            <span className="text-blood-400">///</span> {t('insights.battleProtocols')}
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
            <span className="text-blood-400">///</span> {t('insights.quickTactics')}
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
            "A luta é ganha ou perdida longe das testemunhas - atrás das linhas, na academia, e lá fora na estrada, muito antes de eu dançar sob aquelas luzes."
          </p>
          <p className="text-sm text-blood-400 uppercase">- Muhammad Ali</p>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Insights;