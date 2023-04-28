import { Flex, Text, Select, SimpleGrid, Modal, Button, Box } from '@mantine/core';
import {keyCombos, maxSelectedKey} from '@/utils/kosData';
import NFTCard from '@/components/Staking/NFTCard';
import { IconAlertOctagon } from '@tabler/icons';

const StakingBox = ({
	onSelectKeyComboType,
	selectedKeyCombo,
	nfts,
	onSelectKey,
	onSelectKeyChain,
	comboSelection,
	confirmButtonClick,
	confirmButtonDisabled
}) => {
	const maxSelectedKeys = maxSelectedKey(selectedKeyCombo);
	const cardColumnsBreakpoints = [
		{ minWidth: 'xl', cols: 5, spacing: 'md' },
		{ minWidth: 'lg', cols: 3, spacing: 'md' },
		{ minWidth: 'md', cols: 2, spacing: 'md' },
		{ minWidth: 'sm', cols: 2, spacing: 'sm' },
		{ minWidth: 'xs', cols: 1, spacing: 'sm' },
	];
	return (
		<Flex
			px={24}
			py={16}
			direction='column'
			align='center'
			sx={(theme) => ({
				border: '2px solid #42ca9f',
				borderRadius: theme.radius.md,
				overflowY: 'auto',
				maxHeight: '80vh',
				minWidth: '50%',
				marginTop: 50,
			})}
		>
			<Text size={40} weight={'800'} mb={'md'} color='#42ca9f'>
				STAKING
			</Text>
			<Flex
				style={{marginBottom: 15 }}
				align='center'
			>
				<IconAlertOctagon style={{marginRight: 10 }} color='#42ca9f' />
				<Text c='#42ca9f' size={20}>Please select a key combo to continue.</Text>
			</Flex>

			<Select
				placeholder='Pick a key combo'
				data={keyCombos}
				size='md'
				defaultValue={'asd'}
				onChange={onSelectKeyComboType}
			/>
			{!!selectedKeyCombo ? (
				<>
					<Text mt={'md'}>
						Select any {maxSelectedKeys} {maxSelectedKeys > 1 ? 'keys' : 'key'}{' '}
						to stake. You can also add EITHER 1 Keychain or 1 Superior Keychain to increase your points.
					</Text>
					<Text>NOTE: If you chose {'Flush'} as your combo, you can only stake along a Superior Keychain.</Text>
					<Text size={30} weight={'600'} mt={50} c='#42ca9f'>
						YOUR KEYS
					</Text>
					<SimpleGrid
						my={20}
						spacing={'md'}
						breakpoints={cardColumnsBreakpoints}
					>
						{nfts.keys.map((k) => (
							// 'key' is a reserved keyword
							// by React. We have tp use it, when
							// rendering arrays. But, it can't
							// be used for our rendering purposes.

							//'rhKey' is the key that we are
							//displaying.
							<NFTCard
								key={k.name}
								nft={k}
								onSelect={onSelectKey}
								selected={
									comboSelection.keys.findIndex((key) => key.id === k.id) >= 0
								}
								absolutelyDisabled={
									comboSelection.keys.length === maxSelectedKeys
								}
							/>
						))}
					</SimpleGrid>

					<Text size={'lg'} weight={'600'} mt={'md'}>
						Keychains
					</Text>

					<SimpleGrid
						my={'md'}
						spacing={'md'}
						breakpoints={cardColumnsBreakpoints}
					>
						{nfts.keyChains.map((keyChain) => (
							// 'key' is a reserved keyword
							// by React. We have tp use it, when
							// rendering arrays.
							<NFTCard
								key={keyChain.id}
								nft={keyChain}
								onSelect={onSelectKeyChain}
								selected={
									!!comboSelection.keyChain &&
									comboSelection.keyChain.id === keyChain.id
								}
								absolutelyDisabled={
									!!comboSelection.keyChain || !!comboSelection.superiorKeyChain
								} // not null
							/>
						))}
					</SimpleGrid>

					<Text size={'lg'} weight={'600'} mt={'md'}>
						Superior Keychains
					</Text>
					<Text size={'sm'}>
						<i>Superior keychains can only be used for Flush combos.</i>
					</Text>

					<SimpleGrid
						my={'md'}
						spacing={'md'}
						breakpoints={cardColumnsBreakpoints}
					>
						{nfts.superiorKeyChains.map((superiorKeyChain) => (
							// 'key' is a reserved keyword
							// by React. We have to use it when
							// rendering arrays.
							<NFTCard
								key={superiorKeyChain.id}
								nft={superiorKeyChain}
								onSelect={(sKC) => onSelectKeyChain(sKC, true)}
								selected={
									!!comboSelection.superiorKeyChain &&
									comboSelection.superiorKeyChain.id === superiorKeyChain.id
								}
								absolutelyDisabled={
									selectedKeyCombo !== 'flush' ||
									!!comboSelection.keyChain ||
									!!comboSelection.superiorKeyChain
								} // not 'flush' combo or flush combo but already selected one
							/>
						))}
					</SimpleGrid>
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
		</Flex>
	);
};

export default StakingBox;
