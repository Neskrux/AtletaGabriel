import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Clock, Save, RotateCcw, Plus, Trash2, Edit3, Calendar, Target, Zap, Moon, Sun, Dumbbell, Book, Coffee } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Preferences = () => {
  const { athlete, setAthlete, weeklySchedule, setWeeklySchedule } = useStore();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('schedule');
  const [editingDay, setEditingDay] = useState(null);
  const [customActivity, setCustomActivity] = useState({
    name: '',
    startTime: '',
    endTime: '',
    intensity: 'medium',
    category: 'training'
  });

  const daysOfWeek = [
    { id: 0, name: 'DOMINGO', short: 'DOM', color: 'border-purple-600' },
    { id: 1, name: 'SEGUNDA', short: 'SEG', color: 'border-red-600' },
    { id: 2, name: 'TERÇA', short: 'TER', color: 'border-blue-600' },
    { id: 3, name: 'QUARTA', short: 'QUA', color: 'border-green-600' },
    { id: 4, name: 'QUINTA', short: 'QUI', color: 'border-yellow-600' },
    { id: 5, name: 'SEXTA', short: 'SEX', color: 'border-orange-600' },
    { id: 6, name: 'SÁBADO', short: 'SAB', color: 'border-pink-600' }
  ];

  const intensityLevels = [
    { value: 'low', label: 'LEVE', color: 'bg-green-900/30 border-green-600 text-green-400' },
    { value: 'medium', label: 'MÉDIO', color: 'bg-yellow-900/30 border-yellow-600 text-yellow-400' },
    { value: 'high', label: 'ALTO', color: 'bg-orange-900/30 border-orange-600 text-orange-400' },
    { value: 'extreme', label: 'EXTREMO', color: 'bg-red-900/30 border-red-600 text-red-400' }
  ];

  const activityCategories = [
    { value: 'training', label: 'TREINO', icon: <Dumbbell className="w-4 h-4" />, color: 'text-blood-400' },
    { value: 'study', label: 'ESTUDO', icon: <Book className="w-4 h-4" />, color: 'text-blue-400' },
    { value: 'recovery', label: 'RECUPERAÇÃO', icon: <Moon className="w-4 h-4" />, color: 'text-purple-400' },
    { value: 'nutrition', label: 'ALIMENTAÇÃO', icon: <Coffee className="w-4 h-4" />, color: 'text-green-400' },
    { value: 'other', label: 'OUTROS', icon: <Target className="w-4 h-4" />, color: 'text-steel-400' }
  ];

  const defaultActivities = [
    { name: 'MMA TRAINING', icon: '🥊', category: 'training', intensity: 'extreme' },
    { name: 'JIU-JITSU', icon: '🥋', category: 'training', intensity: 'high' },
    { name: 'MUSCULAÇÃO', icon: '💪', category: 'training', intensity: 'high' },
    { name: 'CARDIO', icon: '🏃', category: 'training', intensity: 'medium' },
    { name: 'ESTUDO', icon: '📚', category: 'study', intensity: 'low' },
    { name: 'INGLÊS', icon: '🇺🇸', category: 'study', intensity: 'low' },
    { name: 'DESCANSO', icon: '😴', category: 'recovery', intensity: 'low' },
    { name: 'MASSAGEM', icon: '💆', category: 'recovery', intensity: 'low' },
    { name: 'REFEIÇÃO', icon: '🍽️', category: 'nutrition', intensity: 'low' }
  ];

  const handleSaveSchedule = () => {
    toast.success('HORÁRIOS ATUALIZADOS COM SUCESSO!', {
      style: {
        background: '#1a1a1a',
        color: '#DC143C',
        border: '1px solid #DC143C',
      },
    });
  };

  const handleResetSchedule = () => {
    if (window.confirm('RESETAR TODOS OS HORÁRIOS? ISSO NÃO PODE SER DESFEITO.')) {
      // Reset logic here
      toast.success('HORÁRIOS RESETADOS!', {
        style: {
          background: '#1a1a1a',
          color: '#DC143C',
          border: '1px solid #DC143C',
        },
      });
    }
  };

  const addCustomActivity = (dayId) => {
    if (!customActivity.name || !customActivity.startTime || !customActivity.endTime) {
      toast.error('PREENCHA TODOS OS CAMPOS!');
      return;
    }

    const newActivity = {
      id: Date.now(),
      ...customActivity,
      completed: false
    };

    // Add activity to specific day logic here
    setCustomActivity({
      name: '',
      startTime: '',
      endTime: '',
      intensity: 'medium',
      category: 'training'
    });

    toast.success('ATIVIDADE ADICIONADA!', {
      style: {
        background: '#1a1a1a',
        color: '#DC143C',
        border: '1px solid #DC143C',
      },
    });
  };

  const tabs = [
    { id: 'schedule', label: 'HORÁRIOS', icon: <Clock className="w-5 h-5" /> },
    { id: 'activities', label: 'ATIVIDADES', icon: <Target className="w-5 h-5" /> },
    { id: 'goals', label: 'METAS', icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-dark-900 pb-20" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-blood-400" />
            <div>
              <h1 className="text-3xl font-bebas tracking-wider text-white">PREFERÊNCIAS</h1>
              <p className="text-steel-400 text-sm uppercase tracking-wide">
                Configure sua rotina de campeão
              </p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 font-medium uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? 'bg-blood-600 text-white border border-blood-400'
                    : 'bg-dark-700 text-steel-400 border border-dark-600 hover:border-blood-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bebas tracking-wider text-white">
                <span className="text-blood-400">///</span> ROTINA SEMANAL
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleResetSchedule}
                  className="flex items-center gap-2 px-3 py-2 bg-dark-700 border border-dark-600 text-steel-400 hover:border-red-600 hover:text-red-400 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  RESETAR
                </button>
                <button
                  onClick={handleSaveSchedule}
                  className="flex items-center gap-2 px-3 py-2 bg-blood-600 border border-blood-400 text-white hover:bg-blood-500 transition-all"
                >
                  <Save className="w-4 h-4" />
                  SALVAR
                </button>
              </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-1 gap-4">
              {daysOfWeek.map(day => (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: day.id * 0.05 }}
                  className={`bg-dark-800 border ${day.color} p-4`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${day.color} bg-dark-700 flex items-center justify-center`}>
                        <span className="font-bebas text-white text-sm">{day.short}</span>
                      </div>
                      <div>
                        <h3 className="font-bebas text-lg text-white tracking-wider">{day.name}</h3>
                        <p className="text-xs text-steel-400">
                          {weeklySchedule[day.id]?.length || 0} atividades programadas
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingDay(editingDay === day.id ? null : day.id)}
                      className="p-2 bg-dark-700 border border-dark-600 hover:border-blood-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-steel-400" />
                    </button>
                  </div>

                  {/* Activities for this day */}
                  <div className="space-y-2">
                    {weeklySchedule[day.id]?.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-dark-700 border border-dark-600"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{activity.icon}</span>
                          <div>
                            <p className="text-white font-medium">{activity.name}</p>
                            <p className="text-xs text-steel-400">
                              {activity.startTime} - {activity.endTime}
                            </p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 border text-xs uppercase ${
                          intensityLevels.find(l => l.value === activity.intensity)?.color
                        }`}>
                          {intensityLevels.find(l => l.value === activity.intensity)?.label}
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-steel-400">
                        <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Nenhuma atividade programada</p>
                      </div>
                    )}
                  </div>

                  {/* Add Activity Form */}
                  {editingDay === day.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 p-4 bg-dark-700 border border-dark-600"
                    >
                      <h4 className="font-bebas text-white mb-3">ADICIONAR ATIVIDADE</h4>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Nome da atividade"
                          value={customActivity.name}
                          onChange={(e) => setCustomActivity({...customActivity, name: e.target.value})}
                          className="px-3 py-2 bg-dark-600 border border-dark-500 text-white focus:border-blood-400 focus:outline-none"
                        />
                        <select
                          value={customActivity.category}
                          onChange={(e) => setCustomActivity({...customActivity, category: e.target.value})}
                          className="px-3 py-2 bg-dark-600 border border-dark-500 text-white focus:border-blood-400 focus:outline-none"
                        >
                          {activityCategories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <input
                          type="time"
                          value={customActivity.startTime}
                          onChange={(e) => setCustomActivity({...customActivity, startTime: e.target.value})}
                          className="px-3 py-2 bg-dark-600 border border-dark-500 text-white focus:border-blood-400 focus:outline-none"
                        />
                        <input
                          type="time"
                          value={customActivity.endTime}
                          onChange={(e) => setCustomActivity({...customActivity, endTime: e.target.value})}
                          className="px-3 py-2 bg-dark-600 border border-dark-500 text-white focus:border-blood-400 focus:outline-none"
                        />
                        <select
                          value={customActivity.intensity}
                          onChange={(e) => setCustomActivity({...customActivity, intensity: e.target.value})}
                          className="px-3 py-2 bg-dark-600 border border-dark-500 text-white focus:border-blood-400 focus:outline-none"
                        >
                          {intensityLevels.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => addCustomActivity(day.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-blood-600 text-white hover:bg-blood-500 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        ADICIONAR ATIVIDADE
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bebas tracking-wider text-white">
              <span className="text-blood-400">///</span> BIBLIOTECA DE ATIVIDADES
            </h2>

            {activityCategories.map(category => (
              <div key={category.value} className="bg-dark-800 border border-dark-700 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className={category.color}>{category.icon}</span>
                  <h3 className="font-bebas text-white tracking-wider">{category.label}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {defaultActivities
                    .filter(activity => activity.category === category.value)
                    .map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-dark-700 border border-dark-600 hover:border-blood-600 transition-colors cursor-pointer"
                      >
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.name}</p>
                          <div className={`inline-block px-2 py-1 mt-1 border text-xs uppercase ${
                            intensityLevels.find(l => l.value === activity.intensity)?.color
                          }`}>
                            {intensityLevels.find(l => l.value === activity.intensity)?.label}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bebas tracking-wider text-white">
              <span className="text-blood-400">///</span> METAS PERSONALIZADAS
            </h2>

            <div className="bg-dark-800 border border-dark-700 p-6">
              <h3 className="font-bebas text-lg text-white mb-4">CONFIGURAÇÕES DE META</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-steel-400 text-sm uppercase mb-2 block">Meta de Sono (horas)</label>
                  <input
                    type="number"
                    min="6"
                    max="12"
                    step="0.5"
                    defaultValue="8"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-steel-400 text-sm uppercase mb-2 block">Meta de Energia Mínima (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="70"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-steel-400 text-sm uppercase mb-2 block">Meta de Conclusão (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue="85"
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blood-600 to-blood-500 p-6">
              <h3 className="text-xl font-bebas tracking-wider text-white mb-2">MENTALIDADE DE CAMPEÃO</h3>
              <p className="text-blood-100 text-sm">
                "Não é sobre ser perfeito, é sobre ser melhor que ontem. 
                Configure suas metas, mantenha a disciplina e domine cada dia."
              </p>
            </div>
          </motion.div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Preferences;
