import React from 'react'
import { Navbar ,Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <>
      <Navbar className="bg-info">
        <Container>

        <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand href="">
            <img
              alt=""
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Media_Player_Windows_11_logo.svg/2048px-Media_Player_Windows_11_logo.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Media Player
          </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
