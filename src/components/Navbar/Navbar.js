import { useContext, useEffect, useState } from 'react';
import {
  createStyles,
  Header,
  Group,
  Center,
  Burger,
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
import SelectWallet from '../Modals/SelectWallet';
import AuthContext from '../Auth/AuthContext';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    flex: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: 0,
    margin: '0 20px',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    zIndex: 1,
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  logo: {
    zIndex: 1,
  },

  dropdown: {
    borderRadius: 0,
    position: 'absolute',
    top: 0,
    backgroundColor: '#000000',
    margin: '0',
    width: '100%',
    left: '0',
    padding: '32px',
    paddingTop: '48px',
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

const LoginDropdown = ({ onShowSelectWallet }) => {
  const { classes } = useStyles();
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button
          sx={(theme) => ({
            backgroundColor: '#42ca9f',
            transitionDuration: '200ms',
            '&:hover': {
              transform: 'scale(1.01) translate(1px, -3px)',
              backgroundColor: '#42ca9f',
            },
          })}
        >
          <Text
            sx={(theme) => ({
              marginLeft: '2px',
            })}
          >
            Login
          </Text>
          <IconChevronDown size={15} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown className={classes.menuDropdown}>
        <Flex align={'center'} justify={'center'} p='sm'>
          <ConnectWalletButton onShowSelectWallet={onShowSelectWallet} />
        </Flex>
        <Divider />
        <Menu.Item>
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
            <Link href='/login'>Use your email</Link>
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const NavbarItems = (props) => {
  const enableDropdown = props.isDropdown;
  const { classes } = useStyles();
  const { isAuthenticated } = useMoralis();
  const { isEmailAuthenticated } = useContext(AuthContext);

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
                    color: '#fff',
                    marginLeft: '2px',
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
          {(!isAuthenticated && !isEmailAuthenticated) ? (
            <LoginDropdown onShowSelectWallet={props.onShowSelectWallet} />
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
              backgroundColor: 'transparent',
              ':hover': {
                backgroundColor: 'transparent',
              },
              ':active': {
                backgroundColor: 'transparent',
              },
            })}
          >
            <Text
              sx={(theme) => ({
                marginRight: '2px',
                color: '#fff',
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
        {(!isAuthenticated && !isEmailAuthenticated) ? (
          <LoginDropdown onShowSelectWallet={props.onShowSelectWallet} />
        ) : (
          <NavbarMenu />
        )}
      </Menu>
    </>
  );
};

const MainNavbar = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const [showSelectWallet, setShowSelectWallet] = useState(false);
  return (
    <Header
      sx={(theme) => ({
        borderBottom: 0,
        backgroundColor: theme.fn.rgba(theme.black, 0),
      })}
      height={HEADER_HEIGHT}
      className={classes.header}
    >
      <SelectWallet
        showSelectWallet={showSelectWallet}
        setShowSelectWallet={setShowSelectWallet}
      />
      <Link href='/' className={classes.logo}>
        <Image src={NBCLogo} alt='nbc logo' width={40} height={40} priority />
      </Link>
      <Group spacing={20} className={classes.links}>
        <NavbarItems onShowSelectWallet={setShowSelectWallet} />
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
            <NavbarItems isDropdown onShowSelectWallet={setShowSelectWallet} />
          </Paper>
        )}
      </Transition>
    </Header>
  );
};

export default MainNavbar;
