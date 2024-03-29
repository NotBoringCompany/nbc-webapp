import {
  Flex,
  Text,
  Select,
  SimpleGrid,
  Button,
  Loader,
  ScrollArea,
} from '@mantine/core';
import { keyCombos, maxSelectedKey } from '@/utils/kosData';
import highestLuckBoost from '@/utils/highestLuckBoost';
import NFTCard from '@/components/Staking/NFTCard';
import { IconAlertOctagon } from '@tabler/icons';
import { cardColumnsBreakpoints } from '../Breakpoints/CardColumns';
import { HeadingFive, HeadingFour } from '../Typography/Headings';
import NewNFTCard from '../Cards/NewNFTCard';
import NFTKeysSorter from '../NFTKeysSorter';
import { COLORS } from '../Globals/colors';
import { SORT_MODE } from '@/constants/sort';

const StakingBox = ({
  onSelectKeyComboType,
  selectedKeyCombo,
  stakerInventoryLoading,
  stakerInventory,
  onSelectKey,
  onSelectKeychain,
  comboSelection,
  confirmButtonClick,
  confirmButtonDisabled,
  stakingOngoing,
  stakingClosed,
  currentComboAllowed,
  houses,
  types,
  endLuckRating,
  luckBoost,
  sort,
  onSort,
}) => {
  const maxSelectedKeys = maxSelectedKey(selectedKeyCombo);
  const selectedKeychains = comboSelection.keychains;
  const comboIsFlushAndSelectsThreeKeychains =
    selectedKeyCombo === 'flush' && selectedKeychains.length === 3;
  const comboIsNotFlushAndSelectsOneKeychain =
    selectedKeyCombo !== 'flush' && selectedKeychains.length === 1;

  return (
    <Flex
      px={24}
      py={16}
      direction='column'
      align='center'
      justify='center'
      w='70%'
      sx={(theme) => ({
        border: stakingOngoing ? '2px solid grey' : '2px solid #42ca9f',
        borderRadius: theme.radius.md,
        maxHeight: '100vh',
        [theme.fn.smallerThan('md')]: {
          width: '100%',
        },
      })}
    >
      <HeadingFour color={stakingOngoing ? 'grey' : 'green'} mb='md' order={2}>
        STAKING
      </HeadingFour>
      {stakingOngoing && !stakingClosed && (
        <Flex style={{ marginBottom: 15 }} align='center' justify='center'>
          <IconAlertOctagon style={{ marginRight: 10 }} color='grey' />
          <Text c='grey' size={20}>
            STAKING HAS STARTED ON THIS POOL. PLEASE WAIT FOR THE NEXT ONE.
          </Text>
        </Flex>
      )}
      {stakingOngoing && stakingClosed && (
        <Flex style={{ marginBottom: 15 }} align='center' justify='center'>
          <IconAlertOctagon style={{ marginRight: 10 }} color='#ca4242' />
          <Text c='#ca4242' size={20}>
            THIS STAKING POOL HAS ENDED.
          </Text>
        </Flex>
      )}
      {!stakingOngoing && !stakingClosed && (
        <>
          {stakerInventoryLoading && <Loader color='#42ca9f' />}
          {!stakerInventoryLoading && (
            <>
              <Flex
                style={{ marginBottom: 15 }}
                align='center'
                sx={(theme) => ({
                  position: 'relative',
                })}
              >
                <IconAlertOctagon style={{ marginRight: 10 }} color='#42ca9f' />
                <Text c='#42ca9f' size={20}>
                  Please select a key combo to continue.
                </Text>
              </Flex>

              <Select
                placeholder='Pick a key combo'
                data={keyCombos}
                size='md'
                defaultValue={'asd'}
                onChange={onSelectKeyComboType}
              />
              {!!selectedKeyCombo && !currentComboAllowed && (
                <Flex
                  style={{ marginTop: 30 }}
                  align='center'
                  sx={(theme) => ({
                    position: 'relative',
                  })}
                >
                  <IconAlertOctagon
                    style={{ marginRight: 10 }}
                    color='#ca4242'
                    size={30}
                  />
                  <Text c='#ca4242' size={20}>
                    You have staked the limit for this current combo. <br />{' '}
                    Please change to another combo.
                  </Text>
                </Flex>
              )}
              {!!selectedKeyCombo && currentComboAllowed ? (
                <>
                  <Text mt={'md'}>
                    Select any {maxSelectedKeys}{' '}
                    {maxSelectedKeys > 1 ? 'keys' : 'key'} to stake. You can
                    also add EITHER 1 Keychain or 1 Superior Keychain to
                    increase your points.
                  </Text>
                  <Text>
                    NOTE: If you chose {'Flush'} as your combo, you can only
                    stake along a Superior Keychain or 3 Keychains.
                  </Text>
                  <HeadingFive order={3} my={48}>
                    YOUR KEYS (SORTED BY DESCENDING LUCK)
                  </HeadingFive>
                  <NFTKeysSorter sort={sort} onSort={onSort} />
                  <ScrollArea
                    h={'80vh'}
                    mt='md'
                    sx={(theme) => ({
                      textAlign: 'center',
                    })}
                  >
                    {stakerInventory.keychainData &&
                      stakerInventory.keychainData.length === 0 && (
                        <Text>
                          No Keys owned. You can find them in secondary
                          marketplaces such as OpenSea or Blur.
                        </Text>
                      )}
                    <SimpleGrid
                      my={20}
                      spacing={'md'}
                      breakpoints={cardColumnsBreakpoints}
                    >
                      <>
                        {sort.loading ? (
                          <div style={{ width: '100%', position: 'absolute' }}>
                            <Loader color={COLORS.green} />
                          </div>
                        ) : (
                          <>
                            {stakerInventory.keyData
                              ?.sort((a, b) =>
                                sort.mode === SORT_MODE.DESC
                                  ? b.metadata[sort.by] - a.metadata[sort.by]
                                  : a.metadata[sort.by] - b.metadata[sort.by]
                              )
                              .filter((k) =>
                                houses.includes(k.metadata.houseTrait)
                              )
                              .filter((k) =>
                                types.includes(k.metadata.typeTrait)
                              )
                              .filter(
                                (k) => k.metadata.luckTrait <= endLuckRating
                              )
                              .filter(
                                (k) =>
                                  k.metadata.luckBoostTrait <=
                                  highestLuckBoost(luckBoost)
                              )
                              .map((k) => (
                                // 'key' is a reserved keyword
                                // by React. We have to use it, when
                                // rendering arrays. But, it can't
                                // be used for our rendering purposes.

                                //'rhKey' is the key that we are
                                //displaying.

                                <NewNFTCard
                                  showButton={true}
                                  key={k.name}
                                  nft={k}
                                  onSelect={onSelectKey}
                                  selected={
                                    comboSelection.keys.findIndex(
                                      (key) => key.name === k.name
                                    ) >= 0
                                  }
                                  absolutelyDisabled={
                                    comboSelection.keys.length ===
                                    maxSelectedKeys
                                  }
                                  nftStakeable={k.stakeable}
                                />
                              ))}
                          </>
                        )}
                      </>
                    </SimpleGrid>
                    <HeadingFive order={3} mt={48}>
                      YOUR KEYCHAINS
                    </HeadingFive>
                    {stakerInventory.keychainData &&
                      stakerInventory.keychainData.length === 0 && (
                        <Text>
                          No Keychains owned. You can find them in secondary
                          marketplaces such as OpenSea or Blur.
                        </Text>
                      )}
                    <SimpleGrid
                      my={'md'}
                      spacing={'md'}
                      breakpoints={cardColumnsBreakpoints}
                    >
                      {stakerInventory.keychainData
                        ?.sort((a, b) => a.tokenID - b.tokenID)
                        .map((keychain) => (
                          // 'key' is a reserved keyword
                          // by React. We have to use it, when
                          // rendering arrays.
                          <NFTCard
                            showButton={true}
                            key={keychain.name}
                            nft={keychain}
                            onSelect={onSelectKeychain}
                            selected={
                              selectedKeychains.findIndex(
                                (kc) => kc.name === keychain.name
                              ) >= 0
                            }
                            absolutelyDisabled={
                              !!comboSelection.superiorKeychain ||
                              comboIsFlushAndSelectsThreeKeychains ||
                              comboIsNotFlushAndSelectsOneKeychain
                            }
                            nftStakeable={keychain.stakeable}
                          />
                        ))}
                    </SimpleGrid>
                    <HeadingFive order={3} mt={48}>
                      YOUR SUPERIOR KEYCHAINS
                    </HeadingFive>
                    {stakerInventory.superiorKeychainData &&
                      stakerInventory.superiorKeychainData.length === 0 && (
                        <Text>
                          No Superior Keychains owned. You can find them in
                          secondary marketplaces such as OpenSea or Blur.
                        </Text>
                      )}
                    <SimpleGrid
                      my={'md'}
                      spacing={'md'}
                      breakpoints={cardColumnsBreakpoints}
                    >
                      {stakerInventory.superiorKeychainData
                        ?.sort((a, b) => a.tokenID - b.tokenID)
                        .map((superiorKeychain) => (
                          // 'key' is a reserved keyword
                          // by React. We have to use it when
                          // rendering arrays.
                          <NFTCard
                            showButton={true}
                            key={superiorKeychain.name}
                            nft={superiorKeychain}
                            onSelect={(sKC) => {
                              onSelectKeychain(sKC, true);
                            }}
                            selected={
                              !!comboSelection.superiorKeychain &&
                              comboSelection.superiorKeychain.name ===
                                superiorKeychain.name
                            }
                            absolutelyDisabled={
                              !!comboSelection.superiorKeychain ||
                              selectedKeychains.length > 0
                            }
                            nftStakeable={superiorKeychain.stakeable}
                          />
                        ))}
                    </SimpleGrid>
                  </ScrollArea>
                  <Button
                    size='xl'
                    w='160px'
                    h='50px'
                    mt='md'
                    radius='md'
                    onClick={confirmButtonClick}
                    disabled={confirmButtonDisabled}
                    sx={(theme) => ({
                      backgroundColor: '#42ca9f',
                      ':hover': {
                        transform: 'scale(1.01) translate(1px, -3px)',
                        transitionDuration: '200ms',
                        backgroundColor: '#42ca9f',
                      },
                    })}
                  >
                    <Text size={'lg'}>Confirm</Text>
                  </Button>
                </>
              ) : null}
            </>
          )}
        </>
      )}
    </Flex>
  );
};

export default StakingBox;
