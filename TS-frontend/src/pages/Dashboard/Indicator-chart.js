import React, { useEffect, useState } from "react"
import { Container, Row, Col, Card } from "reactstrap"
import CardDrag from "./components/CardDrag"
import _, { isEmpty } from "lodash"
import StockChart from "./components/StockChart"
import { getProductsList, getHistoryList } from "services/api/api-service"
export default function IndicatorChart() {
  const [productList, setProductList] = useState([])
  const [data, setData] = useState([])
  const [selectType, setSelectType] = useState(null)
  useEffect(() => {
    getProductsList().then(result => {
      const listProduct = []
      if (!isEmpty(result)) {
        for (const type of result.result.list.slice(16)) {
          listProduct.push(type)
        }
        getProductDatalist(listProduct[0])
        setProductList(listProduct)
      }
    })
  }, [])
  useEffect(() => {
    getProductDatalist(selectType)
  }, [selectType])
  function getProductDatalist(type) {
    getHistoryList("MINUTE", `${type}-I`, 5000, 5).then(result => {
      const dataResult = []
      if (!isEmpty(result)) {
        console.log("Product stock data", result)
        result.list.map(item =>
          dataResult.push({
            Close: item.CLOSE,
            Date: item.LASTTRADETIME,
            High: item.HIGH,
            Low: item.LOW,
            Open: item.OPEN,
          })
        )
      }
      setData(dataResult)
    })
  }

  return (
    <div>
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Row>
              <Col md={12}>
                <CardDrag header={"Stock Indicator Chart"}>
                  <Row>
                    <Col md={3}>
                      <label className="form-label form-label">
                        Select Product
                      </label>
                      <select
                        name="productType"
                        className="form-control m-3"
                        onChange={event => setSelectType(event.target.value)}
                      >
                        {productList.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                  <StockChart dataList={data} />
                </CardDrag>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    </div>
  )
}
