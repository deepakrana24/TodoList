import React from 'react'
import { Container, Navbar} from "react-bootstrap";

function NavbarComponent() {
  return (
        <Navbar bg="danger" variant='dark'>
            <Container>
                <Navbar.Brand href="https://luezoid.com" title='name' >
                        <h6>
                            Luezoid Todo App
                        </h6>
                </Navbar.Brand>
            </Container>
        </Navbar>


  )
}

export default NavbarComponent;