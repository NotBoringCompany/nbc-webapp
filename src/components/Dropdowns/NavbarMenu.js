import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';

const { createStyles, Menu, Button } = require('@mantine/core');
const { IconChevronDown, IconLayoutDashboard, IconLogout } = require('@tabler/icons');

const useStyles = createStyles((theme) => ({
  menuDropdown: {
      marginTop: 3,
      backgroundColor: '#000000',
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
}));

const NavbarMenu = () => {
    const { classes } = useStyles();
    const { logout } = useMoralis();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/');
      }
    return (
        <Menu shadow='md' width={200}>
            <Menu.Target>
                <Button className={classes.connectButton}>
                <p className={classes.myAccountParagraph}>My Account</p>
                <IconChevronDown size={15} />
                </Button>
            </Menu.Target>
        
            <Menu.Dropdown className={classes.menuDropdown}>
                <Menu.Item icon={<IconLayoutDashboard size={14} />}>Dashboard</Menu.Item>

                <Menu.Divider />
                
                <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>Logout</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}

export default NavbarMenu;