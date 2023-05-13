import BorderedBox from '@/components/BorderedBox/BorderedBox';
import Layout from '@/components/Layout/Layout';
import { Flex, Text, Avatar, Divider, CopyButton, Tooltip, ActionIcon, SimpleGrid, Card, Box, Button } from '@mantine/core';
import NBCLogo from '../../public/NBCLogo.png'
import { useMoralis, useNativeBalance, useNFTBalances, useTokenPrice } from 'react-moralis';
import { useCallback, useEffect, useState } from 'react';
import { IconCheck, IconCopy, IconDiamond, IconWallet } from '@tabler/icons';
import ETHLogo from '../../public/ethLogo.png'
import RECToken from '../../public/recToken.png'
import Image from 'next/image';
import { MediumButton } from '@/components/Buttons/Universals';

const Inventory = () => {
    const { user } = useMoralis();
    const [email, setEmail] = useState(null);
    const [nfts, setNfts] = useState(null);
    const { getBalances, data: balance, nativeToken, error: nativeBalanceError, isLoading: nativeBalanceLoading } = useNativeBalance();
    const { getNFTBalances, data: nftBalance, error: nftBalanceError, isLoading: nftBalanceLoading, isFetching: nftBalanceFetching } = useNFTBalances();
    // const { fetchTokenPrice, data: tokenPrice, error: tokenPriceError, isLoading: tokenPriceLoading, isFetching: tokenpriceFetching } = useTokenPrice();
    const getEmail = useCallback(() => {
        if (user?.attributes?.email) {
            setEmail(user.attributes.email);
        }
    }, [user])

    const returnBalances = async () => {
        if (!balance.balance) {
            await getBalances({params: {chain: '0x1'}}); // only ETH for now
        }
    }

    const returnNftBalances = async () => {
        if (!nftBalance) {
            const check = await getNFTBalances({params: {chain: '0x1'}}); // only ETH for now
            const ownedKOS = check.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_KOS_ADDRESS.toLowerCase());
            const ownedKeychains = check.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_KEYCHAIN_ADDRESS.toLowerCase());
            const ownedSupKeychains = check.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_SUPERIOR_KEYCHAIN_ADDRESS.toLowerCase());

            setNfts({
                ownedKOS,
                ownedKeychains,
                ownedSupKeychains
            })
        } else {
            const ownedKOS = nftBalance.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_KOS_ADDRESS.toLowerCase());
            const ownedKeychains = nftBalance.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_KEYCHAIN_ADDRESS.toLowerCase());
            const ownedSupKeychains = nftBalance.result.filter(nft => nft.token_address === process.env.NEXT_PUBLIC_SUPERIOR_KEYCHAIN_ADDRESS.toLowerCase());

            setNfts({
                ownedKOS,
                ownedKeychains,
                ownedSupKeychains
            })
        }
    }

    // const returnTokenPrice = useCallback(async () => {
    //     if (!tokenPrice) {
    //         await fetchTokenPrice({params: {chain: '0x1'}}); // only ETH for now
    //     }

    //     console.log('tokenPrice', tokenPrice)
    // }, [fetchTokenPrice, tokenPrice])

    useEffect(() => {
        getEmail();
        returnBalances();
        returnNftBalances();
        // returnTokenPrice();
    }, [user, getEmail])

    // useEffect(() => {
    //     if (nftBalance && !nfts) {
    //         getNfts();
    //     }
    // }, [nftBalance, nfts, getNfts])

    return (
        <Layout
            withAuth
            pageTitle='Inventory'
        >
            <Flex
                direction='row'
                align='center'
                justify='space-evenly'
            >
                <BorderedBox
                    borderRadiusSize='xl'
                    minWidth='20%'
                    sx={{border: '3px solid #42ca9f'}}
                    py={15}
                >
                    <Flex
                        direction='column'
                        align='center'
                        justify='space-evenly'
                        mt={10}
                    >
                        <Avatar radius='md' size='xl' sx={(theme) => ({
                            backgroundColor: '#42ca9f',
                        })}>
                            {user?.attributes?.email[0]?.toUpperCase() ?? <NBCLogo />}
                        </Avatar>
                        <Flex
                            direction='column'
                            mt={20}
                            px={20}
                        >
                            <Flex
                                direction='row'
                                align='center'
                                justify='space-between'
                            >
                                <Text>
                                    {`${user?.attributes?.ethAddress.slice(0, 7)}...${user?.attributes?.ethAddress.slice(-5)}`}
                                </Text>
                                <CopyButton value={user?.attributes?.ethAddress} timeout={3000}>
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position='right'>
                                            <ActionIcon color={copied ? '#42ca9f' : 'white'} onClick={copy}>
                                                {copied ? <IconCheck color='#42ca9f' /> : <IconCopy color='#42ca9f' />}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>
                            </Flex>
                            <Divider color='#42ca9f' size='xs' variant='dashed' />
                            <Text>{email ?? 'No email provided.'}</Text>
                        </Flex>
                    </Flex>
                </BorderedBox>
                <Flex
                    direction='column'
                    justify='start'
                    sx={(theme) => ({
                        minWidth: '50%',
                        maxWidth: '50%',
                    })}
                >
                    <Flex
                        direction='row'
                        align='center'
                    >
                        <IconWallet size={50} color='#42ca9f' />
                        <Text size={38} ml={15}>Tokens</Text>
                    </Flex>
                    <Divider color='#42ca9f' size='sm' variant='dashed' />
                    <Flex
                        direction='column'
                        mb={30}
                        sx={(theme) => ({
                            maxWidth: '100%'
                        })}
                    >
                        <SimpleGrid cols={4}>
                            <Box
                                py={30}
                                px={30} 
                                mt={30} 
                                sx={(theme) => ({
                                    backgroundColor: theme.colors.dark[7],
                                })}
                            >
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='center'
                                    mb={15}
                                >
                                    <Image src={ETHLogo} alt='ETH Logo' width={30} />
                                    <Text size={24} ml={15} weight={700}>ETH</Text>
                                </Flex>
                                <Divider color='grey' size='xs' variant='dashed' />
                                <Flex
                                    direction='column'
                                    align='center'
                                    justify='center'
                                    mt={15}
                                >
                                    <Text size={24} weight={700}>{balance ? parseFloat(balance.balance/10**18).toFixed(3) : '0'}</Text>
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
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='center'
                                    mb={15}
                                >
                                    <Image src={RECToken} alt='REC Logo' width={50} />
                                    <Text size={24} weight={700}>REC</Text>
                                </Flex>
                                <Divider color='grey' size='xs' variant='dashed' />
                                <Flex
                                    direction='column'
                                    align='center'
                                    justify='center'
                                    mt={15}
                                >
                                    <Text size={24} weight={700}>TO DO</Text>
                                </Flex>
                            </Box>
                        </SimpleGrid>
                    </Flex>
                    <Flex
                        direction='row'
                        align='center'
                    >
                        <IconDiamond size={50} color='#42ca9f' />
                        <Text size={38} ml={15}>NFTs</Text>
                    </Flex>
                    <Divider color='#42ca9f' size='sm' variant='dashed' />
                    <Flex
                        direction='column'
                        mb={30}
                        sx={(theme) => ({
                            maxWidth: '100%'
                        })}
                    >
                        <SimpleGrid cols={4}>
                            <Box
                                py={30}
                                px={30} 
                                mt={30} 
                                sx={(theme) => ({
                                    backgroundColor: theme.colors.dark[7],
                                })}
                            >
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='center'
                                    mb={15}
                                >
                                    <Image src={ETHLogo} alt='ETH Logo' width={30} />
                                    <Text size={24} ml={15} weight={700}>KOS</Text>
                                </Flex>
                                <Divider color='grey' size='xs' variant='dashed' />
                                <Flex
                                    direction='column'
                                    align='center'
                                    justify='center'
                                    mt={15}
                                >
                                    <Text size={24} weight={700} mb={30}>{nfts?.ownedKOS?.length ?? 0}</Text>
                                    <MediumButton text='View' color='#42ca9f' />
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
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='center'
                                    mb={15}
                                >
                                    <Image src={RECToken} alt='REC Logo' width={50} />
                                    <Text size={24} weight={700}>KCH</Text>
                                </Flex>
                                <Divider color='grey' size='xs' variant='dashed' />
                                <Flex
                                    direction='column'
                                    align='center'
                                    justify='center'
                                    mt={15}
                                >
                                    <Text size={24} weight={700} mb={30}>{nfts?.ownedKeychains?.length ?? 0}</Text>
                                    <MediumButton text='View' color='#42ca9f' />
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
                                <Flex
                                    direction='row'
                                    align='center'
                                    justify='center'
                                    mb={15}
                                >
                                    <Image src={RECToken} alt='REC Logo' width={50} />
                                    <Text size={24} weight={700}>SKCH</Text>
                                </Flex>
                                <Divider color='grey' size='xs' variant='dashed' />
                                <Flex
                                    direction='column'
                                    align='center'
                                    justify='center'
                                    mt={15}
                                >
                                    <Text size={24} weight={700} mb={30}>{nfts?.ownedSupKeychains?.length ?? 0}</Text>
                                    <MediumButton text='View' color='#42ca9f' />
                                </Flex>
                            </Box>
                        </SimpleGrid>
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    )
}

export default Inventory;