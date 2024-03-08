import { forEach, isEmpty } from "lodash"
import React, { useEffect, useState } from "react"
import { Row, Col, Progress } from "reactstrap"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
} from "services/api/api-service"
const ProgressBar = ({ type }) => {
  const [price, setPrice] = useState({})
  const [Oty, setOty] = useState({})
  const [priceChange, setPriceChange] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultStrike = await getStrikePrice(type)
        console.log("resultStrike", resultStrike)
        const buyPrice = resultStrike.StrikePrice.Item.BUYPRICE | 0
        const sellprice = resultStrike.StrikePrice.Item.SELLPRICE | 0
        const buyQty = resultStrike.StrikePrice.Item.BUYQTY | 0
        const sellQty = resultStrike.StrikePrice.Item.SELLQTY | 0
        let putPriceChange = 0
        let callPriceChange = 0
        const totalPrice = buyPrice + sellprice
        const buyPriceP = (buyPrice / totalPrice) * 100
        const sellpriceP = (sellprice / totalPrice) * 100
        setPrice({
          buyPrice: buyPriceP,
          sellPrice: sellpriceP,
          buyPriceValue: buyPrice,
          sellPriceValue: sellprice,
        })
        const totalQty = buyQty + sellQty
        const buyQtyP = (buyQty / totalQty) * 100
        const sellQtyP = (sellQty / totalQty) * 100
        setOty({
          buyQty: buyQtyP,
          sellQty: sellQtyP,
          buyQtyValue: buyQty,
          sellQtyValue: sellQty,
        })
        const result = await getExpairDate(type)
        if (!isEmpty(result)) {
          const result1 = await getOptionDataTable(
            type,
            result.today,
            resultStrike.StrikePrice.value
          )
          result1.list.map(lists => {
            putPriceChange += lists.put.PRICECHANGE
            callPriceChange += lists.call.PRICECHANGE
          })
          const totalPriceChange = putPriceChange + callPriceChange
          const putPriceChangeP = (putPriceChange / totalPriceChange) * 100
          const callPriceChangeP = (callPriceChange / totalPriceChange) * 100
          setPriceChange({
            buyPriceChange: putPriceChangeP,
            sellPriceChange: callPriceChangeP,
            buyPriceChangeValue: putPriceChange,
            sellPriceChangeValue: callPriceChange,
          })
        }
      } catch (err) {
        console.error("Error fetching data:", err)
      }
    }
    fetchData()
  }, [type])
  return (
    <React.Fragment>
      <Row>
        <Col md={12} style={{ marginTop: 10, marginBottom: 10 }}>
          {price && (
            <>
              <label
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "200",
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                BID/Ask
              </label>
              <Progress multi style={{ height: "40px", fontSize: 15 }}>
                <Progress bar color="success" value={price.sellPrice}>
                {price.sellPrice?.toFixed(2)}%
                </Progress>
                <Progress bar color="danger" value={price.buyPrice}>
                {price.buyPrice?.toFixed(2)}%
                </Progress>
              </Progress>
              <div style={{display:"flex",justifyContent:'space-around'}}>
                <p> Sell Price: {price.sellPriceValue?.toFixed(2)}</p>
                <p> Buy Price: {price.buyPriceValue?.toFixed(2)}</p>
              </div>
              <label
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "200",
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                Buy Qty. VS Sell Qty
              </label>
              <Progress multi style={{ height: "40px", fontSize: 15 }}>
                <Progress bar color="success" value={Oty.sellQty}>
                  {Oty.sellQty?.toFixed(2)} %
                </Progress>
                <Progress bar color="danger" value={Oty.buyQty}>
                 {Oty.buyQty?.toFixed(2)} %
                </Progress>
              </Progress>
              <div style={{display:"flex",justifyContent:'space-around'}}>
                <p>  Sell Qty : {Oty.sellQtyValue?.toFixed(2)}</p>
                <p> Buy Qty: {Oty.buyQtyValue?.toFixed(2)}</p>
              </div>
              <label
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "200",
                  textAlign: "center",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                Call Price Change vs Put Price Change
              </label>
              <Progress multi style={{ height: "40px", fontSize: 15 }}>
                <Progress
                  bar
                  color="success"
                  value={priceChange.sellPriceChange?.toFixed(2)}
                >
                 {priceChange.sellPriceChange?.toFixed(2)} %
                </Progress>
                <Progress
                  bar
                  color="danger"
                  value={priceChange.buyPriceChange?.toFixed(2)}
                >
                 {priceChange.buyPriceChange?.toFixed(2)} %
                </Progress>
              </Progress>
              <div style={{display:"flex",justifyContent:'space-around'}}>
                <p>  Call Price Change :{priceChange.buyPriceChangeValue?.toFixed(2)}</p>
                <p> Put Price Change:{priceChange.sellPriceChangeValue?.toFixed(2)}</p>
              </div>
            </>
          )}
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default ProgressBar
