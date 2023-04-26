import React from "react";
import { Container } from "@mantine/core";
import MainNavbar from "../Navbar/Navbar";

const Layout = ({ children }) => {
	return (
		<div sx={{ display: "flex", flexDirection: "column" }}>
			<MainNavbar />
			<Container sx={{ width: "100%", maxWidth: "100%" }} px={"40px"}>
				{children}
			</Container>
		</div>
	);
};

export default Layout;
