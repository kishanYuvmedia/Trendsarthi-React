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
import DountChart from "pages/AllCharts/chartjs/dountchart"
const DateDropdown = ({ dates }) => {
  return (
    <select className="form-control">
      {dates.map((date, index) => (
        <option key={index} value={date.value}>
          {date.value}
        </option>
      ))}
    </select>
  )
}
const FilterTabs = ({ totalput, totalcal, putPers, callPers, expdatelist }) => {
  return (
    <React.Fragment>
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
                  <DateDropdown dates={expdatelist} />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="d-flex flex-wrap align-items-start">
            <h5 className="card-title mb-3 me-2">
              Strike Price vs Call/Put Data
            </h5>
          </div>

          <div className="d-flex flex-wrap">
            <div className="col-md-6">
              <BarChart
                totalput={totalput}
                totalcal={totalcal}
                dataColors='["--bs-success-rgb, 0.8", "--bs-info", "--bs-danger", "--bs-warning"]'
                height={400}
              />
            </div>
            <div className="col-md-6">
              <div className="text-center text-muted fw-bold fs-6 text-white mb-1">
                Change In CE/PE
              </div>
              <div className="row flex-wrap p-3">
                <div className="col text-center">
                  <div className="text-success fw-bold"> Change CE OI</div>
                  <Badge color="success" className=" fs-6 px-3 py-2 mt-2">
                    {totalput}
                  </Badge>
                </div>

                <div className="col text-center">
                  <div className="text-danger fw-bold">Change PE OI</div>
                  <Badge color="danger" className=" fs-6 px-3 py-2 mt-2">
                    {totalcal}
                  </Badge>
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
              <p className="text-muted mb-1"></p>

              <DountChart
                labelData={["Total Call", "Total Put"]}
                callPers={callPers}
                putPers={putPers}
                dataColors='["--bs-success", "--bs-danger"]'
              />
            </div>
            <div className="col-md-6">
              <div className="text-center text-muted fw-bold fs-6 text-white mb-1">
                P/C Ratio Net
              </div>
              <div className="row p-3">
                <div className="col text-center">
                  <div className="text-success fw-bold">Total PE OI</div>
                  <Badge color="success" className=" fs-6 px-3 py-2 mt-2">
                    {Math.round(callPers).toFixed(2)}
                  </Badge>
                </div>

                <div className="col text-center">
                  <div className="text-danger fw-bold">Total CE OI</div>
                  <Badge color="danger" className=" fs-6 px-3 py-2 mt-2">
                    {Math.round(putPers).toFixed(2)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default FilterTabs
