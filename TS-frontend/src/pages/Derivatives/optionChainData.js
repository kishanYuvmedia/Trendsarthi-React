import { useSortBy } from "react-table"

const columnsNiftyOption = [
  {
    Header: "Open Int.",
    accessor: "openIntCE",
    canSort: true,
  },
  {
    Header: "Open Interest Change",
    accessor: "openInterestChangeCE",
    canSort: true,
  },
  {
    Header: "Total Qty Traded",
    accessor: "totalQtyTradedCE",
    canSort: true,
  },
  {
    Header: "Price Change %",
    accessor: "priceChangeCE",
    canSort: true,
  },
  {
    Header: "Last Traded Price",
    accessor: "lastTradedPriceCE",
    canSort: true,
  },
  {
    Header: "Strike Price",
    accessor: "strikePrice",
    className: "custom-strike-price",
    canSort: true,
  },
  {
    Header: "Last Traded Price",
    accessor: "lastTradedPricePE",
    canSort: true,
  },
  {
    Header: "Price Change %",
    accessor: "priceChangePE",
    canSort: true,
  },
  {
    Header: "Total Qty Traded",
    accessor: "totalQtyTradedPE",
    canSort: true,
  },
  {
    Header: "Open Interest Change",
    accessor: "openInterestChangePE",
    canSort: true,
  },
  {
    Header: "Open Int.",
    accessor: "openIntPE",
    canSort: true,
  },
]

const dataNiftyOption = [
  {
    sr: "1",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "2",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "3",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "4",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "5",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "6",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "7",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "8",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
  {
    sr: "9",
    openIntCE: "4789",
    openInterestChangeCE: "35900",
    totalQtyTradedCE: "18987",
    priceChangeCE: "987%",
    lastTradedPriceCE: "9875",

    strikePrice: "18950",

    lastTradedPricePE: "19.65",
    priceChangePE: "43%",
    totalQtyTradedPE: "32883650",
    openInterestChangePE: "481100",
    openIntPE: "1658050",
  },
]

export { dataNiftyOption, columnsNiftyOption }
