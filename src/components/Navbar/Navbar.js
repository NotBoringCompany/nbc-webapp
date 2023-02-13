import { createStyles, Header, Group, Center, Burger, Container, Button, Transition, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import NBCLogo from '../../../public/NBCLogo.png';
import ConnectWalletButton from '../Buttons/ConnectWallet';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: '#000000',
  },

  containerHeader: {
    display: 'flex',
    flex: 'column',
    zIndex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    borderBottom: 0,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
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
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  centerItems: {
    marginTop: 10,
    marginBottom: 10,
  },

  connectButton: {
    backgroundColor: '#42ca9f',

    '&:hover': {
      transform: 'scale(1.01) translate(1px, -3px)',
      transitionDuration: '200ms',
      backgroundColor: '#42ca9f',
    },
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

    if (enableDropdown) {
        return (
        <>
            <Center className={classes.centerItems}>
                <Link href='/mint' className={classes.link}>Mint</Link>
            </Center>
            <Center className={classes.centerItems}>
                <ConnectWalletButton />
            </Center>
        </>
        );
    }

    return (
        <>
            <Link href='/mint' className={classes.link}>Mint</Link>
            <ConnectWalletButton />
        </>
    );
}

const MainNavbar = () => {
    const [ opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();
    return (
        <Header height={HEADER_HEIGHT} mb={120} className={classes.header}>
            <Container className={classes.containerHeader}>
                <Link href='/'>
                    <Image src={NBCLogo} alt='nbc logo' width={40} height={40} priority />
                </Link>
                <Group spacing={20} className={classes.links}>
                    <NavbarItems />
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
                <Transition transition='pop-top-right' duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            <NavbarItems isDropdown />
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    )
}

export default MainNavbar;