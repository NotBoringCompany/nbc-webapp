import { Flex, SimpleGrid, Text } from '@mantine/core';
import NFTCard from '../NFTCard';
import BorderedBox from '@/components/BorderedBox/BorderedBox';
import { HeadingFour } from '@/components/Typography/Headings';

const NFTStaked = ({ cardColumnsBreakpoints, subpoolData }) => {
  return (
    <BorderedBox
      borderRadiusSize='md'
      sx={{ marignTop: 80, minWidth: '30%' }}
      p='lg'
      variant='green'
    >
      <HeadingFour order={2} my={40}>
        NFTS STAKED
      </HeadingFour>
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
    </BorderedBox>
  );
};

export default NFTStaked;
