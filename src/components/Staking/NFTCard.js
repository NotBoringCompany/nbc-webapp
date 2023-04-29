import React from 'react';
import { Card, Image, Button, Group, Text } from '@mantine/core';

const NFTCard = ({ nft, onSelect, selected, absolutelyDisabled }) => {
	const { name, imageUrl, metadata } = nft;
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
				{imageUrl.includes('mp4') && (
					<video
						alt={name}
						autoPlay
						loop
						playsInline
						muted
						width={'100%'}
						height={'100%'}
					>
						<source type='video/mp4' src={imageUrl} />
					</video>
				)}
				{!imageUrl.includes('mp4') && (
					<Image src={imageUrl} alt={imageUrl} />
				)}
			</Card.Section>

			<Group position='apart' mt='md' mb='auto'>
				<Text weight={500}>{name}</Text>
			</Group>
			<Button
				onClick={handleSelectNFT}
				sx={(theme) => ({
					backgroundColor: selected ? 'red' : '#42ca9f',
					':hover': {
						backgroundColor: selected ? 'red' : '#42ca9f',
						transform: 'scale(1.01) translate(1px, -3px)',
						transitionDuration: '200ms',
					}
				})}
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
