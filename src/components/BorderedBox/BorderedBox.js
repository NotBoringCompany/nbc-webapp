import { Box } from '@mantine/core';
import { COLORS } from '../Globals/colors';
const BorderedBox = ({
  variant,
  children,
  sx = {},
  borderRadiusSize = 'xl',
  ...props
}) => {
  const color = COLORS[variant] || variant;
  return (
    <Box
      sx={(theme) => ({
        border: `3px solid ${color}`,
        borderRadius: theme.radius[borderRadiusSize],
        textAlign: 'center',
        ...sx,
      })}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
