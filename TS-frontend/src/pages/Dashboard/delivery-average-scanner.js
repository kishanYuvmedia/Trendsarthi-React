import React, { useEffect, useState } from "react"
import { shortProductListDataList } from "services/api/api-service"
import { Container, Row, Col, Table } from "reactstrap"
import CardDrag from "./components/CardDrag"
import _, { isEmpty } from "lodash"
export default function DeliveryAverageScanner() {
  const [data,setData]=useState([]);
  useEffect(() => {
    shortProductListDataList().then(result => {
      if (!isEmpty(result)) {
        console.log("result", result)
        setData(result);
      }
    })
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <CardDrag header={"Delivery Average Scanner"}>
                <Table dark responsive style={{ backgroundColor: "#2a3042" }}>
                  <thead>
                    <tr>
                      <th>Script</th>
                      <th>Open</th>
                      <th>High</th>
                      <th>Low</th>
                      <th>Close</th>
                      <th>Volume</th>
                      {/* <th>Delivery</th>
                      <th>Average</th>
                      <th>Delivery (%)</th> */}
                    </tr>
                  </thead>
                  <tbody>
                  {data.map((list, index) => (
                    <tr key={index}>
                      <td>{list.INSTRUMENTIDENTIFIER.slice(0, -2)}</td>
                      <td>{list.OPEN}</td>
                      <td>{list.HIGH}</td>
                      <td>{list.LOW}</td>
                      <td>{list.CLOSE}</td>
                      <td>{list.VALUE}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardDrag>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
