import React, { useState } from "react"
import { Container, Row, Col,Progress } from "reactstrap"
import Settings from "./DashboardComponents/FilterTabs"
import Apaexlinecolumn from "./DashboardComponents/apaexlinecolumn"
import OptionChainTableContainer from "../../components/Common/derivativesComponent/OptionChainTableContainer"
import ProgressBar from "components/Common/ProgressBar"
import CardDrag from "pages/Dashboard/components/CardDrag"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { columnsNiftyOption } from "./optionChainData.js"
import { useEffect } from "react"
import {
  getStrikePrice,
  getExpairDate,
  getOptionDataTable,
} from "../../services/api/api-service"
const index = () => {
  //meta title
  const [strickPrice, setStrikePrice] = useState(0)
  const [list, setlist] = useState([])
  document.title = "Derivative Dashboard"
  const [type, settype] = useState("Nifty")
  const [dataCall, setdatacall] = useState([])
  const [dataPut, setdataput] = useState([])
  const [category, setcategory] = useState([])
  let [totalcal, setTotalCal] = useState(0)
  let [totalput, setTotalPut] = useState(0)
  let [callPers, setcallPers] = useState(0)
  let [putPers, setputPers] = useState(0)
  const [expdatelist, setExpDate] = useState([])
  useEffect(() => {
    console.log(type)
    setdatacall([])
    setdataput([])
    getStrikePrice(type)
      .then(resultStrike => {
        const explist = []
        setTimeout(() => {
          //console.log(resultStrike.StrikePrice.value)
          getExpairDate(type)
            .then(result => {
              result.list.map(item => explist.push({ value: item }))
              getOptionDataTable(
                type,
                result.today,
                resultStrike.StrikePrice.value
              )
                .then(result1 => {
                  const dataOption = []
                  result1.list.map(item => {
                    dataOption.push({
                      openIntCE: item.call.OPENINTEREST,
                      openInterestChangeCE: item.call.OPENINTERESTCHANGE,
                      totalQtyTradedCE: item.call.TOTALQTYTRADED,
                      priceChangeCE: item.call.PRICECHANGE,
                      lastTradedPriceCE: item.call.LASTTRADEPRICE,
                      strikePrice: item.call.value,
                      stricke: item.strike,
                      lastTradedPricePE: item.put.LASTTRADEPRICE,
                      priceChangePE: item.put.PRICECHANGE,
                      totalQtyTradedPE: item.put.LASTTRADEPRICE,
                      openInterestChangePE: item.put.OPENINTERESTCHANGE,
                      openIntPE: item.put.OPENINTEREST,
                    })
                  })
                  setlist(dataOption)
                  setStrikePrice(result1.strike)

                  const datacl = []
                  const datap = []
                  const cdata = []
                  let ctotal = 0
                  let ptotal = 0
                  let totalCP = 0
                  let callP = 0
                  let putP = 0
                  let ciototal = 0
                  let piogetotal = 0
                  result1.list.map(item => {
                    datacl.push(item.call.OPENINTERESTCHANGE)
                    datap.push(item.put.OPENINTERESTCHANGE)
                    cdata.push(item.put.value)
                    ctotal += Number(item.call.OPENINTERESTCHANGE)
                    ptotal += Number(item.put.OPENINTERESTCHANGE)
                    ciototal += Number(item.call.OPENINTEREST)
                    piogetotal += Number(item.put.OPENINTEREST)
                  })
                  totalCP = ciototal + piogetotal
                  callP = (ciototal / totalCP) * 100
                  putP = (piogetotal / totalCP) * 100
                  setdatacall(datacl)
                  setdataput(datap)
                  setcategory(cdata)
                  setTotalCal(ctotal)
                  setTotalPut(ptotal)
                  setcallPers(callP)
                  setputPers(putP)
                  setExpDate(explist)
                  console.log("expdate", expdatelist)
                })
                .catch(err => {
                  console.error("Error fetching getOptionDataTable:", err)
                })
            })
            .catch(err => {
              console.error("Error fetching getExpairDate:", err)
            })
        }, 1000)
      })
      .catch(err => {
        console.error("Error fetching getStrikePrice:", err)
      })
  }, [type])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title="Derivative"
            breadcrumbItem="Derivative Dashboard"
          />

          <Row>
            <Col md={7}>
              {!_.isEmpty(dataCall) && (
                <Apaexlinecolumn
                  dataCallValue={dataCall}
                  dataPutValue={dataPut}
                  categoryValue={category}
                  titleName={"Intraday data chart"}
                  horizontal={true}
                  dataColors='["#ed0c00","#8afff3"]'
                />
              )}
            </Col>
            <Col md={5}>
            
              {totalcal != 0 && (
                <Settings
                  expdatelist={expdatelist}
                  totalcal={totalcal}
                  totalput={totalput}
                  putPers={putPers}
                  callPers={callPers}
                  settype={settype}
                />
              )}
            </Col>
            <Col md={4} id="right">
              <CardDrag header={`${type} Progress Chart`}>
                <ProgressBar type={type} />
              </CardDrag>
            </Col>
            <Col md={8}>
              <OptionChainTableContainer
                columns={columnsNiftyOption}
                data={list}
                isGlobalFilter={false}
                isAddOptions={false}
                strickP={strickPrice}
                customPageSize={10}
                isPagination={false}
                tableClass="align-middle table-nowrap table-check table-hover table"
                theadClass="table-light"
                tbodyClass="table-striped"
                paginationDiv="col-12"
                pagination="justify-content-center pagination pagination-rounded"
                PCRstatus={false}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default index
