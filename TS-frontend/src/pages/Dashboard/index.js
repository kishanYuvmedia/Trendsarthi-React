import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { Container, Row, Col } from "reactstrap"
import { withTranslation } from "react-i18next"
const Dashboard = props => {
  document.title = "Dashboard | Trendsarthi- React Admin & Dashboard Template"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <div className="card border-bottom">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex">
                    <div className="me-3"></div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2 h1">Welcome to Trendsarthi</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="align-self-center col-lg-4">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <div className="row">
                      <div className="col-4">
                        <div>
                          <p className="text-muted text-truncate mb-2 h5">
                            Nifty Index
                          </p>
                          <h5 className="mb-0">48</h5>
                        </div>
                      </div>
                      <div className="col-4">
                        <div>
                          <p className="text-muted text-truncate mb-2 h5">
                            BankNifty Index
                          </p>
                          <h5 className="mb-0">40</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Row>
        <Col md={6}></Col>
        <Col md={6}></Col>
      </Row>
    </React.Fragment>
  )
}
Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
