import { createStyles, Header, Group, Center, Burger, Container, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useMoralis } from 'react-moralis';
import NBCLogo from '../../../public/NBCLogo.png';
import ConnectWalletButton from '../Buttons/ConnectWallet';
import NavbarMenu from '../Dropdowns/NavbarMenu';

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
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,

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

  connectButton: {
    backgroundColor: '#42ca9f',

    '&:hover': {
      transform: 'scale(1.01) translate(1px, -3px)',
      transitionDuration: '200ms',
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
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
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

    if (enableDropdown) {
        return (
        <>
            <Center className={classes.centerItems}>
                <Link href='/mint' className={classes.link}>Staking</Link>
            </Center>
            <Center className={classes.centerItems}>
                { !isAuthenticated ? (
                  <ConnectWalletButton />
                ) : (
                  <NavbarMenu />
                )}
            </Center>
        </>
        );
    }

    return (
        <>
            <Link href='/staking' className={classes.link}>Staking</Link>
            { !isAuthenticated ? (
              <ConnectWalletButton />
            ) : (
              <NavbarMenu />
            )}
        </>
    );
}

const MainNavbar = () => {
    const [ opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    return (
      <Header 
        sx={(theme) => ({
          borderBottom: 0, 
          backgroundColor: theme.fn.rgba(theme.black, 0)
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

        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} sx={(theme) => ({
              backgroundColor: '#000000',
            })}>
              <NavbarItems isDropdown />
            </Paper>
          )}
        </Transition>
      </Header>
    )
}

export default MainNavbar;