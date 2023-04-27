import React from 'react';
import { Card, Image, Button, Group, Text } from '@mantine/core';

const NFTCard = ({ nft, onSelect, selected, absolutelyDisabled }) => {
	const { name, image } = nft;
	const noActionAllowed = absolutelyDisabled && !selected;
	const handleSelectNFT = () => {
		if (!noActionAllowed) {
			onSelect(nft);
		}
	};
	return (
		<Card
			onClick={handleSelectNFT}
			sx={{
				':hover': {
					cursor: noActionAllowed ? 'not-allowed' : 'pointer',
				},
				minHeight: '380px',
				display: 'flex',
				flexDirection: 'column',
			}}
			shadow='sm'
			padding='lg'
			radius='md'
			withBorder
			w={'100%'}
		>
			<Card.Section>
				<Image src={image} height={240} alt={name} />
			</Card.Section>

			<Group position='apart' mt='md' mb='auto'>
				<Text weight={500}>{name}</Text>
			</Group>
			<Button
				onClick={handleSelectNFT}
				variant='light'
				color={selected ? 'red' : 'green'}
				fullWidth
				mt='md'
				radius='md'
				disabled={absolutelyDisabled && !selected}
			>
				{selected ? 'Unselect' : 'Select'}
			</Button>
		</Card>
	);
};

export default NFTCard;
