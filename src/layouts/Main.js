// import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar  from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

function Main(props) {
    return (
        <Container fluid>
            <Header />
            <div id="main" className="my-5"> 
                {props.children}
            </div>
        </Container>
        
    )
}

export default Main;