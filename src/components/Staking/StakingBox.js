<<<<<<< HEAD
import { Flex, Text, Select, SimpleGrid, Modal, Button } from '@mantine/core';
=======
import { Flex, Text, Select, SimpleGrid, Modal } from '@mantine/core';
>>>>>>> fbf3be680790af9c6e5fb20552622c455e7b56e3
import maxSelectedKey from '@/utils/maxSelectedKey';
import NFTCard from '@/components/Staking/NFTCard';

const DATA = [
	{ value: 'single', label: 'Single (1 key)' },
	{ value: 'pair', label: 'Pair (2 keys)' },
	{ value: 'trio', label: 'Trio (3 keys)' },
	{ value: 'pentuple', label: 'Pentuple (5 keys)' },
	{ value: 'flush', label: 'Flush (15 keys)' },
];

const StakingBox = ({
	onSelectKeyComboType,
	selectedKeyCombo,
	nfts,
	onSelectKey,
	onSelectKeyChain,
	comboSelection,
}) => {
	const maxSelectedKeys = maxSelectedKey(selectedKeyCombo);
	const cardColumnsBreakpoints = [
		{ minWidth: 'xl', cols: 8, spacing: 'md' },
		{ minWidth: 'lg', cols: 5, spacing: 'md' },
		{ minWidth: 'md', cols: 3, spacing: 'md' },
		{ minWidth: 'sm', cols: 2, spacing: 'sm' },
		{ minWidth: 'xs', cols: 1, spacing: 'sm' },
	];
	return (
		<Flex
			px={24}
			py={16}
			direction={'column'}
			w={'100%'}
			sx={{
				border: '2px solid #42ca9f',
<<<<<<< HEAD
				overflowY: 'auto',
=======
				overflowY: 'scroll',
>>>>>>> fbf3be680790af9c6e5fb20552622c455e7b56e3
				maxHeight: '80vh',
			}}
		>
			<Text sx={{ fontSize: '24px' }} weight={'800'} mb={'md'} color='#42ca9f'>
				Staking
			</Text>

			<Text size={'lg'} weight={'600'} mb={'md'}>
				Key Combo
			</Text>

			<Select
				placeholder='Pick a Key Combo'
				data={DATA}
				size='md'
				defaultValue={'asd'}
				onChange={onSelectKeyComboType}
			/>
			{!!selectedKeyCombo ? (
				<>
					<Text mt={'md'}>
						Select any {maxSelectedKeys} {maxSelectedKeys > 1 ? 'keys' : 'key'}{' '}
<<<<<<< HEAD
						and (optionally) a Keychain/Superior Keychain to stake.
=======
						and optionally, a keychain.
>>>>>>> fbf3be680790af9c6e5fb20552622c455e7b56e3
					</Text>
					<Text size={'lg'} weight={'600'} mt={'md'}>
						Keys
					</Text>
					<SimpleGrid
						my={'md'}
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
							// by React. We have tp use it, when
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
				</>
			) : null}
		</Flex>
	);
};

export default StakingBox;
