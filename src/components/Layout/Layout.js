import { Box, Flex, Text } from '@mantine/core';
import React from 'react';
import { Container } from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';
import { useMoralis } from 'react-moralis';
import { IconAlertOctagon } from '@tabler/icons';

const AuthWall = (
	<Flex direction='column' align='center' justify='center'>
		<Box
			sx={(theme) => ({
				borderRadius: theme.radius.md,
				width: '50%',
				border: '2px solid #ca4242',
				padding: '20px',
				textAlign: 'center',
				marginTop: 30,
			})}
		>
			<Flex
				direction='row'
				align='center'
				justify='center'
			>
				<IconAlertOctagon color='#ca4242' size={40} style={{marginRight: 10}} />
				<Text sx={(theme) => ({
					fontSize: 40,
					color: '#ca4242',
					fontWeight: 700
				})}>
					YOU ARE NOT LOGGED IN
				</Text>
			</Flex>
			<Text size='lg'>
				Please connect your wallet to access this page.
			</Text>
		</Box>
	</Flex>
);

const Layout = ({ children, authWallComponent, withAuth = false }) => {
	const { isAuthenticated } = useMoralis();
	const authWall = !!authWallComponent ? authWallComponent : AuthWall;
	return (
		<Flex
			direction='column'
		>
			<MainNavbar />
			<Container sx={{ width: '100%', maxWidth: '100%' }} px={'40px'}>
				{withAuth ? <>{isAuthenticated ? children : authWall}</> : children}
			</Container>
		</Flex>
	);
};

export default Layout;
