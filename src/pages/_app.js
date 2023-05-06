// import '@/styles/globals.css';
import { MantineProvider, Modal } from '@mantine/core';
import CustomFonts from '@/components/Globals/CustomFonts';
import { MoralisProvider } from 'react-moralis';
import GlobalStyles from '@/components/Globals/Styles';
import AuthModal from '@/components/Modals/AuthModal';
import { Analytics } from '@vercel/analytics/react';

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
          loader: 'oval',
          colors: {
            nbcGreen: ['#42ca9f'],
            nbcRed: ['#ca4242'],
          },
        }}
      >
        <GlobalStyles />
        <CustomFonts />
        <AuthModal />
        <Component {...pageProps} />
      </MantineProvider>
    </MoralisProvider>
  );
}
