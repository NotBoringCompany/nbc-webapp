import Layout from '@/components/Layout/Layout';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';

export default function Home() {
  const { isAuthenticated, user, login, setUserData, isAuthenticating } =
    useMoralis();

  return (
    <Layout>
      <button
        onClick={async () => {
          await setUserData({ email: 'kaktus@mail.com', password: '123456' });
        }}
      >
        set data
      </button>

      <button
        onClick={async () => {
          const x = await login('xxx@mail.com', '1234');
          console.log({ x });
        }}
      >
        login
      </button>
    </Layout>
  );
}
