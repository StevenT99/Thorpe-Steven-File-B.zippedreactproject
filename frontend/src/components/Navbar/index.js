import React from 'react';
import { Nav, NavLink, NavMenu } from './NavbarElements';
import 'bootstrap/dist/css/bootstrap.min.css';
import mainlogoImage from '../../pages/images/mainlogo.png';

const Navbar = () => {
  return (
    <Nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-start">
        <NavLink to="/" className="navbar-brand">
          <img
            src={mainlogoImage}
            alt="Book of Mormon Literacy Tool"
            style={{ maxHeight: '80px' }}
          />
        </NavLink>
        <NavMenu className="navbar-nav me-auto mb-2 mb-lg-0">
          <NavLink
            to="/"
            className="nav-item nav-link"
            activeStyle={{ fontWeight: 'bold' }}
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className="nav-item nav-link"
            activeStyle={{ fontWeight: 'bold' }}
          >
            Memorization
          </NavLink>
          <NavLink
            to="/podcast"
            className="nav-item nav-link"
            activeStyle={{ fontWeight: 'bold' }}
          >
            Journal
          </NavLink>
        </NavMenu>
      </div>
    </Nav>
  );
};

export default Navbar;
