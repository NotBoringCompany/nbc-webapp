import { useEffect, useRef } from 'react';
import { Card, Image, Button, Group, Text, Flex } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useOnScreen } from '../../utils/useOnScreen';
const LazyLoadedVideo = dynamic(() => import('./Video'), { ssr: false });

const NFTCard = ({
  showButton,
  nft,
  onSelect,
  selected,
  absolutelyDisabled,
  nftStakeable,
}) => {
  const ref = useRef();

  //at least 100 px visible on the screen
  const onScreen = useOnScreen(ref, '-100px');

  const { name, imageUrl, metadata } = nft;
  const noActionAllowed = (absolutelyDisabled && !selected) || !nftStakeable;
  const handleSelectNFT = () => {
    if (!noActionAllowed) {
      onSelect(nft);
    }
  };

  return (
    <Card
      ref={ref}
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
        {imageUrl.includes('mp4') && onScreen && (
          <LazyLoadedVideo imageUrl={imageUrl} name={name} />
        )}
        {!imageUrl.includes('mp4') && <Image src={imageUrl} alt={imageUrl} />}
      </Card.Section>

      <Group position='left' mt='md' mb='auto'>
        <Text weight={500} size={18}>
          {name}
        </Text>
        {metadata && name.includes('Key Of Salvation') && (
          <Flex direction='column' align={'start'}>
            <Text weight={500}>House: {metadata.houseTrait}</Text>
            <Text weight={500}>Type: {metadata.typeTrait}</Text>
            <Text weight={500}>Luck Rating: {metadata.luckTrait}</Text>
            <Text weight={500}>Luck Boost: {metadata.luckBoostTrait}</Text>
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

export default NFTCard;
