import { useState } from 'react';
import { Button, Flex, Text } from '@mantine/core';
import StakingBox from '@/components/Staking/StakingBox';
import maxSelectedKey from '@/utils/maxSelectedKey';
import Layout from '@/components/Layout/Layout';
import StakingModal from '@/components/Staking/StakingModal';

export default function Staking({ data }) {
	const [selectKeyComboType, setSelectedKeyComboType] = useState(null);
	const [comboSelection, setComboSelection] = useState({
		keys: [],
		keyChain: null,
		superiorKeyChain: null,
	});
	const [showStakingModal, setShowStakingModal] = useState(false);

	const [loadingStakingRewardAndPoints, setLoadingStakingRewardAndPoints] =
		useState(true);

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
		const nft = isSuperior ? 'superiorKeyChain' : 'keyChain';
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

		// if combo not 'flush'
		// but a superior keychain has been selected
		if (e !== 'flush' && !!comboSelection.superiorKeyChain) {
			setComboSelection({ ...comboSelection, superiorKeyChain: null });
		}
	};

	const handleConfirmButton = () => {
		if (!confirmButtonDisabled) {
			//launches modal
			setShowStakingModal(true);

			//TODO: fetches API to get the rewards and points for
			// the selected key combo (subpool)
			setLoadingStakingRewardAndPoints(true);
			setTimeout(() => {
				setLoadingStakingRewardAndPoints(false);
			}, 1500);
		}
	};

	return (
		<Layout withAuth>
			<StakingModal
				showStakingModal={showStakingModal}
				onCloseStakingModal={() => setShowStakingModal(false)}
				subpool={comboSelection}
				loadingStakingRewardAndPoints={loadingStakingRewardAndPoints}
			/>
			<Flex direction={'column'}>
				<StakingBox
					selectedKeyCombo={selectKeyComboType}
					onSelectKey={handleSelectKey}
					onSelectKeyChain={handleSelectKeyChain}
					onSelectKeyComboType={handleSelectKeyComboType}
					nfts={data}
					comboSelection={comboSelection}
				/>
				<Button
					w='160px'
					h='50px'
					mt='md'
					radius='md'
					variant='light'
					color='green'
					onClick={handleConfirmButton}
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
			</Flex>
		</Layout>
	);
}

export async function getServerSideProps(ctx) {
	const MOCK_SERVER_RESPONSE_NFTS = {
		keys: [
			{
				id: '6969',
				name: 'Key of Salvation #6969',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '51',
				name: 'Key of Salvation #51',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '123',
				name: 'Key of Salvation #123',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '124124',
				name: 'Key of Salvation #124124',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '21',
				name: 'Key of Salvation #21',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '33',
				name: 'Key of Salvation #33',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '31',
				name: 'Key of Salvation #31',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
			{
				id: '91237',
				name: 'Key of Salvation #91237',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/916c0d6d13ae2d7f089f321b5b418461.gif',
			},
		],
		keyChains: [
			{
				id: '72',
				name: 'Keychain #72',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif',
			},
			{
				id: '77',
				name: 'Keychain #77',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/20b8a48b266291c3ca707d9056042979.gif',
			},
		],
		superiorKeyChains: [
			{
				id: '79822',
				name: 'Superior Keychain #79822',
				image:
					'https://dl.openseauserdata.com/cache/originImage/files/a6d28c508c28a967913f28a72a12cf4d.gif',
			},
		],
	};

	return {
		props: {
			data: MOCK_SERVER_RESPONSE_NFTS,
		},
	};
}
