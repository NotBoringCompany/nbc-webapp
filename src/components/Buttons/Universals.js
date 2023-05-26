import { Button } from '@mantine/core';

export const MediumButton = ({
  color,
  hoverColor,
  margin,
  padding,
  onClick,
  disabled,
  children,
}) => {
  return (
    <Button
      sx={(theme) => ({
        backgroundColor: color ? color : theme.colors.dark[7],
        margin: margin,
        padding: padding,
        transitionDuration: '200ms',
        ':hover': {
          transform: 'scale(1.01) translate(1px, -3px)',
          backgroundColor: hoverColor
            ? hoverColor
            : color
            ? color
            : 'transparent',
        },
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
