import { Title } from '@mantine/core';
import { COLORS } from '../Globals/colors';

export const HeadingOne = ({
  sx = {},
  order = 1,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={60}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 40,
        },
      })}
    >
      {children}
    </Title>
  );
};

export const HeadingTwo = ({
  sx = {},
  order = 2,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={52}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 32,
        },
      })}
    >
      {children}
    </Title>
  );
};

export const HeadingThree = ({
  sx = {},
  order = 3,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={48}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 32,
        },
      })}
    >
      {children}
    </Title>
  );
};

export const HeadingFour = ({
  sx = {},
  order = 4,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={40}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 32,
        },
      })}
    >
      {children}
    </Title>
  );
};

export const HeadingFive = ({
  sx = {},
  order = 5,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={32}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 24,
        },
      })}
    >
      {children}
    </Title>
  );
};

export const HeadingSix = ({
  sx = {},
  order = 6,
  color = 'green',
  children,
  ...props
}) => {
  // `order` is the rendered element in the DOM.
  // 1 means h1, 2 means h2, etc...
  return (
    <Title
      order={order}
      size={24}
      {...props}
      sx={(theme) => ({
        ...sx,
        color: COLORS[color] || color,
        lineHeight: 1,
        [theme.fn.smallerThan('md')]: {
          fontSize: 20,
        },
      })}
    >
      {children}
    </Title>
  );
};
