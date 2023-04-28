import Layout from '@/components/Layout/Layout';
import { Box, Button, Divider, Flex, Text } from '@mantine/core';
import { IconAlertOctagon, IconMinusVertical } from '@tabler/icons';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import maxSelectedKey from '@/utils/maxSelectedKey';
import StakingBox from '@/components/Staking/StakingBox';
import StakingModal from '@/components/Staking/StakingModal';

const StakingPool = ({stakingPoolData}) => {
    const router = useRouter();
    const { id } = router.query;
    const { user } = useMoralis();

    const [stakerInventory, setStakerInventory] = useState(null);
    const [stakerTotalSubpoolPoints, setStakerTotalSubpoolPoints] = useState(0);
    const [totalTokenShare, setTotalTokenShare] = useState(0);

    const stakingPoolDataExists = stakingPoolData !== null;
    let activeSubpoolsLength;
    let closedSubpoolsLength;

    if (stakingPoolDataExists) {
        activeSubpoolsLength = stakingPoolData.ActiveSubpools !== null ? stakingPoolData.ActiveSubpools.length : 0
        closedSubpoolsLength = stakingPoolData.ClosedSubpools !== null ? stakingPoolData.ClosedSubpools.length : 0
    }

    const getStakerInventory = async () => {
        const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/${user && user.attributes.ethAddress}/${id}`);
        const res = await rawRes.json();

        setStakerInventory(res.data ? res.data.inventory : null);
        console.log('staker inventory set');
    }

    const getStakerTotalSubpoolPoints = async () => {
        const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/staker-total-subpool-points/${user && user.attributes.ethAddress}/${id}`)
        const res = await rawRes.json();

        setStakerTotalSubpoolPoints(res.data ? res.data.totalSubpoolPoints : 0);
        console.log('staker total subpool points set');
    }

    const getTotalTokenShare = async () => {
        const rawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/calculate-total-token-share/${user && user.attributes.ethAddress}/${id}`)
        const res = await rawRes.json();

        setTotalTokenShare(res.data ? res.data.totalTokenShare : 0);
        console.log('total token share set');
    }

    useEffect(() => {
        if (user) {
            getStakerInventory();
            getStakerTotalSubpoolPoints();
            getTotalTokenShare();
        }
    }, [user])

    const [selectKeyComboType, setSelectedKeyComboType] = useState(null);
	const [comboSelection, setComboSelection] = useState({
		keys: [],
		keyChain: null,
		superiorKeyChain: null,
	});
	const [showStakingModal, setShowStakingModal] = useState(false);

	const [loadingStakingRewardAndPoints, setLoadingStakingRewardAndPoints] =
		useState(true);

	const maxSelectedK = maxSelectedKey(selectKeyComboType);
	const confirmButtonDisabled = comboSelection.keys.length !== maxSelectedK;
	const handleSelectKey = (rhKey) => {
		const exist =
			comboSelection.keys.findIndex((key) => key.id === rhKey.id) >= 0;
		if (!exist) {
			const keys = [...comboSelection.keys, rhKey];
			setComboSelection({ ...comboSelection, keys });
		} else {
			const keys = [...comboSelection.keys].filter(
				(key) => key.id !== rhKey.id
			);
			setComboSelection({ ...comboSelection, keys });
		}
	};

	const handleSelectKeyChain = (selectedNFT, isSuperior = false) => {
		const exist = isSuperior
			? !!comboSelection.superiorKeyChain
			: !!comboSelection.keyChain; // is not null
		const nft = isSuperior ? 'superiorKeyChain' : 'keyChain';
		if (!exist) {
			setComboSelection({ ...comboSelection, [nft]: selectedNFT });
		} else {
			setComboSelection({ ...comboSelection, [nft]: null });
		}
	};
	const handleSelectKeyComboType = (e) => {
		setSelectedKeyComboType(e);
		const maxSelectedKeys = maxSelectedKey(e);

		//If there's more keys selected then
		//what's allowed in the selected key combo type
		if (comboSelection.keys.length > maxSelectedKeys) {
			const keys = [...comboSelection.keys].slice(0, maxSelectedKeys);
			setComboSelection({ ...comboSelection, keys });
		}

		// if combo not 'flush'
		// but a superior keychain has been selected
		if (e !== 'flush' && !!comboSelection.superiorKeyChain) {
			setComboSelection({ ...comboSelection, superiorKeyChain: null });
		}
	};

	const handleConfirmButton = () => {
		if (!confirmButtonDisabled) {
			//launches modal
			setShowStakingModal(true);

			//TODO: fetches API to get the rewards and points for
			// the selected key combo (subpool)
			setLoadingStakingRewardAndPoints(true);
			setTimeout(() => {
				setLoadingStakingRewardAndPoints(false);
			}, 1500);
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
            })
        }

        if (closedSubpoolsLength > 0) {
            stakingPoolData.ClosedSubpools.forEach((subpool) => {
                if (!stakers.includes(subpool.Staker)) {
                    stakers.push(subpool.Staker);
                }
            })
        }

        return stakers.length;
    }
    return (
        <Layout withAuth>
            {!stakingPoolDataExists && (
                <Flex direction='column' align='center' justify='center'>
                    <Box
                        sx={(theme) => ({
                            borderRadius: theme.radius.md,
                            width: '50%',
                            border: '2px solid #ca4242',
                            padding: '20px',
                            textAlign: 'center',
                            marginTop: 30,
                        })}
                    >
                        <Flex
                            direction='row'
                            align='center'
                            justify='center'
                        >
                            <IconAlertOctagon color='#ca4242' size={40} style={{marginRight: 10}} />
                            <Text sx={(theme) => ({
                                fontSize: 40,
                                color: '#ca4242',
                                fontWeight: 700
                            })}>
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
                <Flex
                direction='row'
                align='center'
                justify='center'
                >
                    <Box
                        sx={(theme) => ({
                            border: '3px solid #42ca9f',
                            marginTop: 80,
                            borderRadius: theme.radius.md,
                            // textAlign: 'center',
                            padding: 20,
                            width: '30%',
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
                            {/* <IconMinusVertical size={60} color='#42ca9f' /> */}
                            <Text sx={(theme) => ({
                                fontSize: 40,
                                fontWeight: 700,
                                color: '#42ca9f'
                            })}>
                                \ Staking Pool {id} {'/'}
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
                            <Text c='#42ca9f' size={20} weight={600}>ENTRY: {new Date(stakingPoolData.EntryAllowance).toLocaleString()}</Text>
                            <Text c='#42ca9f' size={20} weight={600}>STARTS: {new Date(stakingPoolData.StartTime).toLocaleString()}</Text>
                            <Text c='#42ca9f' size={20} weight={600}>ENDS: {new Date(stakingPoolData.EndTime).toLocaleString()}</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL POOL REWARD</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakingPoolData.Reward.Amount} {stakingPoolData.Reward.Name}</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL SUBPOOL POINTS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakingPoolData.TotalYieldPoints} points</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL SUBPOOLS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{activeSubpoolsLength + closedSubpoolsLength} subpool(s)</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>TOTAL STAKERS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakerCount()} staker(s)</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>YOUR SUBPOOL POINTS</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{stakerTotalSubpoolPoints} points</Text>
                        </Flex>
                        <Flex
                            direction='column'
                            sx={(theme) => ({
                                marginBottom: 20,
                            })}
                        >
                            <Flex
                                direction='row'
                                align='center'
                            >
                                <IconAlertOctagon color='#42ca9f' style={{marginRight: 10}} />
                                <Text size={20} weight={600}>YOUR TOTAL REWARD SHARE</Text>
                            </Flex>
                            <Flex style={{marginBottom: 10}}>
                                <Divider color='#42ca9f' style={{ width: '80%', marginRight: '10%' }} />
                            </Flex>
                            <Text>{totalTokenShare} {stakingPoolData.Reward.Name}</Text>
                        </Flex>
                    </Box>
                    {/* <StakingModal
                        showStakingModal={showStakingModal}
                        onCloseStakingModal={() => setShowStakingModal(false)}
                        subpool={comboSelection}
                        loadingStakingRewardAndPoints={loadingStakingRewardAndPoints}
                    />
                    <Flex 
                        direction={'column'}
                        align='center'
                    >
                        <StakingBox
                            selectedKeyCombo={selectKeyComboType}
                            onSelectKey={handleSelectKey}
                            onSelectKeyChain={handleSelectKeyChain}
                            onSelectKeyComboType={handleSelectKeyComboType}
                            nfts={data}
                            comboSelection={comboSelection}
                        />
                        <Button
                            w='160px'
                            h='50px'
                            mt='md'
                            radius='md'
                            onClick={handleConfirmButton}
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
                    </Flex> */}
                    {/* <Box
                        sx={(theme) => ({
                            border: '3px solid',
                            marginTop: 80,
                            borderRadius: theme.radius.xl,
                            textAlign: 'center',
                            width: '50%'
                        })}
                    >
                        <Text c='#42ca9f' size={60} weight={700}>STAKE</Text>
                    </Box> */}
                </Flex>
            )}
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    const stakingPoolDataRawRes = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/staking-pool-data/${id}`, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    });
    const stakingPoolDataRes = await stakingPoolDataRawRes.json();

    // checks if staking pool data exists or not. if yes, check if `data.stakingPoolData` exists. if not, return null.
    const stakingPoolData = stakingPoolDataRes
        ? stakingPoolDataRes.data !== null
            ? stakingPoolDataRes.data.stakingPoolData != null
                ? stakingPoolDataRes.data.stakingPoolData
                : null
            : null
        : null;

    return {
        props: {
            stakingPoolData
        }
    }
}

export default StakingPool