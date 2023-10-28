import React from "react"
import RankingTable from "./ranking-table";
export const FNO = ({ props }) => {
    return (<>
       <RankingTable type={"Strongest"} limit={5} title={'Strength Ranking'} />
       <RankingTable type={"Weakest"} limit={5} title={'Strength Ranking'} />
       <RankingTable type={"FNO Ranking"} limit={0} title={'FNO Ranking'} />
    </>);
}
