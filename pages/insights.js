import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Shield, Zap, Moon, Target } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const Insights = () => {
  const { athlete, todayData, history } = useStore();
  const { t, language } = useLanguage();
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  
  const locale = language === 'pt-BR' ? ptBR : enUS;

  useEffect(() => {
    generateInsights();
    generateRecommendations();
  }, [todayData, history, language]);

  const generateInsights = () => {
    const newInsights = [];
    
    // Sleep Analysis
    if (todayData.sleepQuality === 'poor') {
      newInsights.push({
        id: 1,
        type: 'critical',
        icon: <AlertTriangle className="w-5 h-5" />,
        title: t('insights.sleepAlert'),
        message: language === 'pt-BR' 
          ? 'Qualidade de sono ruim detectada. Recuperação comprometida. Ajuste a intensidade do treino.'
          : 'Poor sleep quality detected. Recovery compromised. Adjust training intensity.',
        priority: t('insights.high')
      });
    } else if (todayData.sleepQuality === 'excellent') {
      newInsights.push({
        id: 2,
        type: 'positive',
        icon: <CheckCircle className="w-5 h-5" />,
        title: t('insights.optimalRecovery'),
        message: language === 'pt-BR'
          ? 'Excelente qualidade de sono. Corpo preparado para treino intenso.'
          : 'Excellent sleep quality. Body primed for intense training.',
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
        message: language === 'pt-BR'
          ? 'Energia abaixo de 50%. Considere treino mais leve ou recuperação ativa.'
          : 'Energy below 50%. Consider lighter training or active recovery.',
        priority: t('insights.medium')
      });
    } else if (todayData.energy > 80) {
      newInsights.push({
        id: 4,
        type: 'positive',
        icon: <Zap className="w-5 h-5" />,
        title: t('insights.highEnergy'),
        message: language === 'pt-BR'
          ? 'Níveis de energia ótimos. Perfeito para sessões de alta intensidade.'
          : 'Energy levels optimal. Perfect for high-intensity sessions.',
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
        message: language === 'pt-BR'
          ? 'Dor detectada. Considere fisioterapia ou descanso. Não force através da dor.'
          : 'Pain detected. Consider physiotherapy or rest. Do not push through pain.',
        priority: t('insights.high')
      });
    }
    
    // Streak Analysis
    if (athlete.currentStreak >= 7) {
      newInsights.push({
        id: 6,
        type: 'positive',
        icon: <TrendingUp className="w-5 h-5" />,
        title: `${athlete.currentStreak} ${language === 'pt-BR' ? 'DIAS DE SEQUÊNCIA' : 'DAY STREAK'}`,
        message: language === 'pt-BR'
          ? 'Consistência está construindo campeões. Mantenha o ritmo.'
          : 'Consistency is building champions. Keep the momentum.',
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
        message: language === 'pt-BR'
          ? 'Despertar noturno detectado. Verifique hidratação e temperatura do quarto.'
          : 'Night waking detected. Check hydration and room temperature.',
        priority: t('insights.medium')
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
        category: language === 'pt-BR' ? 'COMBATE' : 'COMBAT',
        title: language === 'pt-BR' ? 'PROTOCOLO DIA DE LUTA' : 'FIGHT DAY PROTOCOL',
        items: language === 'pt-BR' ? [
          'Aquecimento dinâmico: 15 minutos mínimo',
          'Hidratação: 500ml antes, 250ml a cada 20 min',
          'Pós-treino: Proteína em 30 minutos',
          'Banho de gelo: 10 minutos para recuperação'
        ] : [
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
        category: language === 'pt-BR' ? 'CONDICIONAMENTO' : 'CONDITIONING',
        title: language === 'pt-BR' ? 'FOCO EM RESISTÊNCIA' : 'ENDURANCE FOCUS',
        items: language === 'pt-BR' ? [
          'Zona de frequência cardíaca: 70-85% máx',
          'Respiração: Nasal durante estado estável',
          'Eletrólitos: Adicione sal à água',
          'Mobilidade: 20 minutos pós-treino'
        ] : [
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
      category: language === 'pt-BR' ? 'NUTRIÇÃO' : 'NUTRITION',
      title: language === 'pt-BR' ? 'COMBUSTÍVEL DO LUTADOR' : 'FIGHTER FUEL',
      items: language === 'pt-BR' ? [
        'Pré-treino: Carboidratos complexos 2h antes',
        'Durante: BCAAs ou água de coco',
        'Pós: 30g proteína + 40g carboidratos',
        'Noite: Caseína antes de dormir'
      ] : [
        'Pre-training: Complex carbs 2h before',
        'During: BCAAs or coconut water',
        'Post: 30g protein + 40g carbs',
        'Evening: Casein protein before bed'
      ]
    });
    
    // Recovery Protocol
    recs.push({
      id: 4,
      category: language === 'pt-BR' ? 'RECUPERAÇÃO' : 'RECOVERY',
      title: language === 'pt-BR' ? 'REGENERAÇÃO' : 'REGENERATION',
      items: language === 'pt-BR' ? [
        'Meta de sono: 8-9 horas',
        'Terapia fria: 3x por semana',
        'Massagem/foam roll: Diário 15 min',
        'Meditação: 10 min antes de dormir'
      ] : [
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
    { 
      icon: '🥊', 
      title: language === 'pt-BR' ? 'STRIKING' : 'STRIKING', 
      tip: language === 'pt-BR' ? 'Mãos altas, queixo baixo' : 'Keep hands up, chin down' 
    },
    { 
      icon: '🥋', 
      title: language === 'pt-BR' ? 'GRAPPLING' : 'GRAPPLING', 
      tip: language === 'pt-BR' ? 'Posição antes de finalização' : 'Position before submission' 
    },
    { 
      icon: '🏃', 
      title: language === 'pt-BR' ? 'CARDIO' : 'CARDIO', 
      tip: language === 'pt-BR' ? 'Controle o ritmo respiratório' : 'Control breathing rhythm' 
    },
    { 
      icon: '🧠', 
      title: 'MENTAL', 
      tip: language === 'pt-BR' ? 'Visualize o sucesso diariamente' : 'Visualize success daily' 
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
                {language === 'pt-BR' ? 'SONO' : 'SLEEP'}: {todayData.sleepHours || 7}H ({t(`checkin.${todayData.sleepQuality}`) || t('checkin.good')}) | 
                {language === 'pt-BR' ? ' ENERGIA' : ' ENERGY'}: {todayData.energy || 70}% | 
                MENTAL: {t(`checkin.${todayData.mood}`) || t('checkin.focused')} | 
                {language === 'pt-BR' ? ' DOR' : ' PAIN'}: {todayData.pain ? t(`checkin.${todayData.pain}`) : t('checkin.noPain')}
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
            {language === 'pt-BR' 
              ? '"A luta é ganha ou perdida longe das testemunhas - atrás das linhas, na academia, e lá fora na estrada, muito antes de eu dançar sob aquelas luzes."'
              : '"The fight is won or lost far away from witnesses - behind the lines, in the gym, and out there on the road, long before I dance under those lights."'}
          </p>
          <p className="text-sm text-blood-400 uppercase">- Muhammad Ali</p>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Insights;