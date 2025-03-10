import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Table, Row, Col, Button } from "reactstrap"
const IntradayTableContainer = ({ data }) => {
  const [startTime, setStartTime] = useState("09:30") // Set your desired start time
  const [endTime, setEndTime] = useState("15:30") // Set your desired end time
  const [timeArray, setTimeArray] = useState([])
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
    handlerTime(5);
  }, [])
  const formatTime = date => {
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    return `${hours}:${minutes}`
  }
  return (
    <Row className="mb-2">
      <Table className="table table-sm table-scroll">
        <thead>
          <tr>
            <th colSpan={9}>
             
              <Button
                color="info"
                className="float-end m-1"
                size="sm"
                outline
                onClick={() => handlerTime(15)}
              >
                15 Min
              </Button>
              <Button
                color="info"
                className="float-end m-1"
                size="sm"
                outline
                onClick={() => handlerTime(5)}
              >
                5 Min
              </Button>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Time</th>
            <th>Call</th>
            <th>Put</th>
            <th>Diff</th>
            <th>PCR</th>
            <th>Option Signal</th>
            <th>VWAP</th>
            <th>Price</th>
            <th>VWAP Signal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((list, index) => (
            <>
              {timeArray.includes(list.time) && (
                <tr key={index}>
                  <td>{list.time}</td>
                  <td
                    className={list.call > 1 ? "text-success" : "text-danger"}
                  >
                    {list.call}
                  </td>
                  <td
                    className={list.put > 1 ? "text-success" : "text-danger"}
                  >
                    {list.put}
                  </td>
                  <td
                    className={
                      list.difference > 1 ? "text-success" : "text-danger"
                    }
                  >
                    {list.difference}
                  </td>
                  <td
                    className={list.pcr > 1 ? "text-success" : "text-danger"}
                  >
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
                  <td>{list.vwap}</td>
                  <td>{list.price}</td>
                  <td
                    className={
                      list.vwapSignal === "BUY"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {list.vwapSignal}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}

IntradayTableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default IntradayTableContainer
