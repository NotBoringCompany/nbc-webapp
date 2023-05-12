import Layout from '@/components/Layout/Layout';
import Subpool from '@/components/Staking/Subpool/Subpool';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMoralis } from 'react-moralis';

const MySubpool = ({
  subpoolData,
  subpoolTokenShare,
  stakingPoolData,
  backtrackSubpoolPoints,
}) => {
  const router = useRouter();
  const { stakingPoolId, id } = router.query;
  const subpoolDataExists = subpoolData !== null;
  const { user } = useMoralis();

  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [unstakeLoading, setUnstakeLoading] = useState(false);
  const [unstakeDone, setUnstakeDone] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimDone, setClaimDone] = useState(false);

  const userOwnsThisSubpool =
    user &&
    user.attributes.ethAddress.toLowerCase() ===
    subpoolData?.stakerWallet?.toLowerCase();

  const handleUnstake = async () => {
    setUnstakeLoading(true);
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/unstake-from-subpool`,
      {
        method: 'POST',
        headers: {
          'session-token': user && user.get('sessionToken'),
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet: user?.attributes?.ethAddress,
          stakingPoolId: parseInt(stakingPoolId),
          subpoolId: parseInt(id),
        }),
      }
    );

    const res = await rawRes.json();

    setTimeout(() => {
      setUnstakeDone(true);
      setTimeout(() => {
        router.replace('/staking/my-subpools');
      }, 2000);
    }, 2000);
  };

  const handleClaimReward = async () => {
    setClaimLoading(true);
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/claim-reward`,
      {
        method: 'POST',
        headers: {
          'session-token': user && user.get('sessionToken'),
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet: user?.attributes?.ethAddress,
          stakingPoolId: parseInt(stakingPoolId),
          subpoolId: parseInt(id),
        }),
      }
    );

    const res = await rawRes.json();

    setTimeout(() => {
      setClaimDone(true);
      setTimeout(() => {
        router.replace('/staking/my-subpools');
      }, 2000);
    });
  };

  const handleClaimModal = () => {
    setShowClaimModal(!showClaimModal);
  };

  const handleUnstakeModal = () => {
    setShowUnstakeModal(!showUnstakeModal);
  };

  return (
    <Layout
      pageTitle={`Subpool #${id} - Staking pool #${stakingPoolId}`}
      withAuth
    >
      <Subpool
        subpoolDataExists={subpoolDataExists}
        subpoolData={subpoolData}
        stakingPoolData={stakingPoolData}
        stakingPoolId={stakingPoolId}
        subpoolId={id}
        userOwnsThisSubpool={userOwnsThisSubpool}
        backtrackSubpoolPoints={backtrackSubpoolPoints}
        subpoolTokenShare={subpoolTokenShare}
        showClaimModal={showClaimModal}
        claimDone={claimDone}
        handleClaimReward={handleClaimReward}
        claimLoading={claimLoading}
        showUnstakeModal={showUnstakeModal}
        unstakeDone={unstakeDone}
        handleUnstake={handleUnstake}
        unstakeLoading={unstakeLoading}
        setShowClaimModal={setShowClaimModal}
        setShowUnstakeModal={setShowUnstakeModal}
        handleClaimModal={handleClaimModal}
        handleUnstakeModal={handleUnstakeModal}
      />
    </Layout>
  );
};

export async function getServerSideProps(ctx) {
  const { stakingPoolId, id } = ctx.params;

  const subpoolDataRawRes = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/fetch-subpool-data/${stakingPoolId}/${id}`
  );
  const subpoolDataRes = await subpoolDataRawRes.json();
  const subpoolData = subpoolDataRes?.data?.subpoolData ?? null;

  const subpoolTokenShareRawRes = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/calculate-subpool-token-share/${stakingPoolId}/${id}`
  );
  const subpoolTokenShareRes = await subpoolTokenShareRawRes.json();
  const subpoolTokenShare =
    subpoolTokenShareRes?.data?.subpoolTokenShare ?? null;

  const stakingPoolDataRawRes = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/staking-pool-data/${stakingPoolId}`
  );
  const stakingPoolDataRes = await stakingPoolDataRawRes.json();
  const stakingPoolData = stakingPoolDataRes?.data?.stakingPoolData ?? null;

  const backtrackSubpoolPointsRawRes = await fetch(
    `https://nbc-webapp-api-production.up.railway.app/kos/backtrack-subpool-points/${stakingPoolId}/${id}`
  );
  const backtrackSubpoolPointsRes = await backtrackSubpoolPointsRawRes.json();
  const backtrackSubpoolPoints =
    backtrackSubpoolPointsRes?.data?.backtrackSubpoolPoints ?? null;

  return {
    props: {
      subpoolData,
      subpoolTokenShare,
      stakingPoolData,
      backtrackSubpoolPoints,
    },
  };
}

export default MySubpool;
