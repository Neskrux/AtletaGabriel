import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { LanguageProvider } from '../lib/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Head>
        <title>Athlete Performance Pro</title>
        <meta name="description" content="High Performance Athlete App" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#DC143C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '0',
            fontSize: '14px',
            border: '1px solid #DC143C',
          },
          success: {
            iconTheme: {
              primary: '#DC143C',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <Component {...pageProps} />
    </LanguageProvider>
  );
}

export default MyApp;
