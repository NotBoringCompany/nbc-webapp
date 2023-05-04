import React from 'react';
import { Card, Image, Button, Group, Text } from '@mantine/core';

const NFTCard = ({ showButton, nft, onSelect, selected, absolutelyDisabled, nftStakeable }) => {
	const { name, imageUrl, metadata } = nft;
	const noActionAllowed = (absolutelyDisabled && !selected) || !nftStakeable;
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
				minHeight: showButton ? '380px' : '280px',
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

			<Group position='left' mt='md' mb='auto'>
				<Text weight={500} size={18}>{name}</Text>
				{metadata && name.includes('Key Of Salvation') && (
					<>
						<Text weight={500}>House: {metadata.houseTrait}</Text>
						<Text weight={500}>Type: {metadata.typeTrait}</Text>
						<Text weight={500}>Luck Rating: {metadata.luckTrait}</Text>
						<Text weight={500}>Luck Boost: {metadata.luckBoostTrait}</Text>
					</>
				)}
			</Group>
			{showButton && (
				<Button
					onClick={handleSelectNFT}
					sx={(theme) => ({
						backgroundColor: selected ? '#ca4242' : '#42ca9f',
						':hover': {
							backgroundColor: selected ? '#ca4242' : '#42ca9f',
							transform: 'scale(1.01) translate(1px, -3px)',
							transitionDuration: '200ms',
						}
					})}
					fullWidth
					mt='md'
					radius='md'
					disabled={noActionAllowed}
				>
					{noActionAllowed 
						? 'Staked'
							: selected
							? 'Unselect'
						: 'Select'
					}
				</Button>
			)}
		</Card>
	);
};

export default NFTCard;
