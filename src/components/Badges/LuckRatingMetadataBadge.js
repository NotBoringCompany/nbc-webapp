import { Badge } from '@mantine/core';
import { nbmonColorSchemes } from '@/constants/keyColorSchemes';

const getLuckRating = (luckRating = 0) => {
  if (luckRating >= 0 && luckRating <= 19) {
    return '0-19';
  }

  if (luckRating >= 20 && luckRating <= 39) {
    return '20-39';
  }

  if (luckRating >= 40 && luckRating <= 59) {
    return '40-59';
  }

  if (luckRating >= 60 && luckRating <= 79) {
    return '60-79';
  }

  if (luckRating >= 80 && luckRating <= 89) {
    return '80-89';
  }

  if (luckRating >= 90) {
    return '90';
  }

  return '0-19';
};

const LuckRatingMetadataBadge = ({ luckRating = 0, ...props }) => {
  const classifiedLuckRating = getLuckRating(luckRating);
  return (
    <Badge
      sx={{
        padding: '14px 16px',
        background:
          nbmonColorSchemes.colors.luckRating[classifiedLuckRating].background,
        span: {
          color: nbmonColorSchemes.colors.luckRating[classifiedLuckRating].text,
          fontWeight: 680,
          fontSize: 14,
          textTransform: 'capitalize',
        },
      }}
      {...props}
    >
      Luck Rating: {luckRating}
    </Badge>
  );
};

export default LuckRatingMetadataBadge;
