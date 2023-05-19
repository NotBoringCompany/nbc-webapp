import Layout from '@/components/Layout/Layout';
import { Button, Flex, Text, createStyles } from '@mantine/core';
import { IconAlertOctagon } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { maxSelectedKey } from '@/utils/kosData';
import StakingBox from '@/components/Staking/StakingBox';
import StakingModal from '@/components/Staking/StakingModal';
import BorderedBox from '@/components/BorderedBox/BorderedBox';
import StakingPoolDataDetail from '@/components/Staking/StakingPool/StakingPoolDataDetail';
import { HeadingOne } from '@/components/Typography/Headings';
import WarningBox from '@/components/Layout/WarningBox';

const useStyles = createStyles((theme) => ({
  container: {
    marginTop: 48,
    alignItems: 'start',
    justifyContent: 'center',
    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  stakingPoolDetailBox: {
    marginRight: 48,
    width: '40%',
    [theme.fn.smallerThan('md')]: {
      width: '100%',
      marginRight: 0,
      marginTop: 32,
    },
  },
}));

const StakingPool = ({ stakingPoolData }) => {
  const router = useRouter();
  const { classes } = useStyles();
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
      `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/${user?.attributes?.ethAddress}/${id}`
    ).catch((err) => console.log(err));
    const res = await rawRes.json();

    setStakerInventory(res?.data?.inventory ?? null);
    setStakerInventoryLoading(false);
    console.log('staker inventory set');
  };

  const getStakerTotalSubpoolPoints = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/staker-total-subpool-points/${user?.attributes?.ethAddress}/${id}`
    );
    const res = await rawRes.json();

    setStakerTotalSubpoolPoints(res?.data?.totalSubpoolPoints ?? 0);
    console.log('staker total subpool points set');
  };

  const getTotalTokenShare = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/calculate-total-token-share/${user?.attributes?.ethAddress}/${id}`
    );
    const res = await rawRes.json();

    setTotalTokenShare(res?.data?.totalTokenShare ?? 0);
    console.log('total token share set');
  };

  const checkSubpoolComboEligibility = async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/check-subpool-combo-eligiblity/${user?.attributes?.ethAddress}/${id}/${comboCount}`
    );
    const res = await rawRes.json();

    const eligible = res?.data?.isEligible === true ? true : false;
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

  const selectedCorrectNumberOfKeys =
    comboSelection.keys.length === maxSelectedKey(selectedKeyComboType);

  const selectedNorZeroOrThreeKeychains =
    comboSelection.keychains.length !== 0 &&
    comboSelection.keychains.length !== 3;

  const confirmButtonDisabled =
    selectedKeyComboType === 'flush'
      ? !selectedCorrectNumberOfKeys || selectedNorZeroOrThreeKeychains
      : !selectedCorrectNumberOfKeys;

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
        //appending selectedNFT into the `keychains` array
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
    // previously user selected more than 1 keychain
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
    <Layout
      pageTitle={`Staking Pool #${id}`}
      withAuth
      showNotFound={!stakingPoolDataExists}
      notFoundTitle='STAKING PAGE NOT AVAILABLE'
      notFoundDescription='This staking pool might not exist or is not available.'
    >
      <Flex direction={'column'} w='100%'>
        {stakingPoolDataExists && (
          <>
            <Flex direction='column' align='center' justify='center'>
              <HeadingOne mb='md'>Staking Pool {id}</HeadingOne>
              <Button
                h={'56px'}
                onClick={() => router.replace('/staking/my-subpools')}
                sx={(theme) => ({
                  backgroundColor: '#42ca9f',
                  transitionDuration: '200ms',
                  ':hover': {
                    transform: 'scale(1.01) translate(1px, -3px)',
                    backgroundColor: '#42ca9f',
                  },
                })}
              >
                <Text size={24}>View my subpools</Text>
              </Button>
            </Flex>
            <Flex className={classes.container}>
              <StakingPoolDataDetail
                stakingPoolData={stakingPoolData}
                activeSubpoolsLength={activeSubpoolsLength}
                closedSubpoolsLength={closedSubpoolsLength}
                stakerTotalSubpoolPoints={stakerTotalSubpoolPoints}
                totalTokenShare={totalTokenShare}
                stakerCount={stakerCount()}
                className={classes.stakingPoolDetailBox}
              />
              <StakingModal
                stakingPoolId={id}
                showStakingModal={showStakingModal}
                onCloseStakingModal={() => {
                  setShowStakingModal(false);
                  setPreSubpoolData(null);
                }}
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
          </>
        )}
      </Flex>
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
