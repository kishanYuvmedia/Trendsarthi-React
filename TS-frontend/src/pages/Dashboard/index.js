import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import { withTranslation } from "react-i18next"
const Dashboard = props => {
  document.title = "Dashboard | Scalping- React Admin & Dashboard Template"
  return (<React.Fragment>
    <div className="page-content">
      {/* <Container fluid>
        <div className="card border-bottom" >
          <div className="card-body">
            <div className="row">
              <div className="col-lg-4">
                <div className="d-flex">
                  <div className="me-3">
                    <img src="/static/media/avatar-1.3921191a8acf79d3e907.jpg" alt="" className="avatar-md rounded-circle img-thumbnail" />
                  </div><div className="flex-grow-1 align-self-center">
                    <div className="text-muted">
                      <p className="mb-2">Welcome to Skote Dashboard</p><h5 className="mb-1">Henry wells</h5>
                      <p className="mb-0">UI / UX Designer</p></div></div></div></div>
              <div className="align-self-center col-lg-4"><div className="text-lg-center mt-4 mt-lg-0">
                <div className="row"><div className="col-4"><div>
                  <p className="text-muted text-truncate mb-2">Total Projects</p>
                  <h5 className="mb-0">48</h5></div></div><div className="col-4"><div>
                    <p className="text-muted text-truncate mb-2">Projects</p>
                    <h5 className="mb-0">40</h5></div></div><div className="col-4"><div>
                      <p className="text-muted text-truncate mb-2">Clients</p><h5 className="mb-0">18</h5>
                    </div></div></div></div></div><div className="d-none d-lg-block col-lg-4">
                <div className="clearfix mt-4 mt-lg-0"><div className="float-end dropdown">
                  <button aria-haspopup="true" className="btn btn-primary" aria-expanded="false">
                    <i className="bx bxs-cog align-middle me-1"></i> Setting</button><div tabindex="-1" role="menu" aria-hidden="true" className="dropdown-menu-end dropdown-menu"><a href="#" tabindex="0" role="menuitem" className="dropdown-item">Action</a><a href="#" tabindex="0" role="menuitem" className="dropdown-item">Another action</a><a href="#" tabindex="0" role="menuitem" className="dropdown-item">Something else</a></div></div></div></div></div></div></div>
      </Container> */}
    </div>
  </React.Fragment>)
}
Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
