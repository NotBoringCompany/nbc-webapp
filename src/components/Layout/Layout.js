import React from 'react'
import { Container } from '@mantine/core';
import MainNavbar from '../Navbar/Navbar';


const Layout = ({children}) => {
  return (
      <div sx={{display: 'flex', flexDirection: 'column'}}>
          <MainNavbar />
          <Container>
              {children}
          </Container>
      </div>
  )
}

export default Layout