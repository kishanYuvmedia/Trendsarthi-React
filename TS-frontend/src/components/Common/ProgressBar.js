import React, { useEffect, useState } from "react"
import { Row, Col, Progress } from "reactstrap"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
} from "services/api/api-service"
const ProgressBar = ({ type }) => {
  let [price, setprice] = useState({})
  let [Oty, setOty] = useState({})
  let [priceChange, setPriceChange] = useState({})
  useEffect(() => {
    getStrikePrice(type)
      .then(resultStrike => {
        console.log("resultStrike", resultStrike)
        const priceArray = []
        const qtyArray = []
        const PriceChangeArray = []
        getExpairDate(type)
          .then(result => {
            getOptionDataTable(
              type,
              result.today,
              resultStrike.StrikePrice.value
            )
              .then(result1 => {
                let buyPrice = 0
                let sellprice = 0
                let buyQty = 0
                let sellQty = 0
                let buyPriceChange = 0
                let sellPriceChange = 0
                result1.list.map(item => {
                  buyPrice += Number(item.call.OPENINTERESTCHANGE)
                  sellprice += Number(item.put.OPENINTERESTCHANGE)
                  buyQty += Number(item.call.OPENINTEREST)
                  sellQty += Number(item.put.OPENINTEREST)
                  buyPriceChange += Number(item.call.OPENINTEREST)
                  sellPriceChange += Number(item.put.OPENINTEREST)
                })
                let totalPrice = buyPrice + sellprice
                let buyPriceP = (buyPrice / totalPrice) * 100
                let sellpriceP = (sellprice / totalPrice) * 100
                priceArray.push({
                  buyPrice: buyPriceP,
                  sellPrice: sellpriceP,
                  buyPriceValue: buyPrice,
                  sellPriceValue: sellprice,
                })
                let totalQty = buyQty + sellQty
                let buyQtyP = (buyQty / totalQty) * 100
                let sellQtyP = (sellQty / totalQty) * 100
                qtyArray.push({
                  buyQty: buyQtyP,
                  sellQty: sellQtyP,
                  buyQtyValue: buyQty,
                  sellQtyValue: sellQty,
                })
                let totalPriceChange = buyPriceChange + sellPriceChange
                let buyPriceChangeP = (buyQty / totalPriceChange) * 100
                let sellPriceChangeP = (sellQty / totalPriceChange) * 100
                PriceChangeArray.push({
                  buyPriceChange: buyPriceChangeP,
                  sellPriceChange: sellPriceChangeP,
                  buyPriceChangeValue: buyQty,
                  sellPriceChangeValue: sellQty,
                })
              })
              .catch(err => {
                console.error("Error fetching getOptionDataTable:", err)
              })
          })
          .catch(err => {
            console.error("Error fetching getExpairDate:", err)
          })
        console.log("PriceChangeArray", priceArray)
        console.log("qtyArray", qtyArray)
        console.log("PriceChangeArray", PriceChangeArray)
        setprice(priceArray)
        setOty(qtyArray)
        setPriceChange(PriceChangeArray)
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
  }, [type])
  return (
    <React.Fragment>
      <Row>
        <Col md={12} style={{ marginTop: 10, marginBottom: 10 }}>
          <label
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "200",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            BID/Ask
          </label>
          <Progress multi style={{ height: "30px" }}>
            <Progress bar color="success" value={price.sellPrice}>
              `{price.sellPrice}%`
            </Progress>
            <Progress bar color="danger" value={price.buyPrice}>
              `{price.buyPrice}%`
            </Progress>
          </Progress>
          <label
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "200",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Buy Qty. VS Sell Qty
          </label>
          <Progress multi style={{ height: "30px" }}>
            <Progress bar color="success" value={Oty.sellQty}>
              `{Oty.sellQty}%`
            </Progress>
            <Progress bar color="danger" value={Oty.buyQty}>
              `{Oty.buyQty}%`
            </Progress>
          </Progress>
          <label
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "200",
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Call Price Change vs Put Price Change
          </label>
          <Progress multi style={{ height: "30px" }}>
            <Progress bar color="success" value={priceChange.sellPriceChange}>
              `{priceChange.sellPriceChange}%`
            </Progress>
            <Progress bar color="danger" value={priceChange.buyPriceChange}>
              `{priceChange.buyPriceChange}%`
            </Progress>
          </Progress>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ProgressBar
