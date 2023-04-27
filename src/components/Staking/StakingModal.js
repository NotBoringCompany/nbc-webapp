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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import NFTCardPreview from './NFTCardPreview';
import { useRouter } from 'next/router';

const StakingModal = ({
	showStakingModal,
	onCloseStakingModal,
	subpool,
	loadingStakingRewardAndPoints,
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

	const keyChain = subpool.keyChain;
	const superiorKeyChain = subpool.superiorKeyChain;

	const handleStakingButtonClick = () => {
		setLoadingStaking(true);
		//TODO: Call POST request to
		//stake
		setTimeout(() => {
			setSuccessfulStake(true);
		}, 2800);
	};

	const stakingPreview = (
		<>
			{loadingStakingRewardAndPoints ? (
				<Loader color='green' />
			) : (
				<>
					<Text
						size='md'
						mb='md'
						sx={{
							strong: {
								color: '#42ca9f',
							},
						}}
					>
						This staking pool has a total reward of:{' '}
						<strong>500000 REC tokens.</strong>
						<br /> Total staking pool points generated so far:{' '}
						<strong>123 points.</strong> <br />
						With your current staking combo, you will earn{' '}
						<strong>1212 points</strong> for this subpool.
						<br />
						As of now, you will be eligible to earn{' '}
						<strong>5512 tokens.*</strong>{' '}
					</Text>
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
					{opened ? 'Hide' : 'See'} your selected keys combination
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
								<NFTCardPreview key={key.id} nft={key} />
							))}
							{!!keyChain ? <NFTCardPreview nft={keyChain} /> : null}
							{!!superiorKeyChain ? (
								<NFTCardPreview nft={superiorKeyChain} />
							) : null}
						</SimpleGrid>
					</Flex>
				</Collapse>
				<Button
					w='160px'
					h='50px'
					mt='md'
					radius='md'
					variant='light'
					color='green'
					onClick={handleStakingButtonClick}
					disabled={loadingStakingRewardAndPoints || loadingStaking}
				>
					{loadingStaking ? (
						<Loader color='grey' />
					) : (
						<Text size={'lg'}>Stake!</Text>
					)}
				</Button>
			</Box>
		</>
	);

	const successContent = (
		<Flex direction={'column'}>
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
