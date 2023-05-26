import { Badge } from '@mantine/core';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';

const HouseTraitMetadataBadge = ({ houseName = '', ...props }) => {
  return (
    <Badge
      sx={{
        padding: '14px 16px',
        background: nbmonColorSchemes.colors.house[houseName].background,
        span: {
          color: nbmonColorSchemes.colors.house[houseName].text,
          fontWeight: 680,
          fontSize: 14,
          textTransform: 'capitalize',
        },
      }}
      {...props}
    >
      House: {houseName}
    </Badge>
  );
};

export default HouseTraitMetadataBadge;
