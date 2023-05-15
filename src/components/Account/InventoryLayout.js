import { Flex, Loader, SimpleGrid, Tabs, Text } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react';
import NFTCard from '../Staking/NFTCard';
import { useMoralis } from 'react-moralis';
import { cardColumnsBreakpoints } from '../Breakpoints/CardColumns';

const InventoryLayout = () => {
    const [stakerInventory, setStakerInventory] = useState(null);
    const [stakerInventoryLoading, setStakerInventoryLoading] = useState(true);
    const { user } = useMoralis();

    const getStakerInventory = useCallback(async () => {
        const rawRes = await fetch(
            `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/${user?.attributes?.ethAddress}/1`
        ).catch((err) => console.log(err));
        const res = await rawRes.json();

        setStakerInventory(res?.data?.inventory ?? null);
        setStakerInventoryLoading(false);
    }, [user?.attributes?.ethAddress])

    useEffect(() => {
        if (user && !stakerInventory) {
            getStakerInventory();
        }
    }, [user, stakerInventory, getStakerInventory])

    console.log('staker inventory: ', stakerInventory)

    if (stakerInventoryLoading) {
        return (
            <Loader color='#42ca9f' />
        )
    } else {
        return (
            <Flex
                direction='column'
                sx={(theme) => ({
                    minWidth: '50%',
                    maxWidth: '50%',
                })}
            >
                <Tabs defaultValue='kos' mt={50}>
                    <Tabs.List grow>
                        <Tabs.Tab value='kos'><Text size={22}>Key Of Salvation</Text></Tabs.Tab>
                        <Tabs.Tab value='keychain'><Text size={22}>Keychain</Text></Tabs.Tab>
                        <Tabs.Tab value='supKeychain'><Text size={22}>Superior Keychain</Text></Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='kos' pt='xs'>
                        <SimpleGrid
                            my={20}
                            spacing={'md'}
                            breakpoints={cardColumnsBreakpoints}
                            mah={'calc(100vh - 100px)'}
                        >
                            {stakerInventory.keyData
                                ?.sort(
                                    (a, b) => b.metadata.luckTrait - a.metadata.luckTrait
                                )
                                .map((k) => (
                                    <NFTCard
                                        key={k.name}
                                        nft={k}
                                    />
                                ))}
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value='keychain' pt='xs'>
                        <SimpleGrid
                            my={20}
                            spacing={'md'}
                            breakpoints={cardColumnsBreakpoints}
                            mah={'calc(100vh - 100px)'}
                        >
                            {stakerInventory.keychainData
                                ?.sort((a, b) => a.tokenID - b.tokenID)
                                .map((keychain) => (
                                    <NFTCard
                                        key={keychain.name}
                                        nft={keychain}
                                    />
                                ))}
                        </SimpleGrid>
                    </Tabs.Panel>

                    <Tabs.Panel value='supKeychain' pt='xs'>
                        <SimpleGrid
                            my={20}
                            spacing={'md'}
                            breakpoints={cardColumnsBreakpoints}
                            mah={'calc(100vh - 100px)'}
                        >
                            {stakerInventory.superiorKeychainData
                                ?.sort((a, b) => a.tokenID - b.tokenID)
                                .map((superiorKeychain) => (
                                    <NFTCard
                                        key={superiorKeychain.name}
                                        nft={superiorKeychain}
                                    />
                                ))}
                        </SimpleGrid>
                    </Tabs.Panel>
                </Tabs>
            </Flex>
        )
    }
}

export default InventoryLayout