import { Badge, Text } from '@mantine/core';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';

import React from 'react';
import Image from 'next/image';
const TypeMetadataBadge = ({ type = 'brawler', ...props }) => {
  type = type.toLowerCase();
  return (
    <Badge
      {...props}
      sx={{
        ...props.sx,
        padding: '14px 16px',
        background:
          nbmonColorSchemes.colors.type[type]?.background ||
          nbmonColorSchemes.colors.default.background,
        span: {
          color:
            nbmonColorSchemes.colors.type[type]?.text ||
            nbmonColorSchemes.colors.default.text,
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <Image
        src={`/badges/type/${type}.svg`}
        alt={type.toLowerCase()}
        width={15}
        height={15}
        style={{ marginRight: 4 }}
      />
      <Text sx={{ textTransform: 'capitalize' }} m={0} size={13}>
        {type}
      </Text>
    </Badge>
  );
};

export default TypeMetadataBadge;
