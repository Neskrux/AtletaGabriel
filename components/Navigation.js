import { useRouter } from 'next/router';
import { Home, TrendingUp, Brain, User } from 'lucide-react';

const Navigation = () => {
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'DASHBOARD', icon: Home, path: '/' },
    { id: 'performance', label: 'STATS', icon: TrendingUp, path: '/performance' },
    { id: 'insights', label: 'ANALYSIS', icon: Brain, path: '/insights' },
    { id: 'profile', label: 'FIGHTER', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 safe-bottom">
      <div className="grid grid-cols-4 max-w-lg mx-auto">
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
  );
};

export default Navigation;