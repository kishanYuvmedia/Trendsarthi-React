import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Table, Row, Col, Button } from "reactstrap"
const IntradayTableDeshboad = ({ data }) => {
  const [startTime, setStartTime] = useState("09:30") // Set your desired start time
  const [endTime, setEndTime] = useState("15:30") // Set your desired end time
  const [timeArray, setTimeArray] = useState([])
  console.log("get data indicator", data)
  const handlerTime = time => {
    const start = new Date(`2023-01-01T${startTime}:00`)
    const end = new Date(`2023-01-01T${endTime}:00`)
    const times = []
    while (start <= end) {
      times.push(formatTime(start))
      start.setMinutes(start.getMinutes() + time)
    }
    setTimeArray(times)
    console.log("time set", times)
  }
  useEffect(() => {
    handlerTime(5)
  }, [])
  const formatTime = date => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }
  return (
    <Fragment>
      <Row className="mb-2">
        <Table dark responsive style={{ backgroundColor: "#2a3042" }}>
          <thead>
            <tr>
              <th colSpan={9}>
                Intraday Data
                <Link
                  color="info"
                  className="float-end m-1 btn-outline-primary"
                  size="sm"
                >
                  More
                </Link>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Time</th>
              <th>Diff</th>
              <th>PCR</th>
              <th>Option Signal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((list, index) => (
              <>
                <tr key={index}>
                  <td>{list.time}</td>

                  <td
                    className={
                      list.difference > 1 ? "text-success" : "text-danger"
                    }
                  >
                    {list.difference}
                  </td>
                  <td className={list.pcr > 1 ? "text-success" : "text-danger"}>
                    {list.pcr}
                  </td>
                  <td
                    className={
                      list.optionSignal === "BUY"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {list.optionSignal}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Row>
    </Fragment>
  )
}

IntradayTableDeshboad.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default IntradayTableDeshboad
