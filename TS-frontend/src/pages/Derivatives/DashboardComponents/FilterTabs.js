import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  DropdownItem,
  Badge,
  Button,
  CardTitle,
} from "reactstrap"

import BarChart from "../../AllCharts/chartjs/barchart"


const FilterTabs = () => {
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <CardTitle>Chart Options</CardTitle>

            <div className="d-flex">
              <div className="me-3">

                <div className="d-flex flex-wrap gap-2">
                  <Button
                    color="primary"
                    className="btn btn-soft-info waves-effect waves-light w-lg fs-5 rounded fw-bold"
                  >
                    NIFTY
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-soft-success waves-effect waves-light w-lg fs-5 rounded fw-bold"
                  >
                    BANK NIFTY
                  </Button>
                  <Button
                    color="warning"
                    className="btn btn-soft-warning waves-effect waves-light w-lg fs-5 rounded fw-bold"
                  >
                    MIDCAP NIFTY
                  </Button>
                  <Button
                    color="danger"
                    className="btn btn-soft-danger waves-effect waves-light w-lg fs-5 rounded fw-bold"
                  >
                    FIN NIFTY
                  </Button>

                </div>
                <div>
                  <div className="col-md-6">
                    <label className="col-md-2 col-form-label">Expiry</label>
                    <select className="form-control">
                      <option selected>Select Expiry Date</option>
                      <option>Large select</option>
                      <option>Small select</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="d-flex flex-wrap align-items-start">
              <h5 className="card-title mb-3 me-2">Strike Price vs Call/Put Data</h5>
            </div>

            <div className="d-flex flex-wrap">
              <div className="col-md-6">
                <p className="text-muted mb-1">Bar Chart</p>

                <BarChart dataColors='["--bs-success-rgb, 0.8", "--bs-success"]' />
              </div>
              <div className="col-md-6">

                <div className="text-center text-muted fw-bold fs-6 text-white mb-1">Change In CE/PE</div>
                <div className="row flex flex-wrap p-3">

                  <div className="col text-center">
                    <div className="text-success fw-bold">Change PE OI</div>
                    <Badge color="success" className=" fs-6 px-3 py-2 mt-2">123456</Badge>
                  </div>

                  <div className="col text-center">
                    <div className="text-danger fw-bold">Change CE OI</div>
                    <Badge color="danger" className=" fs-6 px-3 py-2 mt-2">123456</Badge>
                  </div>

                </div>
              </div>
            </div>
          </CardBody>
        </Card>


        <Card>
          <CardBody>
            <div className="d-flex flex-wrap align-items-start">
              <h5 className="card-title mb-3 me-2">Total Call vs Total Put</h5>
            </div>

            <div className="d-flex flex-wrap">
              <div className="col-md-6">
                <p className="text-muted mb-1">Pie Chart</p>

                <BarChart dataColors='["--bs-success-rgb, 0.8", "--bs-success"]' />
              </div>
              <div className="col-md-6">

                <div className="text-center text-muted fw-bold fs-6 text-white mb-1">P/C Ratio Net</div>
                <div className=" p-3">

                  <div className=" text-center">
                    <div className="text-success fw-bold">Total PE OI</div>
                    <Badge color="success" className=" fs-6 px-3 py-2 mt-2">123456</Badge>
                  </div>

                  <div className=" text-center">
                    <div className="text-danger fw-bold">Total CE OI</div>
                    <Badge color="danger" className=" fs-6 px-3 py-2 mt-2">123456</Badge>
                  </div>

                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        
      </Col>
    </React.Fragment>
  )
}

export default FilterTabs
