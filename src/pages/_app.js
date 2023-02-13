// import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import CustomFonts from '@/components/fonts/CustomFonts';
import { MoralisProvider } from 'react-moralis';

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
          /** Put your mantine theme override here */
          colorScheme: 'dark',
          fontFamily: 'Chakra Petch, sans-serif',
        }}
      >
        <CustomFonts />
        <Component {...pageProps} />
      </MantineProvider>
    </MoralisProvider>
  );
}
