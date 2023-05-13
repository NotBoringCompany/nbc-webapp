import { Box } from '@mantine/core';
import { COLORS } from '../Globals/colors';
const BorderedBox = ({
  variant,
  minWidth,
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
        minWidth: minWidth || '50%',
        ...sx,
      })}
      {...props}
    >
      {children}
    </Box>
  );
};

export default BorderedBox;
