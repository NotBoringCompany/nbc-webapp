import { Flex, Text, Select } from '@mantine/core';
import { IconArrowDown, IconArrowUp } from '@tabler/icons';
import { MediumButton } from './Buttons/Universals';
import { NFT_KEY_SORT_BY, SORT_MODE } from '@/constants/sort';
const NFTKeysSorter = ({ sort, onSort }) => {
  const { LUCK_BOOST_TRAIT, LUCK_TRAIT, TOKEN_ID } = NFT_KEY_SORT_BY;
  const { DESC, ASC } = SORT_MODE;
  const data = [
    { value: LUCK_TRAIT, label: 'Luck Rating' },
    { value: LUCK_BOOST_TRAIT, label: 'Luck Boost' },
    { value: TOKEN_ID, label: 'ID' },
  ];
  const handleSortMode = () => {
    const update = {
      ...sort,
      mode: sort.mode === DESC ? ASC : DESC,
      loading: true,
    };

    onSort({ ...update });

    setTimeout(() => {
      //Due to our lazy loaded videos in the Cards, we need this
      //"artifical" loading time.
      //This loading time gives the NewNFTCard / NFTCard sufficient time to run `useOnScreen` properly during re-render.
      //Otherwise, `useOnScreen` hook will always return `false` and the video won't show after sorting.
      onSort({ ...update, loading: false });
    }, 100);
  };

  const handleSortBy = (by) => {
    if (by !== sort.by) {
      const update = {
        ...sort,
        by,
        loading: true,
      };
      onSort({ ...update });
      setTimeout(() => {
        //Same reason as above as to why we need this loading time
        onSort({ ...update, loading: false });
      }, 100);
    }
  };

  return (
    <Flex direction='row' align='center'>
      <Text size={16} mr={10}>
        Sort:
      </Text>
      <Select
        w={140}
        data={data}
        value={sort.by}
        onChange={(sortByVal) => handleSortBy(sortByVal)}
        mr={10}
      />
      <MediumButton onClick={handleSortMode}>
        {sort.mode === DESC ? <IconArrowDown /> : <IconArrowUp />}
      </MediumButton>
    </Flex>
  );
};
export default NFTKeysSorter;
