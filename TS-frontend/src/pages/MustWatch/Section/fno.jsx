import React, { useEffect, useState } from "react"
import RankingTable from "./ranking-table"
import { getNiftyRanking } from "services/api/api-service"
import { isEmpty } from "lodash"
export const FNO = ({ props }) => {
  const [list, setlist] = useState([])
  const [listData, setlistData] = useState([])
  useEffect(() => {
    getNiftyRanking().then(data => {
      if (!isEmpty(data)) {
        setlist(data.list)
        setlistData(data.list)
      }
    })
  }, [])
  return (
    <>
      <RankingTable
        type={"Strongest"}
        data={list}
        limit={8}
        title={"Strength Ranking"}
        top={5}
      />
      <RankingTable
        type={"Weakest"}
        data={listData.reverse()}
        limit={8}
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
