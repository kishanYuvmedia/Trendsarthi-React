import React, { useEffect, useState } from "react"
import RankingTable from "./ranking-table"
import { getProductsList } from "services/api/api-service"
import { isEmpty } from "lodash"
export const FNO = ({ props }) => {
  const [list, setlist] = useState([])
  useEffect(() => {
    getProductsList().then(data => {
      if (!isEmpty(data)) {
        const data1 = []
        data.result.list.map(item => {
          data1.push({
            fitMin: item,
            thartyMin: item,
            houreMin: item,
            Daily: item,
            Weekly: item,
          })
        })
        setlist(data1)
      }
    })
  }, [])
  return (
    <>
      <RankingTable
        type={"Strongest"}
        data={list}
        limit={25}
        title={"Strength Ranking"}
        top={5}
      />
      <RankingTable
        type={"Weakest"}
        data={list}
        limit={25}
        title={"Strength Ranking"}
        top={5}
      />
      <RankingTable
        type={"FNO Ranking"}
        data={list}
        limit={list.length}
        title={"FNO Ranking"}
        top={list.length}
      />
    </>
  )
}
