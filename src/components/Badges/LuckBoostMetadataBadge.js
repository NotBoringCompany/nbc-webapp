import { Badge } from '@mantine/core';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';
const LuckBoostMetadataBadge = ({ luckBoost = '', ...props }) => {
  return (
    <Badge
      sx={{
        padding: '14px 16px',
        background: nbmonColorSchemes.colors.luckBoost[luckBoost].background,
        span: {
          color: nbmonColorSchemes.colors.luckBoost[luckBoost].text,
          fontWeight: 680,
          fontSize: 13,
          textTransform: 'capitalize',
        },
      }}
      {...props}
    >
      Luck Boost: {luckBoost}
    </Badge>
  );
};

export default LuckBoostMetadataBadge;
