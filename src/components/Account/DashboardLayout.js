import { Box, Divider, Flex, Loader, SimpleGrid, Text } from '@mantine/core';
import { IconDiamond, IconWallet } from '@tabler/icons';
import Image from 'next/image';
import { MediumButton } from '../Buttons/Universals';
import ETHLogo from '../../../public/ethLogo.png';
import RECToken from '../../../public/recToken.png';
import { useEffect, useState } from 'react';
import { useMoralis, useNFTBalances, useNativeBalance } from 'react-moralis';
import { useRouter } from 'next/router';
import { dashboardGridBreakpoints } from '../Breakpoints/DashboardGrid';
import { COLORS } from '../Globals/colors';

const DashboardLayout = () => {
  const { user } = useMoralis();
  const [nfts, setNfts] = useState(null);
  const [nativeBalances, setNativeBalances] = useState(null);
  const [recToken, setRecToken] = useState(null);
  const { getBalances, isLoading: nativeBalanceLoading } = useNativeBalance();
  const { getNFTBalances, isLoading: nftBalancesLoading } = useNFTBalances();
  const router = useRouter();

  useEffect(() => {
    const fetchNativeBalances = async () => {
      const balances = await getBalances({ params: { chain: '0x1' } });
      setNativeBalances(balances);
    };

    const fetchNftBalances = async () => {
      const balances = await getNFTBalances({
        params: { chain: '0x1', address: user.attributes?.ethAddress || '' },
      });
      console.log({ balances });
      const ownedKOS = balances?.result?.filter(
        (nft) =>
          nft.token_address ===
          process.env.NEXT_PUBLIC_KOS_ADDRESS.toLowerCase()
      );
      const ownedKeychains = balances?.result?.filter(
        (nft) =>
          nft.token_address ===
          process.env.NEXT_PUBLIC_KEYCHAIN_ADDRESS.toLowerCase()
      );
      const ownedSupKeychains = balances?.result?.filter(
        (nft) =>
          nft.token_address ===
          process.env.NEXT_PUBLIC_SUPERIOR_KEYCHAIN_ADDRESS.toLowerCase()
      );

      setNfts({
        ownedKOS,
        ownedKeychains,
        ownedSupKeychains,
      });
    };

    const fetchStakerRECBalance = async () => {
      const rawRes = await fetch(
        `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-rec-balance/${
          user && user.attributes.ethAddress
        }`
      ).catch((err) => console.log(err));
      const res = await rawRes.json();

      setRecToken(res?.data?.stakerRecBalance);
    };

    if (!nativeBalances) {
      fetchNativeBalances();
    }

    if (!nfts) {
      fetchNftBalances();
    }

    if (!recToken) {
      fetchStakerRECBalance();
    }
  }, [nativeBalances, getBalances, getNFTBalances, nfts, recToken, user]);

  return (
    <Flex w='100%' direction='column' justify='start'>
      <Flex direction='row' align='center'>
        <IconWallet size={50} color='#42ca9f' />
        <Text size={38} ml={15}>
          Tokens
        </Text>
      </Flex>
      <Divider color='#42ca9f' size='sm' variant='dashed' />
      <Flex
        direction='column'
        mb={30}
        sx={(theme) => ({
          maxWidth: '100%',
          width: '100%',
        })}
      >
        <SimpleGrid cols={2}>
          <Box
            py={30}
            px={30}
            mt={30}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
          >
            <Flex direction='row' align='center' justify='center' mb={15}>
              <Image src={ETHLogo} alt='ETH Logo' width={30} />
              <Text size={24} ml={15} weight={700}>
                ETH
              </Text>
            </Flex>
            <Divider color='grey' size='xs' variant='dashed' />
            <Flex direction='column' align='center' justify='center' mt={15}>
              {nativeBalanceLoading ? (
                <Loader color={COLORS.green} mb={30} />
              ) : (
                <Text size={24} weight={700}>
                  {nativeBalances
                    ? parseFloat(nativeBalances.balance / 10 ** 18).toFixed(3)
                    : '0'}
                </Text>
              )}
            </Flex>
          </Box>
          <Box
            py={30}
            px={30}
            mt={30}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
          >
            <Flex direction='row' align='center' justify='center' mb={15}>
              <Image src={RECToken} alt='REC Logo' width={50} />
              <Text size={24} weight={700}>
                REC
              </Text>
            </Flex>
            <Divider color='grey' size='xs' variant='dashed' />
            <Flex direction='column' align='center' justify='center' mt={15}>
              {nativeBalanceLoading ? (
                <Loader color={COLORS.green} mb={30} />
              ) : (
                <Text size={24} weight={700} mb={30}>
                  {recToken ? parseFloat(recToken).toFixed(2) : '0'}
                </Text>
              )}
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
      <Flex direction='row' align='center'>
        <IconDiamond size={50} color='#42ca9f' />
        <Text size={38} ml={15}>
          NFTs
        </Text>
      </Flex>
      <Divider color='#42ca9f' size='sm' variant='dashed' />
      <Flex
        direction='column'
        mb={30}
        sx={(theme) => ({
          maxWidth: '100%',
        })}
      >
        <SimpleGrid breakpoints={dashboardGridBreakpoints}>
          <Box
            py={30}
            px={30}
            mt={30}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
          >
            <Flex direction='row' align='center' justify='center' mb={15}>
              <Text size={24} ml={15} weight={700}>
                KOS
              </Text>
            </Flex>
            <Divider color='grey' size='xs' variant='dashed' />
            <Flex direction='column' align='center' justify='center' mt={15}>
              {nftBalancesLoading ? (
                <Loader color={COLORS.green} mb={30} />
              ) : (
                <Text size={24} weight={700} mb={30}>
                  {nfts?.ownedKOS?.length ?? 0}
                </Text>
              )}
              <MediumButton
                color='#42ca9f'
                onClick={() => router.replace('/account/inventory')}
              >
                View
              </MediumButton>
            </Flex>
          </Box>
          <Box
            py={30}
            px={30}
            mt={30}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
          >
            <Flex direction='row' align='center' justify='center' mb={15}>
              <Text size={24} weight={700}>
                KCH
              </Text>
            </Flex>
            <Divider color='grey' size='xs' variant='dashed' />
            <Flex direction='column' align='center' justify='center' mt={15}>
              {nftBalancesLoading ? (
                <Loader mb={30} color={COLORS.green} />
              ) : (
                <Text size={24} weight={700} mb={30}>
                  {nfts?.ownedKeychains?.length ?? 0}
                </Text>
              )}
              <MediumButton
                color='#42ca9f'
                onClick={() => router.replace('/account/inventory')}
              >
                View
              </MediumButton>
            </Flex>
          </Box>
          <Box
            py={30}
            px={30}
            mt={30}
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
          >
            <Flex direction='row' align='center' justify='center' mb={15}>
              <Text size={24} weight={700}>
                SKCH
              </Text>
            </Flex>
            <Divider color='grey' size='xs' variant='dashed' />
            <Flex direction='column' align='center' justify='center' mt={15}>
              {nftBalancesLoading ? (
                <Loader mb={30} color={COLORS.green} />
              ) : (
                <Text size={24} weight={700} mb={30}>
                  {nfts?.ownedSupKeychains?.length ?? 0}
                </Text>
              )}
              <MediumButton
                color='#42ca9f'
                onClick={() => router.replace('/account/inventory')}
              >
                View
              </MediumButton>
            </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;
