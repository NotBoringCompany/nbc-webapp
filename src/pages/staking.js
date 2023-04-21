import { useState } from "react";
import { SimpleGrid } from "@mantine/core";
import { Flex, Text, Select } from "@mantine/core";
import maxSelectedKey from "@/utils/maxSelectedKey";
import NFTCard from "@/components/Staking/NFTCard";

const DATA = [
	{ value: "single", label: "Single (1 key)" },
	{ value: "pair", label: "Pair (2 keys)" },
	{ value: "trio", label: "Trio (3 keys)" },
	{ value: "pentuple", label: "Pentuple (5 keys)" },
	{ value: "flush", label: "Flush (15 keys)" },
];

const Box = ({
	onSelectKeyComboType,
	selectedKeyCombo,
	nfts,
	onSelectNFT,
	comboSelection,
}) => {
	const maxSelectedKeys = maxSelectedKey(selectedKeyCombo);
	return (
		<Flex
			px={24}
			py={16}
			direction={"column"}
			w={"100%"}
			sx={{ border: "2px solid #42ca9f" }}
		>
			<Text mb={"sm"}>Key Combo</Text>
			<Select
				placeholder="Pick a Key Combo"
				data={DATA}
				onChange={onSelectKeyComboType}
			/>
			{!!selectedKeyCombo ? (
				<>
					<Text mt={"md"}>
						Select any {maxSelectedKeys} {maxSelectedKeys > 1 ? "keys" : "key"}{" "}
						and optionally, a keychain.
					</Text>
					<SimpleGrid my={"md"} spacing={"md"} cols={3}>
						{nfts.keys.map((k) => (
							// 'key' is a reserved keyword
							// by React. We have tp use it, when
							// rendering arrays. But, it can't
							// be used for our rendering purposes.

							//'rhKey' is the key that we are
							//displaying.
							<NFTCard
								key={k.name}
								rhKey={k}
								onSelect={onSelectNFT}
								selected={
									comboSelection.keys.findIndex((key) => key.id === k.id) >= 0
								}
								absolutelyDisabled={
									comboSelection.keys.length === maxSelectedKeys
								}
							/>
						))}
					</SimpleGrid>
				</>
			) : null}
		</Flex>
	);
};

export default function Stake({ data }) {
	const [selectKeyComboType, setSelectedKeyComboType] = useState(null);
	const [comboSelection, setComboSelection] = useState({
		keys: [],
		keyChain: [],
	});
	const handleSelectNFT = (rhKey) => {
		const exist =
			comboSelection.keys.findIndex((key) => key.id === rhKey.id) >= 0;
		if (!exist) {
			const keys = [...comboSelection.keys, rhKey];
			setComboSelection({ ...comboSelection, keys });
		} else {
			const keys = [...comboSelection.keys].filter(
				(key) => key.id !== rhKey.id
			);
			setComboSelection({ ...comboSelection, keys });
		}
	};
	const handleSelectKeyComboType = (e) => {
		setSelectedKeyComboType(e);
		const maxSelectedKeys = maxSelectedKey(e);

		//If there's more keys selected then
		//what's allowed in the selected key combo type
		if (comboSelection.keys.length > maxSelectedKeys) {
			const keys = [...comboSelection.keys].slice(0, maxSelectedKeys);
			setComboSelection({ ...comboSelection, keys });
		}
	};

	return (
		<Flex dir="row">
			<Box
				selectedKeyCombo={selectKeyComboType}
				onSelectNFT={handleSelectNFT}
				onSelectKeyComboType={handleSelectKeyComboType}
				nfts={data}
				comboSelection={comboSelection}
			/>
		</Flex>
	);
}

export async function getServerSideProps(ctx) {
	const MOCK_SERVER_RESPONSE_NFTS = {
		keys: [
			{
				id: "6969",
				name: "Key of Salvation #6969",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif",
			},
			{
				id: "51",
				name: "Key of Salvation #51",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif",
			},
			{
				id: "123",
				name: "Key of Salvation #123",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif",
			},
			{
				id: "124124",
				name: "Key of Salvation #124124",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif",
			},
		],
	};

	return {
		props: {
			data: MOCK_SERVER_RESPONSE_NFTS,
		},
	};
}
