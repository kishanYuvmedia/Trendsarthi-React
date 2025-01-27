import React from "react"
import { Card, CardBody, Badge, Button, CardTitle } from "reactstrap"

import BarChart from "../../AllCharts/apex/barchart"
import DountChart from "../../AllCharts/apex/dountchart"
const DateDropdown = ({ dates }) => {
  return (
    <select className="form-control" style={{ width: "200px" }}>
      <option>Expair Date</option>
      {dates.map((date, index) => (
        <option key={index} value={date.value}>
          {date.value}
        </option>
      ))}
    </select>
  )
}
const FilterTabs = ({ totalput, totalcal, putPers, callPers, expdatelist, settype }) => {
  return (
    <React.Fragment>
      <Card
        className="my-2 Drag "
        style={{
          border: '1px solid transparent',
          borderRadius: '14px',
          boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
          padding: '10px',
          backgroundColor: "#181a33"
        }}
      >

        <div className="d-flex">
          <div className="me-3">
            <div className="d-flex flex-wrap gap-2">
              <Button
                color="primary"
                onClick={() => settype('NIFTY')}
                className="btn btn-soft-info waves-effect waves-light w-lg fs-5 rounded fw-bold"
              >
                NIFTY
              </Button>
              <Button
                color="success"
                onClick={() => settype('BANKNIFTY')}
                className="btn btn-soft-success waves-effect waves-light w-lg fs-5 rounded fw-bold"
              >
                BANK NIFTY
              </Button>
              <Button
                color="warning"
                onClick={() => settype('MIDCPNIFTY')}
                className="btn btn-soft-warning waves-effect waves-light w-lg fs-5 rounded fw-bold"
              >
                MIDCAP NIFTY
              </Button>
              <Button
                color="danger"
                onClick={() => settype('FINNIFTY')}
                className="btn btn-soft-danger waves-effect waves-light w-lg fs-5 rounded fw-bold"
              >
                FIN NIFTY
              </Button>
              <DateDropdown dates={expdatelist} />
            </div>
          </div>
        </div>
      </Card>

      <Card
        className="my-2 Drag "
        style={{
          border: '1px solid transparent',
          borderRadius: '14px',
          boxShadow: '0 0 0 1px rgba(56, 62, 214, 0.5), 0 0 0 2px rgba(18, 18, 20, 0.5)',
          padding: '10px',
          backgroundColor: "#181a33"
        }}
      >
        <p className="text-gradient" style={{ fontSize: 20 }}>Progress Chart</p>
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
              width={200}
            />
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
          <div className="col-md-6">
            <div className="">
              <h5 className="card-title mb-3 me-2">Total Call vs Total Put</h5>
              <DountChart
                labelData={["Total Call", "Total Put"]}
                callPers={callPers}
                putPers={putPers}
                dataColors='["--bs-success", "--bs-danger"]'
              />
              <div className="text-center text-muted fw-bold fs-6 text-white mb-1 mt-3">
                P/C Ratio Net
              </div>
              <div className="row">
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
        </div>
      </Card>
    </React.Fragment>
  )
}

export default FilterTabs
