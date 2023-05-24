import { useRef } from 'react';
import { useOnScreen } from '../../utils/useOnScreen';
import { Card, Image, Button, Group, Text, Flex } from '@mantine/core';
import dynamic from 'next/dynamic';
import TypeMetadataBadge from '../Badges/TypeMetadataBadge';
import LuckRatingMetadataBadge from '../Badges/LuckRatingMetadataBadge';
import LuckBoostMetadataBadge from '../Badges/LuckBoostMetadataBadge';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';
const LazyLoadedVideo = dynamic(() => import('../Video'), { ssr: false });

const HouseNameBox = ({ houseName = '' }) => {
  return (
    <Flex
      align={'center'}
      justify={'center'}
      sx={{
        color: nbmonColorSchemes.colors.house[houseName.toLowerCase()].text,
        fontWeight: '600',
        height: '30px',
        width: '140px',
        position: 'absolute',
        background:
          nbmonColorSchemes.colors.house[houseName.toLowerCase()].background,
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
      }}
    >
      {houseName}
    </Flex>
  );
};

const NewNFTCard = ({
  showButton,
  nft,
  onSelect,
  selected,
  absolutelyDisabled,
  nftStakeable,
}) => {
  const ref = useRef();

  //at least 10px visible on the screen
  const onScreen = useOnScreen(ref, '-10px');

  const { name, imageUrl, metadata } = nft;
  const noActionAllowed = (absolutelyDisabled && !selected) || !nftStakeable;
  const handleSelectNFT = () => {
    if (!noActionAllowed) {
      onSelect(nft);
    }
  };

  if (!metadata) return <></>;

  return (
    <Card
      ref={ref}
      onClick={handleSelectNFT}
      sx={{
        ':hover': {
          cursor: noActionAllowed ? 'not-allowed' : 'pointer',
        },
        background: 'transparent',
        border: `2px solid ${
          nbmonColorSchemes.colors.house[metadata.houseTrait.toLowerCase()]
            ?.background || '#fff'
        }`,
        minHeight: showButton ? '380px' : '280px',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        position: 'relative',
        paddingTop: '0',
      }}
      shadow='sm'
      radius='md'
      w={'100%'}
    >
      {metadata && <HouseNameBox houseName={metadata.houseTrait} />}
      <Card.Section sx={{ height: '250px', marginTop: '-16px' }}>
        {imageUrl.includes('mp4') && onScreen && (
          <LazyLoadedVideo imageUrl={imageUrl} name={name} />
        )}
        {!imageUrl.includes('mp4') && <Image src={imageUrl} alt={imageUrl} />}
      </Card.Section>

      <Group position='center' mt='md' mb='auto'>
        <Text weight={600} size={18}>
          {name}
        </Text>
        {metadata && name.includes('Key Of Salvation') && (
          <Flex direction='column' align={'center'} wrap='wrap'>
            <TypeMetadataBadge type={metadata.typeTrait} />
            <LuckRatingMetadataBadge
              my='sm'
              luckRating={Number(metadata.luckTrait)}
            />
            <LuckBoostMetadataBadge
              luckBoost={Number(metadata.luckBoostTrait)}
            />
          </Flex>
        )}
      </Group>
      {showButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleSelectNFT();
          }}
          sx={(theme) => ({
            backgroundColor: selected ? '#ca4242' : '#42ca9f',
            ':hover': {
              backgroundColor: selected ? '#ca4242' : '#42ca9f',
              transform: 'scale(1.01) translate(1px, -3px)',
              transitionDuration: '200ms',
            },
          })}
          fullWidth
          mt='md'
          radius='md'
          disabled={noActionAllowed}
        >
          {noActionAllowed
            ? nftStakeable
              ? 'Select'
              : 'Staked'
            : selected
            ? 'Unselect'
            : 'Select'}
        </Button>
      )}
    </Card>
  );
};

export default NewNFTCard;
