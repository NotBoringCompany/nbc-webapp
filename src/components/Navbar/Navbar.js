import {
  createStyles,
  Header,
  Group,
  Center,
  Burger,
  Container,
  Transition,
  Paper,
  Menu,
  Button,
  Text,
  Divider,
  Flex,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useMoralis } from 'react-moralis';
import NBCLogo from '../../../public/NBCLogo.png';
import ConnectWalletButton from '../Buttons/ConnectWallet';
import NavbarMenu from '../Dropdowns/NavbarMenu';
import { IconChevronDown, IconMoneybag, IconPool } from '@tabler/icons';
import { useRouter } from 'next/router';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    flex: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: HEADER_HEIGHT,
    borderBottom: 0,
    margin: '0px 50px 0px 50px',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    backgroundColor: '#000000',
    margin: '0',
    width: '100%',
    left: '0',
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  centerItems: {
    marginTop: 10,
    marginBottom: 10,
  },

  menuMargin: {
    marginTop: 3,
  },

  menuDropdown: {
    marginTop: 3,
    backgroundColor: '#000000',
  },

  connectButton: {
    backgroundColor: '#42ca9f',
    transitionDuration: '200ms',
    '&:hover': {
      transform: 'scale(1.01) translate(1px, -3px)',
      backgroundColor: '#42ca9f',
    },

    '&:active': {
      transform: 'translateY(2px)',
    },
  },

  connectButton: {
    backgroundColor: '#42ca9f',
    transitionDuration: '200ms',
    '&:hover': {
      transform: 'scale(1.01) translate(1px, -3px)',
      backgroundColor: '#42ca9f',
    },

    '&:active': {
      transform: 'translateY(2px)',
    },
  },

  myAccountParagraph: {
    marginRight: 5,
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

const NavbarItems = (props) => {
  const enableDropdown = props.isDropdown;
  const { classes } = useStyles();
  const { isAuthenticated } = useMoralis();

  const router = useRouter();

  if (enableDropdown) {
    return (
      <>
        <Center className={classes.centerItems}>
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Button
                sx={(theme) => ({
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: 'transparent',
                    transform: 'scale(1.01) translate(1px, -3px)',
                    transitionDuration: '200ms',
                  },
                  ':active': {
                    backgroundColor: 'transparent',
                  },
                })}
              >
                <Text
                  sx={(theme) => ({
                    color: theme.colors.dark[0],
                  })}
                >
                  Staking
                </Text>
              </Button>
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDropdown}>
              <Menu.Item
                onClick={() => router.push('/staking')}
                icon={<IconMoneybag size={14} />}
              >
                <Text>Staking Pools</Text>
              </Menu.Item>
              <Divider />
              <Menu.Item
                icon={<IconPool size={14} />}
                onClick={() => router.replace('/staking/my-subpools')}
              >
                My Subpools
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Center>
        <Center className={classes.centerItems}>
          {!isAuthenticated ? (
            <Flex direction={'column'}>
              {' '}
              <ConnectWalletButton />{' '}
              <Text
                mt='sm'
                align='center'
                sx={(theme) => ({
                  a: {
                    color: theme.colors.dark[0],
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                  },
                })}
              >
                <Link href='/login'>Login</Link>
              </Text>
            </Flex>
          ) : (
            <NavbarMenu />
          )}
        </Center>
      </>
    );
  }

  if (enableDropdown) {
    return (
      <>
        <Center className={classes.centerItems}>
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Button
                sx={(theme) => ({
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: 'transparent',
                    transform: 'scale(1.01) translate(1px, -3px)',
                    transitionDuration: '200ms',
                  },
                  ':active': {
                    backgroundColor: 'transparent',
                  },
                })}
              >
                <Text
                  sx={(theme) => ({
                    color: theme.colors.dark[0],
                    marginRight: '2px',
                  })}
                >
                  Staking
                </Text>
                <IconChevronDown size={15} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown className={classes.menuDropdown}>
              <Menu.Item
                onClick={() => router.push('/staking')}
                icon={<IconMoneybag size={14} />}
              >
                <Text>Staking Pools</Text>
              </Menu.Item>
              <Divider />
              <Menu.Item
                icon={<IconPool size={14} />}
                onClick={() => router.replace('/staking/my-subpools')}
              >
                My Subpools
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Center>
        <Center className={classes.centerItems}>
          {!isAuthenticated ? (
            <Flex direction={'column'}>
              {' '}
              <ConnectWalletButton />{' '}
              <Text
                mt='sm'
                align='center'
                sx={(theme) => ({
                  a: {
                    color: theme.colors.dark[0],
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                  },
                })}
              >
                <Link href='/login'>Login</Link>
              </Text>
            </Flex>
          ) : (
            <NavbarMenu />
          )}
        </Center>
      </>
    );
  }

  return (
    <>
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Button
            sx={(theme) => ({
              backgroundColor: '#000000',
              ':hover': {
                backgroundColor: '#000000',
              },
              ':active': {
                backgroundColor: '#000000',
              },
            })}
          >
            <Text
              sx={(theme) => ({
                marginRight: '2px',
                color: theme.colors.dark[0],
              })}
            >
              Staking
            </Text>
            <IconChevronDown size={15} />
          </Button>
        </Menu.Target>

        <Menu.Dropdown className={classes.menuDropdown}>
          <Menu.Item
            onClick={() => router.push('/staking')}
            icon={<IconMoneybag size={14} />}
          >
            <Text>Staking Pools</Text>
          </Menu.Item>
          <Divider />
          <Menu.Item
            icon={<IconPool size={14} />}
            onClick={() => router.replace('/staking/my-subpools')}
          >
            My Subpools
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {!isAuthenticated ? (
        <>
          <ConnectWalletButton />
          <Text
            sx={(theme) => ({
              a: {
                color: theme.colors.dark[0],
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 14,
              },
            })}
          >
            <Link href='/login'>Login</Link>
          </Text>
        </>
      ) : (
        <NavbarMenu />
      )}
    </>
  );
};

const MainNavbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  return (
    <Header
      sx={(theme) => ({
        borderBottom: 0,
        backgroundColor: theme.fn.rgba(theme.black, 0),
      })}
      height={HEADER_HEIGHT}
      mb={20}
      className={classes.header}
    >
      <Link href='/'>
        <Image src={NBCLogo} alt='nbc logo' width={40} height={40} priority />
      </Link>
      <Group spacing={20} className={classes.links}>
        <NavbarItems />
      </Group>

      <Burger
        opened={opened}
        onClick={toggle}
        className={classes.burger}
        size='sm'
      />
      <Transition transition='pop-top-right' duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown}>
            <NavbarItems isDropdown />
          </Paper>
        )}
      </Transition>
    </Header>
  );
};

export default MainNavbar;
