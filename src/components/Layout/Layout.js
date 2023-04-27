import { Flex, Text } from "@mantine/core";
import React from "react";
import { Container } from "@mantine/core";
import MainNavbar from "../Navbar/Navbar";
import { useMoralis } from "react-moralis";

const AuthWall = (
	<Flex direction="column" align={"center"} justify="center">
		<Text size={"lg"}>
			Oops! You{"'"}re not logged in. Please connect your wallet to access this
			page.
		</Text>
	</Flex>
);

const Layout = ({ children, authWallComponent, withAuth = false }) => {
	const { isAuthenticated } = useMoralis();
	const authWall = !!authWallComponent ? authWallComponent : AuthWall;
	return (
		<div sx={{ display: "flex", flexDirection: "column" }}>
			<MainNavbar />
			<Container sx={{ width: "100%", maxWidth: "100%" }} px={"40px"}>
				{withAuth ? <>{isAuthenticated ? children : authWall}</> : children}
			</Container>
		</div>
	);
};

export default Layout;
