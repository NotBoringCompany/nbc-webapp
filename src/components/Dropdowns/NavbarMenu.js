import { createStyles, Menu, Button, Divider, Text } from '@mantine/core';
import { IconUser, IconChevronDown, IconLogout, IconLayoutDashboard } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';

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

  const handleLogout = async () => {
    await logout();
    router.reload(window.location.pathname);
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
        <Divider />
        <Menu.Item onClick={handleLogout} icon={<IconLogout size={14} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarMenu;
