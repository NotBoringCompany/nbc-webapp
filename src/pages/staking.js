import { useEffect, useState } from 'react';
import { Badge, Box, Button, Divider, Flex, ScrollArea, Select, Text } from '@mantine/core';
import StakingBox from '@/components/Staking/StakingBox';
import maxSelectedKey from '@/utils/maxSelectedKey';
import Layout from '@/components/Layout/Layout';
import StakingModal from '@/components/Staking/StakingModal';
import { useMoralis } from 'react-moralis';
import RECToken from '../../public/recToken.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Staking({ data, stakingPoolData }) {
	const router = useRouter();

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

	const stakeablePools = stakingPoolData.stakeablePools;
	const ongoingPools = stakingPoolData.ongoingPools;
	const closedPools = stakingPoolData.closedPools;

	return (
		<Layout withAuth>
			<Flex
				direction='column'
				align='center'
				sx={(theme) => ({
					marginTop: 40,
				})}
			>
				<Text c='#42ca9f' size={60} weight={700}>STAKING POOLS</Text>
				<Text size={24}>Stake your Factory NFTs to earn special yields.</Text>
				<Box
					sx={(theme) => ({
						border: '3px solid #42ca9f',
						marginTop: 80,
						borderRadius: theme.radius.xl,
						textAlign: 'center',
						minWidth: '90%'
					})}
				>
					<Text sx={{marginTop: 25, marginBottom: 5}} size={24} weight={600}>ACTIVE STAKING POOLS</Text>
					<Flex
						justify='center'
					>
						<Divider color='#42ca9f' style={{ width: '20%', marginLeft: '40%', marginRight: '40%' }} />
					</Flex>
					{!stakeablePools && !ongoingPools && (
						<Text size={20} style={{marginTop: 30, marginBottom: 30 }}>There are currently no active staking pools to stake in.</Text>
					)}
					{stakeablePools && stakeablePools.map(pool => (
						<>
							<Flex
								justify='center'
							>
								<Divider color='#42ca9f' style={{ width: '20%', marginLeft: '40%', marginRight: '40%' }} />
							</Flex>
							<Flex
								direction='row'
								align='center'
								sx={(theme) => ({
									padding: '20px 20px',
								})}
							>
								<Image src={RECToken} width={60} alt='recToken' />
								<Text size={24} weight={700} sx={{marginLeft: 20, marginRight: 20}}>REC Token</Text>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Staking Pool ID</Text>
									<Text>{pool.StakingPoolID}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20, marginBottom: 5}}>Status</Text>
									<Badge c='#42ca9f'>ONGOING</Badge>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Reward</Text>
									<Text>{pool.Reward.Amount}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpools</Text>
									<Text>{(pool.ActiveSubpools !== null ? pool.ActiveSubpools.length : 0) + (pool.ClosedSubpools !== null ? pool.ClosedSubpools.length : 0)}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpool Points</Text>
									<Text>{pool.TotalYieldPoints}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Subpool Points</Text>
									<Text>TODO</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Reward Share</Text>
									<Text>TODO</Text>
								</Flex>
								<Button 
									sx={(theme) => ({
										backgroundColor: '#42ca9f',
										':hover': {
											transform: 'scale(1.01) translate(1px, -3px)',
											transitionDuration: '200ms',
											backgroundColor: '#42ca9f',
										}
									})}
									onClick={() => router.push(`/staking/pools/${pool.StakingPoolID}`)}
								>
									Stake
								</Button>
							</Flex>
							{stakingPoolData.activePools.length > 1 && (
								<Divider color='#42ca9f' style={{width: '100%'}} size='sm' variant='dashed' />
							)}
						</>
					))}
					{ongoingPools && ongoingPools.map(pool => (
						<>
							<Flex
								direction='row'
								align='center'
								sx={(theme) => ({
									padding: '20px 20px',
								})}
							>
								<Image src={RECToken} width={60} alt='recToken' />
								<Text size={24} weight={700} sx={{marginLeft: 20, marginRight: 20}}>REC Token</Text>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Staking Pool ID</Text>
									<Text>{pool.StakingPoolID}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20, marginBottom: 5}}>Status</Text>
									<Badge c='#42ca9f'>ONGOING</Badge>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Reward</Text>
									<Text>{pool.Reward.Amount}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpools</Text>
									<Text>{(pool.ActiveSubpools !== null ? pool.ActiveSubpools.length : 0) + (pool.ClosedSubpools !== null ? pool.ClosedSubpools.length : 0)}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpool Points</Text>
									<Text>{pool.TotalYieldPoints}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Subpool Points</Text>
									<Text>TODO</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Reward Share</Text>
									<Text>TODO</Text>
								</Flex>
								<Button 
									sx={(theme) => ({
										backgroundColor: '#42ca9f',
										':hover': {
											transform: 'scale(1.01) translate(1px, -3px)',
											transitionDuration: '200ms',
											backgroundColor: '#42ca9f',
										}
									})}
									onClick={() => router.push(`/staking/pools/${pool.StakingPoolID}`)}
								>
									View Pool
								</Button>
							</Flex>
							{stakingPoolData.ongoingPools.length > 1 && (
								<Divider color='#42ca9f' style={{width: '100%'}} size='sm' variant='dashed' />
							)}
						</>
					))}
				</Box>
				<Box
					sx={(theme) => ({
						border: '3px solid grey',
						marginTop: 80,
						borderRadius: theme.radius.xl,
						color: 'grey',
						textAlign: 'center',
						minWidth: '90%'
					})}
				>
					<Text sx={{marginTop: 25, marginBottom: 5}} size={24} weight={600}>CLOSED STAKING POOLS</Text>
					<Flex
						justify='center'
					>
						<Divider color='grey' style={{ width: '20%', marginLeft: '40%', marginRight: '40%' }} />
					</Flex>
					{closedPools && closedPools.map(pool => (
						<>
							<Flex
								direction='row'
								align='center'
								sx={(theme) => ({
									padding: '20px 20px',
								})}
							>
								<Image src={RECToken} width={60} alt='recToken' />
								<Text size={24} weight={700} sx={{marginLeft: 20, marginRight: 20}}>REC Token</Text>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Staking Pool ID</Text>
									<Text>{pool.StakingPoolID}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20, marginBottom: 5}}>Status</Text>
									<Badge c='grey'>CLOSED</Badge>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Reward</Text>
									<Text>{pool.Reward.Amount}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpools</Text>
									<Text>{(pool.ActiveSubpools !== null ? pool.ActiveSubpools.length : 0) + (pool.ClosedSubpools !== null ? pool.ClosedSubpools.length : 0)}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Total Subpool Points</Text>
									<Text>{pool.TotalYieldPoints}</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Subpool Points</Text>
									<Text>TODO</Text>
								</Flex>
								<Flex direction='column' align='center'>
									<Text size={18} weight={700} sx={{marginLeft: 20, marginRight: 20}}>Your Reward Share</Text>
									<Text>TODO</Text>
								</Flex>
								<Button 
									sx={(theme) => ({
										backgroundColor: '#42ca9f',
										':hover': {
											transform: 'scale(1.01) translate(1px, -3px)',
											transitionDuration: '200ms',
											backgroundColor: '#42ca9f',
										}
									})}
									onClick={() => router.push(`/staking/pools/${pool.StakingPoolID}`)}
								>
									View Pool
								</Button>
							</Flex>
							{stakingPoolData.closedPools.length > 1 && (
								<Divider color='#42ca9f' style={{width: '100%'}} size='sm' variant='dashed' />
							)}
						</>
					))}
				</Box>
			</Flex>
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
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const stakingPoolDataRawResponse = await fetch(`https://nbc-webapp-api-production.up.railway.app/kos/fetch-staking-pools`, {
		method: 'GET',
		headers: {
			'Accept': '*',
			'Content-Type': 'application/json',
		}
	}).catch((err) => console.log(err))
	
	const stakingPoolDataResponse = await stakingPoolDataRawResponse.json();
	const stakingPoolData = stakingPoolDataResponse.data.stakingPools;

	const MOCK_SERVER_RESPONSE_NFTS = {
		keys: [
			{
				id: '6969',
				name: 'Key of Salvation #6969',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '51',
				name: 'Key of Salvation #51',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '123',
				name: 'Key of Salvation #123',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '124124',
				name: 'Key of Salvation #124124',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '21',
				name: 'Key of Salvation #21',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '33',
				name: 'Key of Salvation #33',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '31',
				name: 'Key of Salvation #31',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '91237',
				name: 'Key of Salvation #91237',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
		],
		keyChains: [
			{
				id: '72',
				name: 'Keychain #72',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif',
			},
			{
				id: '77',
				name: 'Keychain #77',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif',
			},
		],
		superiorKeyChains: [
			{
				id: '79822',
				name: 'Superior Keychain #79822',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/a6d28c508c28a967913f28a72a12cf4d.gif',
			},
		],
	};

	return {
		props: {
			data: MOCK_SERVER_RESPONSE_NFTS,
			stakingPoolData,
		},
	};
}
