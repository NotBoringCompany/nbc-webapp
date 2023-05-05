import Layout from '@/components/Layout/Layout';
import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { maxSelectedKey } from '@/utils/kosData';
import StakingBox from '@/components/Staking/StakingBox';
import StakingModal from '@/components/Staking/StakingModal';

const StakingPool = ({ stakingPoolData }) => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useMoralis();

  const [stakerInventory, setStakerInventory] = useState(null);
  const [stakerInventoryLoading, setStakerInventoryLoading] = useState(true);
  const [stakerTotalSubpoolPoints, setStakerTotalSubpoolPoints] = useState(0);
  const [totalTokenShare, setTotalTokenShare] = useState(0);
  const [preSubpoolData, setPreSubpoolData] = useState(null);
  const [subpoolComboEligible, setSubpoolComboEligible] = useState(false);
  const [selectedKeyComboType, setSelectedKeyComboType] = useState(null);
  const [comboCount, setComboCount] = useState(0);

  const stakingOngoing =
    new Date().getTime() >= new Date(stakingPoolData?.StartTime).getTime();
  const stakingClosed =
    new Date().getTime() >= new Date(stakingPoolData?.EndTime).getTime();
  const stakingPoolDataExists = stakingPoolData !== null;
  let activeSubpoolsLength;
  let closedSubpoolsLength;

  if (stakingPoolDataExists) {
    activeSubpoolsLength = stakingPoolData?.ActiveSubpools?.length ?? 0;
    closedSubpoolsLength = stakingPoolData?.ClosedSubpools?.length ?? 0;
  }

  const getStakerInventory = async () => {
    const rawRes = await fetch(
      // `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/${
      //   user && user.attributes.ethAddress
      // }/${id}`
      `https://run.mocky.io/v3/f0ffba98-3091-4d1e-bbf9-472d51afa790`
    );
    const res = await rawRes.json();

    setStakerInventory(res?.data?.inventory ?? null);
    setStakerInventoryLoading(false);
    console.log('staker inventory set');
  };

  const getStakerTotalSubpoolPoints = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/staker-total-subpool-points/${
        user && user.attributes.ethAddress
      }/${id}`
    );
    const res = await rawRes.json();

    setStakerTotalSubpoolPoints(res?.data?.totalSubpoolPoints ?? 0);
  };

  const getTotalTokenShare = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/calculate-total-token-share/${
        user && user.attributes.ethAddress
      }/${id}`
    );
    const res = await rawRes.json();

    setTotalTokenShare(res?.data?.totalTokenShare ?? 0);
  };

  const checkSubpoolComboEligibility = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/check-subpool-combo-eligiblity/${
        user && user.attributes.ethAddress
      }/${id}/${comboCount}`
    );
    const res = await rawRes.json();

    const eligible = res?.data?.isEligible === true ? true : false;
    console.log('eligible', eligible);
    setSubpoolComboEligible(eligible);
  };

  useEffect(() => {
    if (user) {
      getStakerInventory();
      getStakerTotalSubpoolPoints();
      getTotalTokenShare();
    }
  }, [user]);

  useEffect(() => {
    checkSubpoolComboEligibility();
  }, [comboCount]);

  const [comboSelection, setComboSelection] = useState({
    keys: [],
    keychains: [],
    superiorKeychain: null,
  });

  const [showStakingModal, setShowStakingModal] = useState(false);

  const [loadingStakingRewardAndPoints, setLoadingStakingRewardAndPoints] =
    useState(true);

  const confirmButtonDisabled =
    comboSelection.keys.length !== maxSelectedKey(selectedKeyComboType);

  const handleSelectKey = (rhKey) => {
    const exist =
      comboSelection.keys.findIndex((key) => key.name === rhKey.name) >= 0;
    if (!exist) {
      const keys = [...comboSelection.keys, rhKey];
      setComboSelection({ ...comboSelection, keys });
    } else {
      const keys = [...comboSelection.keys].filter(
        (key) => key.name !== rhKey.name
      );
      setComboSelection({ ...comboSelection, keys });
    }
  };

  const handleSelectKeychain = (selectedNFT, isSuperior = false) => {
    if (isSuperior) {
      const exist = !!comboSelection.superiorKeychain; // is not null
      if (!exist) {
        setComboSelection({ ...comboSelection, superiorKeychain: selectedNFT });
      } else {
        setComboSelection({ ...comboSelection, superiorKeychain: null });
      }
      return;
    }

    if (!isSuperior) {
      const alreadySelectedKeychainIds = [...comboSelection.keychains];

      const keyChainIndex = alreadySelectedKeychainIds.findIndex(
        (keychain) => keychain.tokenID === selectedNFT.tokenID
      );

      //user already selects this key (exists in the user's selected keychain)
      const keyChainAlreadySelected = keyChainIndex >= 0;
      if (!keyChainAlreadySelected) {
        //appending selectedNFT into the "keychains" array
        setComboSelection({
          ...comboSelection,
          keychains: [...alreadySelectedKeychainIds, selectedNFT],
        });
      } else {
        //deselect key
        alreadySelectedKeychainIds.splice(keyChainIndex, 1);
        setComboSelection({
          ...comboSelection,
          keychains: alreadySelectedKeychainIds,
        });
      }
      return;
    }
  };
  const handleSelectKeyComboType = (e) => {
    setSelectedKeyComboType(e);
    const maxSelectedKeys = maxSelectedKey(e);
    setComboCount(maxSelectedKeys);

    //If there's more keys selected than
    //what's allowed in the selected key combo type
    if (comboSelection.keys.length > maxSelectedKeys) {
      const keys = [...comboSelection.keys].slice(0, maxSelectedKeys);
      setComboSelection({ ...comboSelection, keys });
    }

    // remove any extra selected keychain except one, if
    // previously user selected more than 1 keychains.
    // (this is possible if user had selected 'flush'
    // before changing their combo type to something lower)
    if (comboSelection.keychains.length > 1 && e !== 'flush') {
      const nonRemovedKeychain = comboSelection.keychains[0]; // keychain that we "preserve" / "save"
      setComboSelection({ ...comboSelection, keychains: [nonRemovedKeychain] });
    }
  };

  const handleConfirmButton = async () => {
    if (!confirmButtonDisabled) {
      //launches modal
      setShowStakingModal(true);

      // fetch the key token ids for the key combo
      const tokenIds = comboSelection.keys.map((key) => key.tokenID);
      const tokenIdsStr = tokenIds.join(',');

      const keychainIdsStr =
        comboSelection.keychains.length > 0
          ? comboSelection.keychains.map((k) => k.tokenID).join(',')
          : -1;
      const superiorKeychainId = comboSelection.superiorKeychain
        ? comboSelection.superiorKeychain.tokenID
        : -1;

      //TODO: fetches API to get the rewards and points for
      // the selected key combo (subpool)
      const subpoolRewardRawRes = await fetch(
        `https://nbc-webapp-api-production.up.railway.app/kos/fetch-token-pre-add-subpool-data/?stakingPoolId=${id}&keyIds=${tokenIdsStr}&keychainIds=${keychainIdsStr}&superiorKeychainId=${superiorKeychainId}`,
        {
          method: 'GET',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      );
      const subpoolRewardRes = await subpoolRewardRawRes?.json();
      setPreSubpoolData(subpoolRewardRes?.data?.tokenPreAddSubpoolData ?? null);

      setLoadingStakingRewardAndPoints(true);
      setTimeout(() => {
        setLoadingStakingRewardAndPoints(false);
      }, 2000);
    }
  };

  const stakerCount = () => {
    const stakers = [];
    // filter through both active and closed subpools and add stakers to stakers array
    // if staker is already in stakers array, don't add them
    if (activeSubpoolsLength > 0) {
      stakingPoolData.ActiveSubpools.forEach((subpool) => {
        if (!stakers.includes(subpool.Staker)) {
          stakers.push(subpool.Staker);
        }
      });
    }

    if (closedSubpoolsLength > 0) {
      stakingPoolData.ClosedSubpools.forEach((subpool) => {
        if (!stakers.includes(subpool.Staker)) {
          stakers.push(subpool.Staker);
        }
      });
    }

    return stakers.length;
  };
  return (
    <Layout withAuth>
      <Flex direction='column' align='center' justify='center'>
        <Text
          sx={(theme) => ({
            fontSize: 72,
            fontWeight: 700,
            color: '#42ca9f',
          })}
        >
          Staking Pool {id}
        </Text>
        <Button
          h={'5vh'}
          onClick={() => router.replace('/staking/my-subpools')}
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            ':hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
              backgroundColor: '#42ca9f',
            },
          })}
        >
          <Text size={24}>View my subpools</Text>
        </Button>
      </Flex>
      {!stakingPoolDataExists && (
        <Flex direction='column' align='center' justify='center'>
          <Box
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              minWidth: '50%',
              border: '2px solid #ca4242',
              padding: '20px',
              textAlign: 'center',
              marginTop: 15,
            })}
          >
            <Flex direction='row' align='center' justify='center'>
              <IconAlertOctagon
                color='#ca4242'
                size={40}
                style={{ marginRight: 10 }}
              />
              <Text
                sx={(theme) => ({
                  fontSize: 40,
                  color: '#ca4242',
                  fontWeight: 700,
                })}
              >
                STAKING PAGE NOT AVAILABLE
              </Text>
            </Flex>
            <Text size='lg'>
              This staking pool might not exist or is not available.
            </Text>
          </Box>
        </Flex>
      )}
      {stakingPoolDataExists && (
        <Flex direction='row' align='center' justify='center'>
          <Box
            sx={(theme) => ({
              border: '3px solid #42ca9f',
              marginTop: 80,
              borderRadius: theme.radius.md,
              // textAlign: 'center',
              padding: 20,
              minWidth: '30%',
              marginRight: 50,
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
                STAKING POOL DATA
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
              <Text c='#42ca9f' size={20} weight={600}>
                ENTRY:{' '}
                {new Date(stakingPoolData.EntryAllowance).toLocaleString()}
              </Text>
              <Text c='#42ca9f' size={20} weight={600}>
                STARTS: {new Date(stakingPoolData.StartTime).toLocaleString()}
              </Text>
              <Text c='#42ca9f' size={20} weight={600}>
                ENDS: {new Date(stakingPoolData.EndTime).toLocaleString()}
              </Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  TOTAL POOL REWARD
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>
                {stakingPoolData.Reward.Amount} {stakingPoolData.Reward.Name}
              </Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  TOTAL SUBPOOL POINTS
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>{stakingPoolData.TotalYieldPoints} points</Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  TOTAL SUBPOOLS
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>
                {activeSubpoolsLength + closedSubpoolsLength} subpool(s)
              </Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  TOTAL STAKERS
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>{stakerCount()} staker(s)</Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  YOUR SUBPOOL POINTS
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>{stakerTotalSubpoolPoints} points</Text>
            </Flex>
            <Flex
              direction='column'
              sx={(theme) => ({
                marginBottom: 20,
              })}
            >
              <Flex direction='row' align='center'>
                <IconAlertOctagon color='#42ca9f' style={{ marginRight: 10 }} />
                <Text size={20} weight={600}>
                  YOUR TOTAL REWARD SHARE
                </Text>
              </Flex>
              <Flex style={{ marginBottom: 10 }}>
                <Divider
                  color='#42ca9f'
                  style={{ width: '80%', marginRight: '10%' }}
                />
              </Flex>
              <Text>
                {totalTokenShare} {stakingPoolData.Reward.Name}
              </Text>
            </Flex>
          </Box>
          <StakingModal
            stakingPoolId={id}
            showStakingModal={showStakingModal}
            onCloseStakingModal={() => setShowStakingModal(false)}
            subpool={comboSelection}
            loadingStakingRewardAndPoints={loadingStakingRewardAndPoints}
            preSubpoolData={preSubpoolData}
          />
          <StakingBox
            selectedKeyCombo={selectedKeyComboType}
            onSelectKey={handleSelectKey}
            onSelectKeychain={handleSelectKeychain}
            onSelectKeyComboType={handleSelectKeyComboType}
            currentComboAllowed={subpoolComboEligible}
            stakerInventoryLoading={stakerInventoryLoading}
            stakerInventory={stakerInventory}
            comboSelection={comboSelection}
            confirmButtonClick={handleConfirmButton}
            confirmButtonDisabled={confirmButtonDisabled}
            stakingOngoing={stakingOngoing}
            stakingClosed={stakingClosed}
          />
        </Flex>
      )}
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const stakingPoolDataRawRes = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/staking-pool-data/${id}`,
    {
      method: 'GET',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }
  );
  const stakingPoolDataRes = await stakingPoolDataRawRes.json();

  // checks if staking pool data exists or not. if yes, check if `data.stakingPoolData` exists. if not, return null.
  const stakingPoolData = stakingPoolDataRes?.data?.stakingPoolData ?? null;

  return {
    props: {
      stakingPoolData,
    },
  };
}

export default StakingPool;
