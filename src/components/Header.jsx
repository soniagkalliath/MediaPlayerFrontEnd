import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { UploadCloud } from 'react-feather'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <Navbar className='bg-primary'>
        <Container>
          <Navbar.Brand >
           <Link to={''} style={{textDecoration:'none'}}>
             <UploadCloud color='white'/>
             <span className='text-light'> Veedio.com</span>
           </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
  )
}

export default Header