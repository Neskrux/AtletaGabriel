import { useRouter } from 'next/router';
import { Home, TrendingUp, Brain, User, Lock } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Navigation = () => {
  const router = useRouter();
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.dashboard'), icon: Home, path: '/' },
    { id: 'performance', label: t('nav.stats'), icon: TrendingUp, path: '/performance' },
    { id: 'secrets', label: t('nav.secrets'), icon: Lock, path: '/secrets' },
    { id: 'insights', label: t('nav.analysis'), icon: Brain, path: '/insights' },
    { id: 'profile', label: t('nav.fighter'), icon: User, path: '/profile' },
  ];

  return (
    <>
      {/* Language Selector - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSelector />
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 safe-bottom">
        <div className="grid grid-cols-5 max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`flex flex-col items-center justify-center py-3 px-2 transition-all ${
                  isActive
                    ? 'text-blood-400'
                    : 'text-steel-600 hover:text-steel-400'
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs mt-1 font-medium uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navigation;