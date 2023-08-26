// import '@/styles/globals.css';
import { MantineProvider, Modal } from '@mantine/core';
import CustomFonts from '@/components/Globals/CustomFonts';
import { MoralisProvider } from 'react-moralis';
import GlobalStyles from '@/components/Globals/Styles';
import AuthModal from '@/components/Modals/AuthModal';
import { Analytics } from '@vercel/analytics/react';
import { COLORS } from '@/components/Globals/colors';
import WrongNetwork from '@/components/Modals/WrongNetwork';
import AuthProvider from '@/components/Auth/AuthProvider';

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={`${process.env.NEXT_PUBLIC_MORALIS_APPID}`}
      serverUrl={`${process.env.NEXT_PUBLIC_MORALIS_SERVERURL}`}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          fontFamily: 'Chakra Petch, sans-serif',
          headings: { fontFamily: 'Chakra Petch, sans-serif' },
          loader: 'oval',
          colors: {
            nbcGreen: [COLORS.green],
            nbcRed: [COLORS.red],
          },
        }}
      >
        <GlobalStyles />
        <CustomFonts />
        <AuthModal />
        <WrongNetwork />
        <Analytics />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </MoralisProvider>
  );
}
