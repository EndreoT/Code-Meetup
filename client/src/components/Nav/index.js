import React from 'react';
import {Nav, Navbar, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import Login from '..//googleLogin';

function Navigation() {
  return (
    <div>
          <Navbar bg="info" expand="lg">
        <Navbar.Brand href="#home">
            <span>&#60;</span>
            rendezvous 
            <span>&#8725;</span>
            <span>&#62;</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Login />
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/userProfile/:id">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/events">Events</NavDropdown.Item>
              <NavDropdown.Item href="/createEvent">Create Event</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-dark">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
