import { Flex, Loader, ScrollArea, SimpleGrid, Tabs, Text } from '@mantine/core'
import { useCallback, useEffect, useState } from 'react';
import NFTCard from '../Staking/NFTCard';
import { useMoralis } from 'react-moralis';
import { cardColumnsBreakpoints, inventoryColumnsBreakpoints } from '../Breakpoints/CardColumns';

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
                <Tabs defaultValue='kos'>
                    <Tabs.List grow>
                        <Tabs.Tab value='kos'><Text size={22}>Key Of Salvation</Text></Tabs.Tab>
                        <Tabs.Tab value='keychain'><Text size={22}>Keychain</Text></Tabs.Tab>
                        <Tabs.Tab value='supKeychain'><Text size={22}>Superior Keychain</Text></Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='kos' pt='xs'>
                        <ScrollArea h={'calc(100vh-100px)'}>
                            <SimpleGrid
                                my={20}
                                spacing={'md'}
                                breakpoints={inventoryColumnsBreakpoints}
                                mah={'calc(100vh - 200px)'}
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
                        </ScrollArea>
                    </Tabs.Panel>

                    <Tabs.Panel value='keychain' pt='xs'>
                        <ScrollArea h={'calc(100vh-100px)'}>
                            <SimpleGrid
                                my={20}
                                spacing={'md'}
                                breakpoints={inventoryColumnsBreakpoints}
                                mah={'calc(100vh - 200px)'}
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
                        </ScrollArea>
                    </Tabs.Panel>

                    <Tabs.Panel value='supKeychain' pt='xs'>
                        <ScrollArea h={'calc(100vh-100px)'}>
                            <SimpleGrid
                                my={20}
                                spacing={'md'}
                                breakpoints={inventoryColumnsBreakpoints}
                                mah={'calc(100vh - 200px)'}
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
                        </ScrollArea>
                    </Tabs.Panel>
                </Tabs>
            </Flex>
        )
    }
}

export default InventoryLayout