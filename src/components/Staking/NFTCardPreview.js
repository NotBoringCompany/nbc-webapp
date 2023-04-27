import React from "react";
import { Card, Image, Button, Group, Text } from "@mantine/core";

const NFTCardPreview = ({ nft }) => {
	const { name, image } = nft;
	return (
		<Card
			sx={{
				display: "flex",
				width: "100%",
				height: "60px",
				flexDirection: "row",
				alignItems: "center",
			}}
			shadow="sm"
			padding="lg"
			radius="md"
			p="0"
		>
			<Image src={image} height={"60px"} width={"60px"} alt={name} />
			<Text weight={500} size={"sm"} px="sm">
				{name}
			</Text>
		</Card>
	);
};

export default NFTCardPreview;
