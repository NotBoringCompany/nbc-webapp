import { Box, Flex, SimpleGrid, Text } from '@mantine/core'
import NFTCard from '../NFTCard'

const NFTStaked = ({
    cardColumnsBreakpoints,
    subpoolData
}) => {
    return (
        <Box
            sx={(theme) => ({
                border: '3px solid #42ca9f',
                marginTop: 80,
                borderRadius: theme.radius.md,
                padding: 20,
                minWidth: '30%',
            })}
        >
            <Flex
                direction='row'
                align='center'
                justify='center'
                sx={(theme) => ({
                    marginBottom: 20,
                })}
            >
                <Text
                    sx={(theme) => ({
                        fontSize: 40,
                        fontWeight: 700,
                        color: '#42ca9f',
                    })}
                >
                    NFTS STAKED
                </Text>
            </Flex>
            <Flex
                direction='column'
                align='center'
                justify='center'
                sx={(theme) => ({
                    marginBottom: 20,
                })}
            >
                {!subpoolData && <Text>Loading</Text>}
                {subpoolData && (
                    <>
                        <SimpleGrid
                            sx={(theme) => ({
                                justifyItems: 'center',
                                alignItems: 'center',
                            })}
                            breakpoints={cardColumnsBreakpoints}
                        >
                            {subpoolData.stakedKeys
                                ?.sort((a, b) => a.TokenID - b.TokenID)
                                .map((k) => (
                                    <NFTCard key={k.AnimationUrl} nft={k} />
                                ))}
                            {subpoolData.stakedKeychains
                                ?.sort((a, b) => a.TokenID - b.TokenID)
                                .map((keychain) => (
                                    <NFTCard key={keychain.name} nft={keychain} />
                                ))}
                            {subpoolData.stakedSuperiorKeychain?.tokenID !== -1 && (
                                <NFTCard
                                    key={subpoolData.stakedSuperiorKeychain?.name}
                                    nft={subpoolData.stakedSuperiorKeychain}
                                />
                            )}
                        </SimpleGrid>
                    </>
                )}
            </Flex>
        </Box>
    )
}

export default NFTStaked