import { Box } from '@mantine/core';
import { COLORS } from '../Globals/colors';
const BorderedBox = ({
  variant,
  children,
  sx = {},
  borderRadiusSize = 'xl',
  withPadding = false,
}) => {
  const color = COLORS[variant] || COLORS.green;
  return (
    <Box
      sx={(theme) => ({
        border: `3px solid ${color}`,
        borderRadius: theme.radius[borderRadiusSize],
        textAlign: 'center',
        minWidth: '50%',
        padding: withPadding ? `20px` : '0',
        ...sx,
      })}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
