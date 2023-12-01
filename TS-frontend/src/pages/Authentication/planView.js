import React from "react"
import { useState } from "react"
import "./pricing.css"
import config from "constants/config"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getUserOne,getPlanId } from "services/api/api-service"
export default function PlanView() {
  let { username, planId } = useParams()
  const [status, setStatus] = useState(false)
  const [userData, setUserData] = useState([]);
  const [userPlan, setPlanDetails] = useState([])
  const [orderDetails, setOrderDetails] = useState({
    amount: 0,
    currency: "INR",
    receipt: "receipt_1",
    notes: {
      email: "",
      name: "",
      planId: "",
    },
  })
  useEffect(() => {
    getUserOne(username).then(result => {
      setUserData(result)
    })
    getPlanId(planId).then(result => {
        setUserData(result)
      })
  },[])
  return <div>{status && <div class="loading"></div>}</div>
}
