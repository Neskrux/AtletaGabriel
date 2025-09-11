import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt-BR');

  useEffect(() => {
    // Carregar idioma salvo do localStorage
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Detectar idioma do navegador
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('pt')) {
        setLanguage('pt-BR');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('app-language', newLanguage);
  };

  const value = {
    language,
    changeLanguage,
    t: (key) => translations[language]?.[key] || key
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Traduções centralizadas
export const translations = {
  'pt-BR': {
    // Navigation
    'nav.dashboard': 'PAINEL',
    'nav.stats': 'ESTATÍSTICAS',
    'nav.analysis': 'ANÁLISE',
    'nav.fighter': 'LUTADOR',
    'nav.secrets': 'SEGREDOS',
    
    // Dashboard
    'dashboard.title': 'PAINEL DE CONTROLE',
    'dashboard.todayMission': "MISSÃO DE HOJE",
    'dashboard.morningReport': 'RELATÓRIO MATINAL',
    'dashboard.completed': 'CONCLUÍDO',
    'dashboard.missionComplete': 'MISSÃO COMPLETA!',
    'dashboard.missionCompleteDesc': 'Você dominou hoje. Descanse, recupere e volte mais forte.',
    'dashboard.wakeTime': 'HORA DE ACORDAR',
    'dashboard.sleep': 'SONO',
    'dashboard.mental': 'MENTAL',
    'dashboard.painLevel': 'NÍVEL DE DOR',
    'dashboard.weight': 'PESO',
    'dashboard.heartRate': 'FREQ. CARDÍACA',
    'dashboard.none': 'NENHUMA',
    'dashboard.streak': 'SEQUÊNCIA',
    'dashboard.today': 'HOJE',
    'dashboard.energy': 'ENERGIA',
    'dashboard.total': 'TOTAL',
    
    // Morning CheckIn
    'checkin.warriorCheckin': 'CHECK-IN DO GUERREIRO',
    'checkin.timeToDominate': 'HORA DE DOMINAR',
    'checkin.wakeUpTime': 'HORÁRIO DE DESPERTAR',
    'checkin.disciplineConsistency': 'Disciplina começa com consistência',
    'checkin.sleepAnalysis': 'ANÁLISE DO SONO',
    'checkin.recoveryPerformance': 'Recuperação é crucial para performance',
    'checkin.energyLevel': 'NÍVEL DE ENERGIA',
    'checkin.rateEnergy': 'Avalie sua energia atual',
    'checkin.mentalState': 'ESTADO MENTAL',
    'checkin.mindControlsBody': 'A mente controla o corpo',
    'checkin.painCheck': 'VERIFICAÇÃO DE DOR',
    'checkin.anyInjuries': 'Alguma lesão ou desconforto?',
    'checkin.bodyMetrics': 'MÉTRICAS CORPORAIS',
    'checkin.trackPhysical': 'Acompanhe seu estado físico',
    'checkin.complete': 'CONCLUIR CHECK-IN',
    'checkin.next': 'PRÓXIMO',
    'checkin.step': 'PASSO',
    'checkin.hoursOfSleep': 'Horas de Sono',
    'checkin.sleepQuality': 'Qualidade do Sono',
    'checkin.poor': 'RUIM',
    'checkin.fair': 'REGULAR',
    'checkin.good': 'BOM',
    'checkin.excellent': 'EXCELENTE',
    'checkin.hadDreams': 'Teve Sonhos',
    'checkin.wokeAtNight': 'Acordou à Noite',
    'checkin.currentWeight': 'Peso Atual (kg)',
    'checkin.restingHeartRate': 'Freq. Cardíaca em Repouso (bpm)',
    'checkin.notes': 'Observações',
    'checkin.anyObservations': 'Alguma observação...',
    'checkin.optional': 'Opcional',
    'checkin.empty': 'Vazio',
    'checkin.readyToFight': 'Pronto para Lutar',
    'checkin.focused': 'FOCADO',
    'checkin.motivated': 'MOTIVADO',
    'checkin.neutral': 'NEUTRO',
    'checkin.tired': 'CANSADO',
    'checkin.stressed': 'ESTRESSADO',
    'checkin.noPain': 'SEM DOR',
    'checkin.mild': 'LEVE',
    'checkin.moderate': 'MODERADA',
    'checkin.severe': 'SEVERA',
    
    // Performance
    'performance.title': 'MÉTRICAS DE PERFORMANCE',
    'performance.trackEvolution': 'Acompanhe sua evolução',
    'performance.week': 'SEMANA',
    'performance.month': 'MÊS',
    'performance.year': 'ANO',
    'performance.currentStreak': 'SEQUÊNCIA ATUAL',
    'performance.bestStreak': 'MELHOR SEQUÊNCIA',
    'performance.totalSessions': 'TOTAL DE SESSÕES',
    'performance.completionRate': 'TAXA DE CONCLUSÃO',
    'performance.days': 'DIAS',
    'performance.record': 'RECORDE',
    'performance.weeklyPerformance': 'PERFORMANCE SEMANAL',
    'performance.combatSkills': 'HABILIDADES DE COMBATE',
    'performance.weeklyObjectives': 'OBJETIVOS SEMANAIS',
    'performance.fightRecord': 'CARTEL DE LUTAS',
    'performance.professionalRecord': 'CARTEL PROFISSIONAL',
    'performance.wins': 'VITÓRIAS',
    'performance.losses': 'DERROTAS',
    'performance.draws': 'EMPATES',
    'performance.striking': 'STRIKING',
    'performance.grappling': 'GRAPPLING',
    'performance.cardio': 'CARDIO',
    'performance.strength': 'FORÇA',
    'performance.flexibility': 'FLEXIBILIDADE',
    'performance.mental': 'MENTAL',
    
    // Insights
    'insights.title': 'INTELIGÊNCIA DE COMBATE',
    'insights.performanceAnalysis': 'ANÁLISE DE PERFORMANCE',
    'insights.tacticalInsights': 'INSIGHTS TÁTICOS',
    'insights.battleProtocols': 'PROTOCOLOS DE BATALHA',
    'insights.quickTactics': 'TÁTICAS RÁPIDAS',
    'insights.sleepAlert': 'ALERTA DE SONO',
    'insights.optimalRecovery': 'RECUPERAÇÃO ÓTIMA',
    'insights.lowEnergy': 'ENERGIA BAIXA',
    'insights.highEnergy': 'ENERGIA ALTA',
    'insights.injuryRisk': 'RISCO DE LESÃO',
    'insights.sleepDisruption': 'INTERRUPÇÃO DO SONO',
    'insights.combatReady': 'SISTEMA: PRONTO PARA COMBATE. ENGAJE COM INTENSIDADE MÁXIMA.',
    'insights.recoveryMode': 'SISTEMA: MODO RECUPERAÇÃO. AJUSTE O VOLUME DE TREINO.',
    'insights.high': 'ALTO',
    'insights.medium': 'MÉDIO',
    'insights.low': 'BAIXO',
    
    // Profile
    'profile.title': 'PERFIL DO LUTADOR',
    'profile.annualProgress': 'PROGRESSO ANUAL',
    'profile.combatStatistics': 'ESTATÍSTICAS DE COMBATE',
    'profile.achievements': 'CONQUISTAS',
    'profile.systemSettings': 'CONFIGURAÇÕES DO SISTEMA',
    'profile.warriorMindset': 'MENTALIDADE GUERREIRA',
    'profile.age': 'IDADE',
    'profile.level': 'NÍVEL',
    'profile.streak': 'SEQUÊNCIA',
    'profile.record': 'RECORDE',
    'profile.sessions': 'SESSÕES',
    'profile.winRate': 'TAXA DE VITÓRIA',
    'profile.years': 'ANOS',
    'profile.trainingDaysCompleted': 'DIAS DE TREINO CONCLUÍDOS',
    'profile.target': 'Meta',
    'profile.remaining': 'Restante',
    'profile.days': 'DIAS',
    'profile.preferences': 'Preferências',
    'profile.privacy': 'Privacidade',
    'profile.resetSystem': 'Resetar Sistema',
    'profile.save': 'SALVAR',
    'profile.cancel': 'CANCELAR',
    'profile.everyChampion': 'Todo campeão já foi um desafiante que se recusou a desistir. Continue treinando. Continue lutando. Torne-se lendário.',
    
    // Activities
    'activity.wakeUp': 'ACORDAR',
    'activity.mmaTraining': 'TREINO MMA',
    'activity.jiuJitsu': 'JIU-JITSU',
    'activity.nutrition': 'NUTRIÇÃO',
    'activity.strengthTraining': 'TREINO DE FORÇA',
    'activity.studySession': 'SESSÃO DE ESTUDO',
    'activity.morningDrill': 'TREINO MATINAL',
    'activity.afternoonSession': 'SESSÃO DA TARDE',
    'activity.englishClass': 'AULA DE INGLÊS',
    'activity.openMat': 'TREINO LIVRE',
    'activity.recovery': 'RECUPERAÇÃO',
    'activity.lightTraining': 'TREINO LEVE',
    
    // Intensity
    'intensity.extreme': 'EXTREMO',
    'intensity.high': 'ALTO',
    'intensity.medium': 'MÉDIO',
    'intensity.low': 'BAIXO',
    'intensity.flex': 'FLEXÍVEL',
    
    // Achievements
    'achievement.7dayWarrior': '7 DIAS GUERREIRO',
    'achievement.30dayBeast': '30 DIAS FERA',
    'achievement.100battles': '100 BATALHAS',
    'achievement.groundMaster': 'MESTRE DO CHÃO',
    'achievement.strikerElite': 'STRIKER ELITE',
    'achievement.unbreakable': 'INQUEBRÁVEL',
    'achievement.ironDefense': 'DEFESA DE FERRO',
    'achievement.champion': 'CAMPEÃO',
  },
  
  'en': {
    // Navigation
    'nav.dashboard': 'DASHBOARD',
    'nav.stats': 'STATS',
    'nav.analysis': 'ANALYSIS',
    'nav.fighter': 'FIGHTER',
    'nav.secrets': 'SECRETS',
    
    // Dashboard
    'dashboard.title': 'DASHBOARD',
    'dashboard.todayMission': "TODAY'S MISSION",
    'dashboard.morningReport': 'MORNING REPORT',
    'dashboard.completed': 'COMPLETED',
    'dashboard.missionComplete': 'MISSION COMPLETE!',
    'dashboard.missionCompleteDesc': 'You dominated today. Rest, recover, and come back stronger.',
    'dashboard.wakeTime': 'WAKE TIME',
    'dashboard.sleep': 'SLEEP',
    'dashboard.mental': 'MENTAL',
    'dashboard.painLevel': 'PAIN LEVEL',
    'dashboard.weight': 'WEIGHT',
    'dashboard.heartRate': 'HEART RATE',
    'dashboard.none': 'NONE',
    'dashboard.streak': 'STREAK',
    'dashboard.today': 'TODAY',
    'dashboard.energy': 'ENERGY',
    'dashboard.total': 'TOTAL',
    
    // Morning CheckIn
    'checkin.warriorCheckin': 'WARRIOR CHECK-IN',
    'checkin.timeToDominate': 'TIME TO DOMINATE',
    'checkin.wakeUpTime': 'WAKE UP TIME',
    'checkin.disciplineConsistency': 'Discipline starts with consistency',
    'checkin.sleepAnalysis': 'SLEEP ANALYSIS',
    'checkin.recoveryPerformance': 'Recovery is crucial for performance',
    'checkin.energyLevel': 'ENERGY LEVEL',
    'checkin.rateEnergy': 'Rate your current energy',
    'checkin.mentalState': 'MENTAL STATE',
    'checkin.mindControlsBody': 'Mind controls the body',
    'checkin.painCheck': 'PAIN CHECK',
    'checkin.anyInjuries': 'Any injuries or discomfort?',
    'checkin.bodyMetrics': 'BODY METRICS',
    'checkin.trackPhysical': 'Track your physical state',
    'checkin.complete': 'COMPLETE CHECK-IN',
    'checkin.next': 'NEXT',
    'checkin.step': 'STEP',
    'checkin.hoursOfSleep': 'Hours of Sleep',
    'checkin.sleepQuality': 'Sleep Quality',
    'checkin.poor': 'POOR',
    'checkin.fair': 'FAIR',
    'checkin.good': 'GOOD',
    'checkin.excellent': 'EXCELLENT',
    'checkin.hadDreams': 'Had Dreams',
    'checkin.wokeAtNight': 'Woke at Night',
    'checkin.currentWeight': 'Current Weight (kg)',
    'checkin.restingHeartRate': 'Resting Heart Rate (bpm)',
    'checkin.notes': 'Notes',
    'checkin.anyObservations': 'Any observations...',
    'checkin.optional': 'Optional',
    'checkin.empty': 'Empty',
    'checkin.readyToFight': 'Ready to Fight',
    'checkin.focused': 'FOCUSED',
    'checkin.motivated': 'MOTIVATED',
    'checkin.neutral': 'NEUTRAL',
    'checkin.tired': 'TIRED',
    'checkin.stressed': 'STRESSED',
    'checkin.noPain': 'NO PAIN',
    'checkin.mild': 'MILD',
    'checkin.moderate': 'MODERATE',
    'checkin.severe': 'SEVERE',
    
    // Performance
    'performance.title': 'PERFORMANCE METRICS',
    'performance.trackEvolution': 'Track your evolution',
    'performance.week': 'WEEK',
    'performance.month': 'MONTH',
    'performance.year': 'YEAR',
    'performance.currentStreak': 'CURRENT STREAK',
    'performance.bestStreak': 'BEST STREAK',
    'performance.totalSessions': 'TOTAL SESSIONS',
    'performance.completionRate': 'COMPLETION RATE',
    'performance.days': 'DAYS',
    'performance.record': 'RECORD',
    'performance.weeklyPerformance': 'WEEKLY PERFORMANCE',
    'performance.combatSkills': 'COMBAT SKILLS',
    'performance.weeklyObjectives': 'WEEKLY OBJECTIVES',
    'performance.fightRecord': 'FIGHT RECORD',
    'performance.professionalRecord': 'PROFESSIONAL RECORD',
    'performance.wins': 'WINS',
    'performance.losses': 'LOSSES',
    'performance.draws': 'DRAWS',
    'performance.striking': 'STRIKING',
    'performance.grappling': 'GRAPPLING',
    'performance.cardio': 'CARDIO',
    'performance.strength': 'STRENGTH',
    'performance.flexibility': 'FLEXIBILITY',
    'performance.mental': 'MENTAL',
    
    // Insights
    'insights.title': 'FIGHT INTELLIGENCE',
    'insights.performanceAnalysis': 'PERFORMANCE ANALYSIS',
    'insights.tacticalInsights': 'TACTICAL INSIGHTS',
    'insights.battleProtocols': 'BATTLE PROTOCOLS',
    'insights.quickTactics': 'QUICK TACTICS',
    'insights.sleepAlert': 'SLEEP ALERT',
    'insights.optimalRecovery': 'OPTIMAL RECOVERY',
    'insights.lowEnergy': 'LOW ENERGY',
    'insights.highEnergy': 'HIGH ENERGY',
    'insights.injuryRisk': 'INJURY RISK',
    'insights.sleepDisruption': 'SLEEP DISRUPTION',
    'insights.combatReady': 'SYSTEM STATUS: COMBAT READY. ENGAGE AT MAXIMUM INTENSITY.',
    'insights.recoveryMode': 'SYSTEM STATUS: RECOVERY MODE. ADJUST TRAINING VOLUME.',
    'insights.high': 'HIGH',
    'insights.medium': 'MEDIUM',
    'insights.low': 'LOW',
    
    // Profile
    'profile.title': 'FIGHTER PROFILE',
    'profile.annualProgress': 'ANNUAL PROGRESS',
    'profile.combatStatistics': 'COMBAT STATISTICS',
    'profile.achievements': 'ACHIEVEMENTS',
    'profile.systemSettings': 'SYSTEM SETTINGS',
    'profile.warriorMindset': 'WARRIOR MINDSET',
    'profile.age': 'AGE',
    'profile.level': 'LEVEL',
    'profile.streak': 'STREAK',
    'profile.record': 'RECORD',
    'profile.sessions': 'SESSIONS',
    'profile.winRate': 'WIN RATE',
    'profile.years': 'YEARS',
    'profile.trainingDaysCompleted': 'TRAINING DAYS COMPLETED',
    'profile.target': 'Target',
    'profile.remaining': 'Remaining',
    'profile.days': 'DAYS',
    'profile.preferences': 'Preferences',
    'profile.privacy': 'Privacy',
    'profile.resetSystem': 'Reset System',
    'profile.save': 'SAVE',
    'profile.cancel': 'CANCEL',
    'profile.everyChampion': 'Every champion was once a contender who refused to give up. Keep grinding. Keep fighting. Become legendary.',
    
    // Activities
    'activity.wakeUp': 'WAKE UP',
    'activity.mmaTraining': 'MMA TRAINING',
    'activity.jiuJitsu': 'JIU-JITSU',
    'activity.nutrition': 'NUTRITION',
    'activity.strengthTraining': 'STRENGTH TRAINING',
    'activity.studySession': 'STUDY SESSION',
    'activity.morningDrill': 'MORNING DRILL',
    'activity.afternoonSession': 'AFTERNOON SESSION',
    'activity.englishClass': 'ENGLISH CLASS',
    'activity.openMat': 'OPEN MAT',
    'activity.recovery': 'RECOVERY',
    'activity.lightTraining': 'LIGHT TRAINING',
    
    // Intensity
    'intensity.extreme': 'EXTREME',
    'intensity.high': 'HIGH',
    'intensity.medium': 'MEDIUM',
    'intensity.low': 'LOW',
    'intensity.flex': 'FLEX',
    
    // Achievements
    'achievement.7dayWarrior': '7 DAY WARRIOR',
    'achievement.30dayBeast': '30 DAY BEAST',
    'achievement.100battles': '100 BATTLES',
    'achievement.groundMaster': 'GROUND MASTER',
    'achievement.strikerElite': 'STRIKER ELITE',
    'achievement.unbreakable': 'UNBREAKABLE',
    'achievement.ironDefense': 'IRON DEFENSE',
    'achievement.champion': 'CHAMPION',
  }
};
