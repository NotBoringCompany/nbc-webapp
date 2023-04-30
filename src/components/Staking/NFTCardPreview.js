import React from 'react';
import { Card, Image, Button, Group, Text } from '@mantine/core';

const NFTCardPreview = ({ nft }) => {
	const { name, imageUrl, metadata } = nft;
	return (
		<Card
			sx={{
				display: 'flex',
				width: '100%',
				height: '60px',
				flexDirection: 'row',
				alignItems: 'center',
			}}
			shadow='sm'
			padding='lg'
			radius='md'
			p='0'
		>
			{imageUrl.includes('mp4') && (
				<video
					alt={name}
					autoPlay
					loop
					playsInline
					muted
					width={'60px'}
					height={'60px'}
				>
					<source type='video/mp4' src={imageUrl} />
				</video>
			)}
			{!imageUrl.includes('mp4') && (
				<Image src={imageUrl} height={'60px'} width={'60px'} alt={name} />
			)}
			<Text weight={500} size={'sm'} px='sm'>
				{name}
			</Text>
		</Card>
	);
};

export default NFTCardPreview;
