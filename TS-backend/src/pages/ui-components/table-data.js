import React from "react"
import { MDBDataTable } from "mdbreact"
export default function TableData(props) {
  const data = props.tabledata
  return <MDBDataTable striped bordered small data={data} />
}
