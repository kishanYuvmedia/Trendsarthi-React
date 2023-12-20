import React, { useEffect, useState } from "react"
import RankingTable from "./ranking-table"
import { getNiftyRanking } from "services/api/api-service"
import { isEmpty } from "lodash"
export const FNO = ({ props }) => {
  const [list, setlist] = useState([])
  useEffect(() => {
    getNiftyRanking().then(data => {
      if (!isEmpty(data)) {
        setlist(data.list)
      }
    })
  }, [])
  return (
    <>
      <RankingTable
        type={"Strongest"}
        data={list}
        limit={5}
        title={"Strength Ranking"}
        top={5}
      />
      <RankingTable
        type={"Weakest"}
        data={list.reverse()}
        limit={5}
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
