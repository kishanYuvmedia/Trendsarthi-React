import React from "react";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
function Navbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light sticky"
        style={{ backgroundColor: "#103700" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">
            <img src="scalping-logo.png" class="navbar-brand-img" alt="..." />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fe fe-x"></i>
            </button>
            <Nav defaultActiveKey="/home" className="navbar-nav ms-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/plan">Plan</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <a
              class="navbar-btn btn btn-sm btn-success lift ms-auto"
              href="http://user.trendsarthi.com/login"
              target="_blank"
            >
              Login/Registration
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
