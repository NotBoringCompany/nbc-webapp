import { Box } from '@mantine/core';
import { COLORS } from '../Globals/colors';
const BorderedBox = ({
  variant,
  minWidth,
  children,
  sx = {},
  borderRadiusSize = 'xl',
  padding,
}) => {
  const color = COLORS[variant] || COLORS.green;
  return (
    <Box
      sx={(theme) => ({
        border: `3px solid ${color}`,
        borderRadius: theme.radius[borderRadiusSize],
        textAlign: 'center',
        minWidth: minWidth || '50%',
        padding: padding ? theme.spacing[padding] : 0,
        ...sx,
      })}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
