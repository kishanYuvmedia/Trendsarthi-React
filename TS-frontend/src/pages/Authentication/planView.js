import React, { useEffect, useState } from "react"
import config from "constants/config"
import { useParams, Link } from "react-router-dom"
import {
  getUserOne,
  getPlanId,
  createOrder,
  updateTdUsers,
} from "services/api/api-service"
import { Card, ListGroup } from "react-bootstrap"
import { isEmpty } from "lodash"
export default function PlanView() {
  let { username, planId } = useParams()
  const [status, setStatus] = useState(true)
  const [userData, setUserData] = useState({})
  const [userPlan, setPlanDetails] = useState({})
  const [dateExpair, setDateExpair] = useState(null)
  const loadRazorpayScript = (resultUser, resultPlan, dateexpairy) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    script.onload = () => {
      const options = {
        key: config.RAZORPAY_KEY_ID, // Replace with your actual Key ID
        amount: resultPlan.pricing * 100,
        currency: "INR",
        name: "Trendsarthi",
        description: "Plan Buy",
        image: "https://trendsarthi.com/logo150.png",
        prefill: {
          email: resultUser.username,
          contact: resultUser.contactNumber,
        },
        theme: {
          color: "#000987", // Replace with your desired background color
        },
        handler: function (response) {
          //alert("Payment successful!")
          //alert(response.razorpay_payment_id)
          const dataUpdatePayment = {
            userId: resultUser.id,
            username: resultUser.username,
            payType: "Online",
            gateway: "razorpay",
            referenceId: resultUser.id,
            payamount: resultPlan.pricing,
            discount: 0,
            transactionId: response.razorpay_payment_id,
          }
          createOrder(dataUpdatePayment).then(result => {
            console.log("userData data", userData)
            if (!isEmpty(result)) {
              const updateUser = {
                ...resultUser,
                planId: result.id,
                status: "A",
                expairyDate:dateexpairy,
              }
              console.log("updateUser", updateUser)
              updateTdUsers(updateUser).then(result => {
                if (!isEmpty(result)) {
                  setStatus(false)
                }
              })
            } else {
              alert("data not get order")
            }
          })
        },
        modal: {
          ondismiss: function () {
            if (window.confirm("Are you sure you want to close the form?")) {
              console.log("Checkout form closed by the user")
            } else {
              console.log("Complete the Payment")
            }
          },
        },
      }
      console.log(options)
      const rzp1 = new window.Razorpay(options)
      document.getElementById("rzp-button1").onclick = function (e) {
        rzp1.open()
        e.preventDefault()
      }
    }
  }
  function calculateExpiryDate(durationMonths) {
    let startDate = new Date()
    startDate.setMonth(startDate.getMonth() + durationMonths)
    let expiryDate = startDate.toISOString().split("T")[0]
    return expiryDate
  }
  useEffect(() => {
    getUserOne(username).then(resultUser => {
      setUserData(resultUser)
      getPlanId(planId).then(resultPlan => {
        setPlanDetails(resultPlan)
        if (resultPlan.Duration === "Month") {
          const dateexpairy = calculateExpiryDate(resultPlan.durationValue)
          console.log(dateexpairy)
          loadRazorpayScript(resultUser, resultPlan, dateexpairy)
          setDateExpair(dateexpairy)
        } else if (resultPlan.Duration === "Year") {
          const dateexpairy = calculateExpiryDate(12)
          console.log(dateexpairy)
          loadRazorpayScript(resultUser, resultPlan, dateexpairy)
          setDateExpair(dateexpairy)
        }
      })
    })
  }, [])
  return (
    <div>
      {status && (
        <Card style={{ marginTop: "20%" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center", fontFamily: "cursive" }}>
              Buy Plan
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Amount:{" "}
              <strong style={{ float: "right" }}>{userPlan.pricing}</strong>
            </ListGroup.Item>
          </ListGroup>
          <button className="btn btn-info w-100 mt-5" id={"rzp-button1"}>
            Pay Now
          </button>
        </Card>
      )}
      {status == false && (
        <Card className="text-center" style={{ marginTop: "20%" }}>
          <Card.Header>Successfully Payment</Card.Header>
          <Card.Body>
            <Card.Title>Subscription is activated</Card.Title>
            <Card.Text style={{ color: "#fff" }}>
              Your plan is activated if you have any issue subscritpion Please
              Call and email on support.
            </Card.Text>
            <Link to="/login" className="btn btn-success w-100 pb-2">
              Login Your account
            </Link>
          </Card.Body>
        </Card>
      )}
    </div>
  )
}
