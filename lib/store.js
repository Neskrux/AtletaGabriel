import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Dados do atleta
      athlete: {
        name: 'Gabriel',
        age: 16,
        photo: '/image1.jpg',
        photos: ['/image1.jpg', '/image2.jpg', '/image3.jpg'],
        level: 'PROFISSIONAL',
        category: 'MMA Fighter',
        totalTrainingDays: 0,
        currentStreak: 0,
        bestStreak: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      },

      // Dados do dia atual
      todayData: {
        date: new Date().toISOString(),
        wakeUpTime: '',
        sleepQuality: '',
        sleepHours: 0,
        hunger: '',
        mood: '',
        energy: 0,
        pain: '',
        hadDreams: false,
        wokeUpAtNight: false,
        notes: '',
        completedActivities: [],
        weight: '',
        heartRate: '',
      },

      // Histórico
      history: [],

      // Check-in do dia
      hasCheckedInToday: false,

      // Secrets/Tactics Library
      secrets: {
        jiuJitsu: [],
        noGi: [],
        mma: [],
        muayThai: []
      },

      // Rotina semanal
      weeklySchedule: {
        1: [ // Segunda
          { id: 'wake', time: '09:00', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'mma', time: '10:00-12:00', title: 'MMA TRAINING', location: 'Chute Boxe - Parque Barigui', type: 'combat', intensity: 'extreme' },
          { id: 'bjj', time: '12:30-13:50', title: 'JIU-JITSU', location: 'Bateu', type: 'combat', intensity: 'high' },
          { id: 'lunch', time: '14:00', title: 'NUTRITION', type: 'meal', intensity: 'low' },
          { id: 'gym', time: '15:30-16:30', title: 'STRENGTH TRAINING', type: 'strength', intensity: 'high' },
          { id: 'study', time: '18:30-23:00', title: 'STUDY SESSION', type: 'mental', intensity: 'medium' }
        ],
        2: [ // Terça
          { id: 'wake', time: '09:00', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'morning_training', time: '10:00-11:00', title: 'MORNING DRILL', location: 'Colombo', type: 'conditioning', intensity: 'high' },
          { id: 'lunch', time: '12:00', title: 'NUTRITION', type: 'meal', intensity: 'low' },
          { id: 'afternoon_training', time: '13:00-14:00', title: 'AFTERNOON SESSION', location: 'Colombo', type: 'conditioning', intensity: 'high' },
          { id: 'english', time: '15:00-16:00', title: 'ENGLISH CLASS', type: 'mental', intensity: 'low' },
          { id: 'study', time: '18:30-23:00', title: 'STUDY SESSION', type: 'mental', intensity: 'medium' }
        ],
        3: [ // Quarta
          { id: 'wake', time: '09:00', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'mma', time: '10:00-12:00', title: 'MMA TRAINING', location: 'Chute Boxe - Parque Barigui', type: 'combat', intensity: 'extreme' },
          { id: 'bjj', time: '12:30-13:50', title: 'JIU-JITSU', location: 'Bateu', type: 'combat', intensity: 'high' },
          { id: 'lunch', time: '14:00', title: 'NUTRITION', type: 'meal', intensity: 'low' },
          { id: 'gym', time: '15:30-16:30', title: 'STRENGTH TRAINING', type: 'strength', intensity: 'high' },
          { id: 'study', time: '18:30-23:00', title: 'STUDY SESSION', type: 'mental', intensity: 'medium' }
        ],
        4: [ // Quinta
          { id: 'wake', time: '09:00', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'morning_training', time: '10:00-11:00', title: 'MORNING DRILL', location: 'Colombo', type: 'conditioning', intensity: 'high' },
          { id: 'lunch', time: '12:00', title: 'NUTRITION', type: 'meal', intensity: 'low' },
          { id: 'afternoon_training', time: '13:00-14:00', title: 'AFTERNOON SESSION', location: 'Colombo', type: 'conditioning', intensity: 'high' },
          { id: 'english', time: '15:00-16:00', title: 'ENGLISH CLASS', type: 'mental', intensity: 'low' },
          { id: 'study', time: '18:30-23:00', title: 'STUDY SESSION', type: 'mental', intensity: 'medium' }
        ],
        5: [ // Sexta
          { id: 'wake', time: '09:00', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'mma', time: '10:00-12:00', title: 'MMA TRAINING', location: 'Chute Boxe - Parque Barigui', type: 'combat', intensity: 'extreme' },
          { id: 'bjj', time: '12:30-13:50', title: 'JIU-JITSU', location: 'Bateu', type: 'combat', intensity: 'high' },
          { id: 'lunch', time: '14:00', title: 'NUTRITION', type: 'meal', intensity: 'low' },
          { id: 'gym', time: '15:30-16:30', title: 'STRENGTH TRAINING', type: 'strength', intensity: 'high' },
          { id: 'study', time: '18:30-23:00', title: 'STUDY SESSION', type: 'mental', intensity: 'medium' }
        ],
        6: [ // Sábado
          { id: 'wake', time: 'FLEX', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'training', time: 'FLEX', title: 'OPEN MAT', type: 'combat', intensity: 'medium' },
          { id: 'recovery', time: 'FLEX', title: 'RECOVERY', type: 'recovery', intensity: 'low' }
        ],
        0: [ // Domingo
          { id: 'wake', time: 'FLEX', title: 'WAKE UP', type: 'routine', intensity: 'low' },
          { id: 'training', time: 'FLEX', title: 'LIGHT TRAINING', type: 'conditioning', intensity: 'low' },
          { id: 'recovery', time: 'FLEX', title: 'RECOVERY', type: 'recovery', intensity: 'low' }
        ]
      },

      // Actions
      updateTodayData: (data) => set((state) => ({
        todayData: { ...state.todayData, ...data }
      })),

      completeCheckIn: () => {
        const today = new Date().toDateString();
        localStorage.setItem('lastCheckIn', today);
        set({ hasCheckedInToday: true });
      },

      toggleActivity: (activityId) => set((state) => {
        const completed = state.todayData.completedActivities;
        const newCompleted = completed.includes(activityId)
          ? completed.filter(id => id !== activityId)
          : [...completed, activityId];
        
        return {
          todayData: {
            ...state.todayData,
            completedActivities: newCompleted
          }
        };
      }),

      saveDayToHistory: () => {
        const state = get();
        const dayData = {
          ...state.todayData,
          date: new Date().toISOString()
        };
        
        // Calcular taxa de conclusão
        const dayOfWeek = new Date().getDay();
        const todayActivities = state.weeklySchedule[dayOfWeek] || [];
        const completionRate = state.todayData.completedActivities.length / todayActivities.length;
        
        // Atualizar estatísticas
        let newStreak = state.athlete.currentStreak;
        let bestStreak = state.athlete.bestStreak;
        let totalDays = state.athlete.totalTrainingDays;
        
        if (completionRate >= 0.8) {
          newStreak += 1;
          totalDays += 1;
          if (newStreak > bestStreak) {
            bestStreak = newStreak;
          }
        } else {
          newStreak = 0;
        }
        
        set((state) => ({
          history: [...state.history, dayData],
          athlete: {
            ...state.athlete,
            currentStreak: newStreak,
            bestStreak: bestStreak,
            totalTrainingDays: totalDays
          }
        }));
      },

      resetDay: () => set((state) => ({
        todayData: {
          date: new Date().toISOString(),
          wakeUpTime: '',
          sleepQuality: '',
          sleepHours: 0,
          hunger: '',
          mood: '',
          energy: 0,
          pain: '',
          hadDreams: false,
          wokeUpAtNight: false,
          notes: '',
          completedActivities: [],
          weight: '',
          heartRate: '',
        },
        hasCheckedInToday: false
      })),

      checkIfNewDay: () => {
        const today = new Date().toDateString();
        const lastCheckIn = localStorage.getItem('lastCheckIn');
        
        if (lastCheckIn !== today) {
          get().resetDay();
        } else {
          set({ hasCheckedInToday: true });
        }
      },

      // Secrets/Tactics functions
      addSecret: (category, secret) => set((state) => ({
        secrets: {
          ...state.secrets,
          [category]: [...state.secrets[category], {
            id: Date.now().toString(),
            ...secret,
            createdAt: new Date().toISOString()
          }]
        }
      })),

      updateSecret: (category, secretId, updatedSecret) => set((state) => ({
        secrets: {
          ...state.secrets,
          [category]: state.secrets[category].map(s => 
            s.id === secretId ? { ...s, ...updatedSecret, updatedAt: new Date().toISOString() } : s
          )
        }
      })),

      deleteSecret: (category, secretId) => set((state) => ({
        secrets: {
          ...state.secrets,
          [category]: state.secrets[category].filter(s => s.id !== secretId)
        }
      })),

      toggleSecretFavorite: (category, secretId) => set((state) => ({
        secrets: {
          ...state.secrets,
          [category]: state.secrets[category].map(s => 
            s.id === secretId ? { ...s, favorite: !s.favorite } : s
          )
        }
      }))
    }),
    {
      name: 'athlete-storage',
    }
  )
);

export default useStore;