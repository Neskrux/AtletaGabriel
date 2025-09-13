import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, X, Shield, Swords, ChevronRight, Lock, Eye, EyeOff } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import { useLanguage } from '../lib/LanguageContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import toast from 'react-hot-toast';

const Secrets = () => {
  const { secrets, addSecret, updateSecret, deleteSecret, toggleSecretFavorite } = useStore();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('jiuJitsu');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingSecret, setEditingSecret] = useState(null);
  const [showSecret, setShowSecret] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  const locale = language === 'pt-BR' ? ptBR : enUS;

  const [newSecret, setNewSecret] = useState({
    title: '',
    technique: '',
    situation: '',
    details: '',
    reminder: '',
    favorite: false
  });

  const categories = [
    { 
      id: 'jiuJitsu', 
      name: 'JIU-JITSU GI', 
      icon: '🥋', 
      color: 'border-blue-600 text-blue-500',
      bgColor: 'bg-blue-900/20'
    },
    { 
      id: 'noGi', 
      name: 'NO-GI', 
      icon: '🤼', 
      color: 'border-purple-600 text-purple-500',
      bgColor: 'bg-purple-900/20'
    },
    { 
      id: 'mma', 
      name: 'MMA', 
      icon: '🥊', 
      color: 'border-red-600 text-red-500',
      bgColor: 'bg-red-900/20'
    },
    { 
      id: 'muayThai', 
      name: 'MUAY THAI', 
      icon: '🦵', 
      color: 'border-orange-600 text-orange-500',
      bgColor: 'bg-orange-900/20'
    }
  ];

  const currentCategory = categories.find(c => c.id === selectedCategory);
  const categorySecrets = secrets[selectedCategory] || [];
  
  // Filter secrets based on search
  const filteredSecrets = categorySecrets.filter(secret => 
    secret.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    secret.technique.toLowerCase().includes(searchTerm.toLowerCase()) ||
    secret.situation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort favorites first
  const sortedSecrets = [...filteredSecrets].sort((a, b) => {
    if (a.favorite && !b.favorite) return -1;
    if (!a.favorite && b.favorite) return 1;
    return 0;
  });

  const handleAddSecret = () => {
    if (!newSecret.title || !newSecret.technique) {
      toast.error(language === 'pt-BR' ? 'Título e técnica são obrigatórios!' : 'Title and technique are required!');
      return;
    }

    addSecret(selectedCategory, newSecret);
    setNewSecret({
      title: '',
      technique: '',
      situation: '',
      details: '',
      reminder: '',
      favorite: false
    });
    setIsAddingNew(false);
    toast.success(language === 'pt-BR' ? 'Segredo adicionado!' : 'Secret added!', {
      style: {
        background: '#1a1a1a',
        color: '#DC143C',
        border: '1px solid #DC143C',
      },
    });
  };

  const handleUpdateSecret = () => {
    if (!editingSecret.title || !editingSecret.technique) {
      toast.error(language === 'pt-BR' ? 'Título e técnica são obrigatórios!' : 'Title and technique are required!');
      return;
    }

    updateSecret(selectedCategory, editingSecret.id, editingSecret);
    setEditingSecret(null);
    toast.success(language === 'pt-BR' ? 'Segredo atualizado!' : 'Secret updated!', {
      style: {
        background: '#1a1a1a',
        color: '#DC143C',
        border: '1px solid #DC143C',
      },
    });
  };

  const handleDeleteSecret = (secretId) => {
    if (window.confirm(language === 'pt-BR' ? 'Deletar este segredo?' : 'Delete this secret?')) {
      deleteSecret(selectedCategory, secretId);
      toast.success(language === 'pt-BR' ? 'Segredo deletado!' : 'Secret deleted!', {
        style: {
          background: '#1a1a1a',
          color: '#DC143C',
          border: '1px solid #DC143C',
        },
      });
    }
  };

  const toggleShowSecret = (secretId) => {
    setShowSecret(prev => ({ ...prev, [secretId]: !prev[secretId] }));
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20 pt-16" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Header */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bebas tracking-wider text-white flex items-center gap-2">
                <Lock className="w-8 h-8 text-blood-400" />
MEUS SEGREDOS
              </h1>
              <p className="text-steel-400 text-sm uppercase tracking-wide">
Biblioteca de Táticas Pessoais
              </p>
            </div>
            <button
              onClick={() => setIsAddingNew(true)}
              className="p-3 bg-blood-600 hover:bg-blood-500 transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Category Selector */}
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 border-2 transition-all ${
                  selectedCategory === category.id
                    ? `${category.bgColor} ${category.color} border-current`
                    : 'bg-dark-700 border-dark-600 text-steel-400 hover:border-dark-500'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <p className="text-xs font-medium uppercase">{category.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-4">
          <input
            type="text"
            placeholder={language === 'pt-BR' ? 'Buscar segredos...' : 'Search secrets...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white placeholder-steel-600 focus:border-blood-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Secrets List */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bebas tracking-wider text-white">
            <span className="text-blood-400">///</span> {currentCategory.name} TÉCNICAS
          </h2>
          <span className="text-sm text-steel-400">
            {sortedSecrets.length} {language === 'pt-BR' ? 'segredos' : 'secrets'}
          </span>
        </div>

        <div className="space-y-3">
          {sortedSecrets.map((secret, index) => (
            <motion.div
              key={secret.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-dark-800 border ${secret.favorite ? 'border-yellow-600' : 'border-dark-700'} p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {secret.favorite && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    <h3 className="font-bebas text-xl tracking-wider text-white">{secret.title}</h3>
                  </div>
                  <p className="text-blood-400 font-medium uppercase text-sm">{secret.technique}</p>
                  {secret.situation && (
                    <p className="text-steel-400 text-sm mt-1">
                      <span className="text-steel-600">SITUAÇÃO:</span> {secret.situation}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleShowSecret(secret.id)}
                    className="p-2 bg-dark-700 hover:bg-dark-600 transition-colors"
                  >
                    {showSecret[secret.id] ? 
                      <EyeOff className="w-4 h-4 text-steel-400" /> : 
                      <Eye className="w-4 h-4 text-steel-400" />
                    }
                  </button>
                  <button
                    onClick={() => toggleSecretFavorite(selectedCategory, secret.id)}
                    className="p-2 bg-dark-700 hover:bg-dark-600 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${secret.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-steel-400'}`} />
                  </button>
                  <button
                    onClick={() => setEditingSecret(secret)}
                    className="p-2 bg-dark-700 hover:bg-dark-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-steel-400" />
                  </button>
                  <button
                    onClick={() => handleDeleteSecret(secret.id)}
                    className="p-2 bg-dark-700 hover:bg-red-900/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>

              {/* Secret Details (Hidden/Shown) */}
              <AnimatePresence>
                {showSecret[secret.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 border-t border-dark-600 space-y-3">
                      {secret.details && (
                        <div className="bg-dark-700 p-3">
                          <p className="text-xs text-steel-600 uppercase mb-1">DETALHES:</p>
                          <p className="text-steel-300 text-sm">{secret.details}</p>
                        </div>
                      )}
                      
                      {secret.reminder && (
                        <div className="bg-blood-900/20 border-l-2 border-blood-600 p-3">
                          <p className="text-xs text-blood-400 uppercase mb-1">LEMBRETE IMPORTANTE:</p>
                          <p className="text-blood-300 text-sm font-medium">{secret.reminder}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-steel-600">
                        <span>Criado: {format(new Date(secret.createdAt), 'dd/MM/yyyy', { locale })}</span>
                        {secret.updatedAt && (
                          <span>Atualizado: {format(new Date(secret.updatedAt), 'dd/MM/yyyy', { locale })}</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {sortedSecrets.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-dark-600 mx-auto mb-4" />
            <p className="text-steel-400 text-lg">
              {language === 'pt-BR' ? 'Nenhum segredo ainda' : 'No secrets yet'}
            </p>
            <p className="text-steel-600 text-sm mt-2">
              {language === 'pt-BR' ? 'Adicione suas técnicas secretas' : 'Add your secret techniques'}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(isAddingNew || editingSecret) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-dark-800 border border-dark-600 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bebas tracking-wider text-white">
                    {editingSecret ? 'EDITAR SEGREDO' : 'NOVO SEGREDO'}
                  </h3>
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingSecret(null);
                      setNewSecret({
                        title: '',
                        technique: '',
                        situation: '',
                        details: '',
                        reminder: '',
                        favorite: false
                      });
                    }}
                    className="p-2 bg-dark-700 hover:bg-dark-600 transition-colors"
                  >
                    <X className="w-5 h-5 text-steel-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-steel-400 uppercase tracking-wide block mb-2">
                      {language === 'pt-BR' ? 'Título *' : 'Title *'}
                    </label>
                    <input
                      type="text"
                      value={editingSecret ? editingSecret.title : newSecret.title}
                      onChange={(e) => editingSecret ? 
                        setEditingSecret({ ...editingSecret, title: e.target.value }) :
                        setNewSecret({ ...newSecret, title: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                      placeholder={language === 'pt-BR' ? 'Ex: Armlock do Guarda Fechada' : 'Ex: Armbar from Closed Guard'}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-steel-400 uppercase tracking-wide block mb-2">
                      {language === 'pt-BR' ? 'Técnica/Movimento *' : 'Technique/Move *'}
                    </label>
                    <input
                      type="text"
                      value={editingSecret ? editingSecret.technique : newSecret.technique}
                      onChange={(e) => editingSecret ?
                        setEditingSecret({ ...editingSecret, technique: e.target.value }) :
                        setNewSecret({ ...newSecret, technique: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                      placeholder={language === 'pt-BR' ? 'Ex: Quebrar postura, isolar braço...' : 'Ex: Break posture, isolate arm...'}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-steel-400 uppercase tracking-wide block mb-2">
                      {language === 'pt-BR' ? 'Situação/Quando usar' : 'Situation/When to use'}
                    </label>
                    <input
                      type="text"
                      value={editingSecret ? editingSecret.situation : newSecret.situation}
                      onChange={(e) => editingSecret ?
                        setEditingSecret({ ...editingSecret, situation: e.target.value }) :
                        setNewSecret({ ...newSecret, situation: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none"
                      placeholder={language === 'pt-BR' ? 'Ex: Quando oponente posta o braço' : 'Ex: When opponent posts arm'}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-steel-400 uppercase tracking-wide block mb-2">
                      {language === 'pt-BR' ? 'Detalhes/Passo a passo' : 'Details/Step by step'}
                    </label>
                    <textarea
                      value={editingSecret ? editingSecret.details : newSecret.details}
                      onChange={(e) => editingSecret ?
                        setEditingSecret({ ...editingSecret, details: e.target.value }) :
                        setNewSecret({ ...newSecret, details: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none resize-none"
                      rows={4}
                      placeholder={language === 'pt-BR' ? 'Descreva os detalhes importantes...' : 'Describe important details...'}
                    />
                  </div>

                  <div>
                    <label className="text-xs text-steel-400 uppercase tracking-wide block mb-2">
                      {language === 'pt-BR' ? 'Lembrete/Dica crucial' : 'Reminder/Crucial tip'}
                    </label>
                    <textarea
                      value={editingSecret ? editingSecret.reminder : newSecret.reminder}
                      onChange={(e) => editingSecret ?
                        setEditingSecret({ ...editingSecret, reminder: e.target.value }) :
                        setNewSecret({ ...newSecret, reminder: e.target.value })
                      }
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 text-white focus:border-blood-400 focus:outline-none resize-none"
                      rows={2}
                      placeholder="Ex: NUNCA esquecer de..."
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => editingSecret ?
                        setEditingSecret({ ...editingSecret, favorite: !editingSecret.favorite }) :
                        setNewSecret({ ...newSecret, favorite: !newSecret.favorite })
                      }
                      className={`flex items-center gap-2 px-4 py-2 border transition-all ${
                        (editingSecret ? editingSecret.favorite : newSecret.favorite)
                          ? 'bg-yellow-900/30 border-yellow-600 text-yellow-500'
                          : 'bg-dark-700 border-dark-600 text-steel-400'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${(editingSecret ? editingSecret.favorite : newSecret.favorite) ? 'fill-current' : ''}`} />
                      <span className="text-sm uppercase">{language === 'pt-BR' ? 'Favorito' : 'Favorite'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={editingSecret ? handleUpdateSecret : handleAddSecret}
                    className="flex-1 py-3 bg-blood-600 hover:bg-blood-500 text-white font-medium uppercase tracking-wider transition-colors"
                  >
                    {editingSecret ? 
                      (language === 'pt-BR' ? 'Atualizar' : 'Update') : 
                      (language === 'pt-BR' ? 'Adicionar' : 'Add')
                    }
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingNew(false);
                      setEditingSecret(null);
                      setNewSecret({
                        title: '',
                        technique: '',
                        situation: '',
                        details: '',
                        reminder: '',
                        favorite: false
                      });
                    }}
                    className="flex-1 py-3 bg-dark-700 hover:bg-dark-600 text-steel-400 font-medium uppercase tracking-wider transition-colors"
                  >
                    {language === 'pt-BR' ? 'Cancelar' : 'Cancel'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
};

export default Secrets;
