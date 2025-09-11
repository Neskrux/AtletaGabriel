import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Flame, Target, Shield, Settings, Power, Edit3, Camera, Award, TrendingUp, Swords, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import useStore from '../lib/store';
import Image from 'next/image';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast from 'react-hot-toast';

const Profile = () => {
  const { athlete, resetDay } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(athlete);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const achievements = [
    { id: 1, icon: '🏆', title: '7 DAY WARRIOR', unlocked: athlete.currentStreak >= 7 },
    { id: 2, icon: '🔥', title: '30 DAY BEAST', unlocked: athlete.bestStreak >= 30 },
    { id: 3, icon: '💀', title: '100 BATTLES', unlocked: athlete.totalTrainingDays >= 100 },
    { id: 4, icon: '🥋', title: 'GROUND MASTER', unlocked: false },
    { id: 5, icon: '🥊', title: 'STRIKER ELITE', unlocked: false },
    { id: 6, icon: '⚔️', title: 'UNBREAKABLE', unlocked: athlete.currentStreak >= 14 },
    { id: 7, icon: '🛡️', title: 'IRON DEFENSE', unlocked: false },
    { id: 8, icon: '👑', title: 'CHAMPION', unlocked: false },
  ];

  const stats = [
    { label: 'AGE', value: `${athlete.age}`, icon: <User className="w-4 h-4" /> },
    { label: 'LEVEL', value: athlete.level, icon: <Award className="w-4 h-4" /> },
    { label: 'STREAK', value: `${athlete.currentStreak}`, icon: <Flame className="w-4 h-4" /> },
    { label: 'RECORD', value: `${athlete.bestStreak}`, icon: <Trophy className="w-4 h-4" /> },
    { label: 'SESSIONS', value: athlete.totalTrainingDays, icon: <Target className="w-4 h-4" /> },
    { label: 'WIN RATE', value: '87%', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('PROFILE UPDATED', {
      style: {
        background: '#1a1a1a',
        color: '#DC143C',
        border: '1px solid #DC143C',
      },
    });
  };

  const handleResetApp = () => {
    if (window.confirm('RESET ALL DATA? THIS CANNOT BE UNDONE.')) {
      localStorage.clear();
      resetDay();
      toast.success('APP RESET COMPLETE', {
        style: {
          background: '#1a1a1a',
          color: '#DC143C',
          border: '1px solid #DC143C',
        },
      });
      window.location.reload();
    }
  };

  const overallProgress = Math.round((athlete.totalTrainingDays / 365) * 100);

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      {/* Header with Profile */}
      <div className="bg-dark-800 border-b border-dark-700 safe-top">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bebas tracking-wider text-white">FIGHTER PROFILE</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 bg-dark-700 border border-dark-600 hover:border-blood-600 transition-colors"
            >
              <Edit3 className="w-5 h-5 text-steel-400" />
            </button>
          </div>

          {/* Fighter Card */}
          <div className="bg-dark-700 border border-dark-600 p-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 overflow-hidden border-2 border-blood-600">
                  <Image
                    src={athlete.photos ? athlete.photos[selectedPhotoIndex] : athlete.photo}
                    alt={athlete.name}
                    width={96}
                    height={96}
                    className="object-cover"
                    style={{ filter: 'contrast(1.2) saturate(0.8)' }}
                    onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % (athlete.photos?.length || 1))}
                  />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blood-600 flex items-center justify-center border border-white">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="text-2xl font-bebas bg-dark-600 border border-dark-500 px-3 py-1 mb-2 w-full text-white"
                  />
                ) : (
                  <h2 className="text-3xl font-bebas tracking-wider text-white mb-1">{athlete.name}</h2>
                )}
                <p className="text-blood-400 font-russo text-sm uppercase">{athlete.category}</p>
                <p className="text-steel-400 text-sm">{athlete.age} YEARS • {athlete.level}</p>
                
                <div className="flex gap-6 mt-3">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-white font-medium">{athlete.currentStreak}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-white font-medium">{athlete.totalTrainingDays}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Swords className="w-4 h-4 text-blood-400" />
                    <span className="text-sm text-white font-medium">{athlete.wins || 0}-{athlete.losses || 0}-{athlete.draws || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blood-600 text-white py-2 font-medium uppercase tracking-wider hover:bg-blood-500"
                >
                  SAVE
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-dark-600 text-steel-400 py-2 font-medium uppercase tracking-wider hover:text-white"
                >
                  CANCEL
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Annual Progress */}
        <div className="bg-dark-800 border border-dark-700 p-6">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> ANNUAL PROGRESS
          </h3>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={overallProgress}
                text={`${overallProgress}%`}
                styles={buildStyles({
                  pathColor: '#DC143C',
                  textColor: '#ffffff',
                  trailColor: '#2e2e2e',
                  textSize: '20px',
                })}
              />
            </div>
            <div className="flex-1">
              <p className="text-steel-400 text-sm mb-3 uppercase">
                {athlete.totalTrainingDays} TRAINING DAYS COMPLETED
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-steel-400 uppercase">Target:</span>
                  <span className="font-medium text-white">365 DAYS</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-steel-400 uppercase">Remaining:</span>
                  <span className="font-medium text-blood-400">{365 - athlete.totalTrainingDays} DAYS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Combat Stats */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> COMBAT STATISTICS
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-700 border border-dark-600 p-3"
              >
                <div className="flex items-center gap-2 text-blood-400 mb-1">
                  {stat.icon}
                  <span className="text-xs uppercase">{stat.label}</span>
                </div>
                <p className="font-bebas text-xl text-white">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> ACHIEVEMENTS
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                className={`text-center p-3 border transition-all ${
                  achievement.unlocked
                    ? 'bg-dark-700 border-blood-600'
                    : 'bg-dark-900 border-dark-600 opacity-40'
                }`}
              >
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <p className="text-xs text-steel-400 uppercase">{achievement.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fight Record */}
        <div className="bg-gradient-to-r from-blood-600 to-blood-500 p-6">
          <h3 className="text-2xl font-bebas tracking-wider text-white mb-4">PROFESSIONAL RECORD</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-4xl font-bebas text-white">{athlete.wins || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">WINS</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bebas text-white">{athlete.losses || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">LOSSES</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bebas text-white">{athlete.draws || 0}</p>
              <p className="text-xs text-blood-100 uppercase tracking-wider">DRAWS</p>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-dark-800 border border-dark-700 p-4">
          <h3 className="font-bebas text-lg tracking-wider text-white mb-4">
            <span className="text-blood-400">///</span> SYSTEM SETTINGS
          </h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-3 hover:bg-dark-700 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-steel-400" />
                <span className="text-steel-400 uppercase">Preferences</span>
              </div>
              <ChevronRight className="w-5 h-5 text-steel-600" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 hover:bg-dark-700 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-steel-400" />
                <span className="text-steel-400 uppercase">Privacy</span>
              </div>
              <ChevronRight className="w-5 h-5 text-steel-600" />
            </button>
            
            <button 
              onClick={handleResetApp}
              className="w-full flex items-center justify-between p-3 hover:bg-red-900/20 border border-transparent hover:border-red-600 transition-all"
            >
              <div className="flex items-center gap-3">
                <Power className="w-5 h-5 text-red-600" />
                <span className="text-red-600 uppercase">Reset System</span>
              </div>
            </button>
          </div>
        </div>

        {/* Motivational */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-dark-800 border-l-4 border-blood-600 p-6"
        >
          <h3 className="text-xl font-bebas tracking-wider text-white mb-2">WARRIOR MINDSET</h3>
          <p className="text-steel-400 text-sm uppercase">
            Every champion was once a contender who refused to give up.
            Keep grinding. Keep fighting. Become legendary.
          </p>
        </motion.div>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;