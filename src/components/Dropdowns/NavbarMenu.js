import { createStyles, Menu, Button, Divider, Text } from '@mantine/core';
import { IconUser, IconChevronDown, IconLogout, IconLayoutDashboard, IconBox, IconReceipt } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMoralis } from 'react-moralis';
import AuthContext from '../Auth/AuthContext';

const useStyles = createStyles((theme) => ({
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
}));

const NavbarMenu = () => {
  const { classes } = useStyles();
  const { logout } = useMoralis();
  const router = useRouter();

  const { emailUser, logout: emailLogout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (emailUser) {
      await emailLogout();
    } else {
      await logout();
    }
    router.replace('/');
  };
  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button className={classes.connectButton}>
          <p className={classes.myAccountParagraph}>My Account</p>
          <IconChevronDown size={15} />
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.menuDropdown}>
        <Menu.Item
          onClick={() => router.push('/account/dashboard')}
          icon={<IconLayoutDashboard size={14} />}
        >
          <Text>Account Dashboard</Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push('/account/settings')}
          icon={<IconUser size={14} />}
        >
          <Text>Account Settings</Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push('/account/inventory')}
          icon={<IconBox size={14} />}
        >
          <Text>Inventory</Text>
        </Menu.Item>
        <Menu.Item
          onClick={() => router.push('/account/redeem-code')}
          icon={<IconReceipt size={14} />}
        >
          <Text>Redeem Code</Text>
        </Menu.Item>
        <Divider />
        <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarMenu;
