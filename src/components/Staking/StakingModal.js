import { useEffect, useState } from 'react';
import {
	Modal,
	SimpleGrid,
	Text,
	Flex,
	Button,
	Box,
	Collapse,
	Loader,
	Divider,
	Center,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NFTCardPreview from './NFTCardPreview';
import { useRouter } from 'next/router';

const StakingModal = ({
	showStakingModal,
	onCloseStakingModal,
	subpool,
	loadingStakingRewardAndPoints,
	preSubpoolData
}) => {
	const cardColumnsBreakpoints = [
		{ maxWidth: 'xl', cols: 3, spacing: 'md' },
		{ minWidth: 'md', cols: 3, spacing: 'md' },
		{ maxWidth: 'xs', cols: 3, spacing: 'md' },
	];

	const { reload, push } = useRouter();
	const [opened, { toggle }] = useDisclosure(false);
	const [loadingStaking, setLoadingStaking] = useState(false);
	const [successfulStake, setSuccessfulStake] = useState(false);

	const keychain = subpool.keychain;
	const superiorKeychain = subpool.superiorKeychain;

	const handleStakingButtonClick = async () => {
		setLoadingStaking(true);
		setTimeout(() => {
			setSuccessfulStake(true);
		}, 2800);
	};

	const stakingPreview = (
		<Flex
			direction='column'
			justify='center'
			align='center'
			sx={(theme) => ({
				textAlign: 'center',
			})}
		>
			{loadingStakingRewardAndPoints ? (
					<Loader color='#42ca9f' />
			) : (
				<>
					<Text color='#42ca9f' size={24}>STAKING POOL TOTAL REWARD</Text>
					<Divider color='#42ca9f' size='xs' sx={{marginBottom: 5}} variant='dashed' />
					<Text style={{marginBottom: 20}}>{preSubpoolData.poolTotalReward} {preSubpoolData.poolRewardName}</Text>
					<Text color='#42ca9f' size={24}>TOTAL SUBPOOL POINTS GENERATED</Text>
					<Text size='sm' color='#42ca9f'>
						<i>
							*this includes this subpool{"'"}s points.
						</i>
					</Text>
					<Divider color='#42ca9f' size='xs' sx={{marginBottom: 5}} variant='dashed' />
					<Text style={{marginBottom: 20}}>{preSubpoolData.newTotalPoolPoints} POINTS</Text>
					<Text color='#42ca9f' size={24}>WITH YOUR COMBO, YOU WILL EARN</Text>
					<Divider color='#42ca9f' size='xs' sx={{marginBottom: 5}} variant='dashed' />
					<Text style={{marginBottom: 20}}>{preSubpoolData.comboSum} POINTS {'<->'} {preSubpoolData.tokenShare} {preSubpoolData.poolRewardName}</Text>
					<Text size='sm' my='md' color='#42ca9f'>
						<i>
							*please bear in mind that this number will decrease as more users
							stake.
						</i>
					</Text>
				</>
			)}

			<Box>
				<Text
					sx={{
						textDecoration: 'underline',
						':hover': {
							cursor: 'pointer',
						},
					}}
					onClick={toggle}
				>
					{opened ? 'Hide' : 'See'} your selected combination for this subpool
				</Text>
				<Collapse in={opened}>
					<Flex
						sx={{
							border: '2px solid #42ca9f',
							maxHeight: '200px',
							overflowY: 'auto',
						}}
						p={'sm'}
						mt='md'
						direction='column'
					>
						<SimpleGrid breakpoints={cardColumnsBreakpoints}>
							{subpool.keys.map((key) => (
								<NFTCardPreview key={key.name} nft={key} />
							))}
							{!!keychain ? <NFTCardPreview nft={keychain} /> : null}
							{!!superiorKeychain ? (
								<NFTCardPreview nft={superiorKeychain} />
							) : null}
						</SimpleGrid>
					</Flex>
				</Collapse>
				<Button
					w='160px'
					h='50px'
					mt='md'
					radius='md'
					onClick={handleStakingButtonClick}
					disabled={loadingStakingRewardAndPoints || loadingStaking}
					sx={(theme) => ({
						backgroundColor: '#42ca9f',
						':hover': {
							transform: 'scale(1.01) translate(1px, -3px)',
							transitionDuration: '200ms',
							backgroundColor: '#42ca9f',
						},
					})}
				>
					{loadingStaking ? (
						<Loader color='grey' />
					) : (
						<Text size={'lg'}>Stake</Text>
					)}
				</Button>
			</Box>
		</Flex>
	);

	const successContent = (
		<Flex 
			direction={'column'}
			align='center'
		>
			<Text size='lg' my='md' color='#42ca9f'>
				Congratulations, staking was <strong>successful!</strong>
			</Text>

			<Flex mt='md'>
				<Button
					w='200px'
					h='50px'
					mr='md'
					radius='md'
					variant='outline'
					sx={(theme) => ({
						color: theme.colors.nbcGreen[0],
						borderColor: theme.colors.nbcGreen[0],
					})}
					onClick={reload}
				>
					<Text size={'sm'}>Stake again</Text>
				</Button>

				<Button
					w='200px'
					h='50px'
					radius='md'
					variant='outline'
					sx={(theme) => ({
						color: theme.colors.nbcGreen[0],
						borderColor: theme.colors.nbcGreen[0],
					})}
					onClick={() => push('/my-subpools')}
				>
					<Text size={'sm'}>See your subpools</Text>
				</Button>
			</Flex>
		</Flex>
	);

	return (
		<Modal
			opened={showStakingModal}
			centered
			onClose={onCloseStakingModal}
			size={'xl'}
			closeOnEscape={!successfulStake}
			withCloseButton={!successfulStake}
			closeOnClickOutside={!successfulStake}
			title={
				successfulStake
				? 'Successful Staking'
				: 'Preview of Your Staking Subpool'
			}
		>
			{successfulStake ? successContent : stakingPreview}
		</Modal>
	);
};

export default StakingModal;
