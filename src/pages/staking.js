import { useState } from "react";
import { Button, Flex, Text } from "@mantine/core";
import StakingBox from "@/components/Staking/StakingBox";
import maxSelectedKey from "@/utils/maxSelectedKey";
import Layout from "@/components/Layout/Layout";

export default function Staking({ data }) {
	const [selectKeyComboType, setSelectedKeyComboType] = useState(null);
	const [comboSelection, setComboSelection] = useState({
		keys: [],
		keyChain: null,
		superiorKeyChain: null,
	});
	const maxSelectedK = maxSelectedKey(selectKeyComboType);
	const confirmButtonDisabled = comboSelection.keys.length !== maxSelectedK;
	const handleSelectKey = (rhKey) => {
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

	const handleSelectKeyChain = (selectedNFT, isSuperior = false) => {
		const exist = isSuperior
			? !!comboSelection.superiorKeyChain
			: !!comboSelection.keyChain; // is not null
		const nft = isSuperior ? "superiorKeyChain" : "keyChain";
		if (!exist) {
			setComboSelection({ ...comboSelection, [nft]: selectedNFT });
		} else {
			setComboSelection({ ...comboSelection, [nft]: null });
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

		// if combo not "flush"
		// but a superior keychain has been selected
		if (e !== "flush" && !!comboSelection.superiorKeyChain) {
			setComboSelection({ ...comboSelection, superiorKeyChain: null });
		}
	};

	const handleConfirmButton = () => {
		if (!confirmButtonDisabled) {
			//launches modal
		}
	};

	return (
		<Layout>
			<Flex direction={"column"}>
				<StakingBox
					selectedKeyCombo={selectKeyComboType}
					onSelectKey={handleSelectKey}
					onSelectKeyChain={handleSelectKeyChain}
					onSelectKeyComboType={handleSelectKeyComboType}
					nfts={data}
					comboSelection={comboSelection}
				/>
				<Button
					w="160px"
					h="50px"
					mt="md"
					radius="md"
					variant="light"
					color="green"
					onClick={handleConfirmButton}
					disabled={confirmButtonDisabled}
				>
					<Text size={"lg"}>Confirm</Text>
				</Button>
			</Flex>
		</Layout>
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
		keyChains: [
			{
				id: "72",
				name: "Keychain #72",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif",
			},
			{
				id: "77",
				name: "Keychain #77",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif",
			},
		],
		superiorKeyChains: [
			{
				id: "79822",
				name: "Superior Keychain #79822",
				image:
					"https://dl.openseauserdata.com/cache/originImage/files/a6d28c508c28a967913f28a72a12cf4d.gif",
			},
		],
	};

	return {
		props: {
			data: MOCK_SERVER_RESPONSE_NFTS,
		},
	};
}
