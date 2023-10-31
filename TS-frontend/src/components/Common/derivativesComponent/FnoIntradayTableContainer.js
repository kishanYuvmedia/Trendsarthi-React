import React, { Fragment, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Table, Row, Col, Button } from "reactstrap"
const IntradayTableContainer = ({ data }) => {
  const [startTime, setStartTime] = useState("09:30") // Set your desired start time
  const [endTime, setEndTime] = useState("15:30") // Set your desired end time
  const [timeArray, setTimeArray] = useState([])
  useEffect(() => {
    const start = new Date(`2023-01-01T${startTime}:00`)
    const end = new Date(`2023-01-01T${endTime}:00`)
    const times = []
    while (start <= end) {
      times.push(formatTime(start))
      start.setMinutes(start.getMinutes() + 30)
    }
    setTimeout(() => {
      setTimeArray(times)
    }, 1000)
    console.log("data time array", timeArray)
  },[])
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
              <th>Time</th>
              <th>Call</th>
              <th>Put</th>
              <th>Diff</th>
              <th>Option Signal</th>
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
                      className={
                        list.optionSignal === "BUY"
                          ? "text-danger"
                          : "text-success"
                      }
                    >
                      {list.optionSignal}
                    </td>
                   
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </Table>
      </Row>
    </Fragment>
  )
}

IntradayTableContainer.propTypes = {
  preGlobalFilteredRows: PropTypes.any,
}

export default IntradayTableContainer
