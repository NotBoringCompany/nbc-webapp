// import '@/styles/globals.css';
import Layout from '@/components/Layout/Layout';
import { MantineProvider, Modal } from '@mantine/core';
import CustomFonts from '@/components/Globals/CustomFonts';
import { MoralisProvider } from 'react-moralis';
import GlobalStyles from '@/components/Globals/Styles';
import AuthModal from '@/components/AuthModal/AuthModal';

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
