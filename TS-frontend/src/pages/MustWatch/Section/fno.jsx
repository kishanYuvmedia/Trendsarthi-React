import React, { useEffect, useState } from "react"
import RankingTable from "./ranking-table"
import { getNiftyRankingTime } from "services/api/api-service"
import { isEmpty } from "lodash"
export const FNO = ({ props }) => {
  const [list, setlist] = useState([])
  const [type, typeList] = useState("MINUTE")
  const typeData = [
    {
      label: "MINUTE",
    },
    { label: "HOUR" },
    { label: "DAY" },
    { label: "WEEK" },
    { label: "MONTH" },
  ];
  const [listData, setlistData] = useState([])
  useEffect(() => {
    getNiftyRankingTime(type).then(data => {
      if (!isEmpty(data)) {
        setlist(data.list)
      }
    })
  }, [])
  return (
    <>
      
    </>
  )
}
