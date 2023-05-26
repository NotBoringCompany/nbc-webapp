import { Badge } from '@mantine/core';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';

import React from 'react';
const TypeMetadataBadge = ({ type = 'brawler', ...props }) => {
  return (
    <Badge
      {...props}
      sx={{
        ...props.sx,
        padding: '14px 16px',
        background:
          nbmonColorSchemes.colors.type[type.toLowerCase()]?.background ||
          nbmonColorSchemes.colors.default.background,
        span: {
          color:
            nbmonColorSchemes.colors.type[type.toLowerCase()]?.text ||
            nbmonColorSchemes.colors.default.text,
          fontWeight: 680,
          fontSize: 14,
          textTransform: 'capitalize',
        },
      }}
    >
      {type}
    </Badge>
  );
};

export default TypeMetadataBadge;
