import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useStore from '../lib/store';
import MorningCheckIn from '../components/MorningCheckIn';
import Dashboard from '../components/Dashboard';
import Navigation from '../components/Navigation';

export default function Home() {
  const router = useRouter();
  const { hasCheckedInToday, checkIfNewDay } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIfNewDay();
    setIsLoading(false);
  }, [checkIfNewDay]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!hasCheckedInToday) {
    return <MorningCheckIn />;
  }

  return (
    <>
      <Dashboard />
      <Navigation />
    </>
  );
}
