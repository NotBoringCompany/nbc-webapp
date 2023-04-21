import React from "react";
import { Card, Image, Button, Group, Text } from "@mantine/core";

const NFTCard = ({ rhKey, onSelect, selected, absolutelyDisabled }) => {
	const { name, image } = rhKey;
	const noActionAllowed = absolutelyDisabled && !selected;
	const handleSelectNFT = () => {
		if (!noActionAllowed) {
			onSelect(rhKey);
		}
	};
	return (
		<Card
			onClick={handleSelectNFT}
			sx={{
				":hover": {
					cursor: noActionAllowed ? "not-allowed" : "pointer",
				},
			}}
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			w={"100%"}
		>
			<Card.Section>
				<Image src={image} height={240} alt={name} />
			</Card.Section>

			<Group position="apart" mt="md" mb="xs">
				<Text weight={500}>{name}</Text>
			</Group>
			<Button
				onClick={handleSelectNFT}
				variant="light"
				color={selected ? "red" : "green"}
				fullWidth
				mt="md"
				radius="md"
				disabled={absolutelyDisabled && !selected}
			>
				{selected ? "Unselect" : "Select"}
			</Button>
		</Card>
	);
};

export default NFTCard;
