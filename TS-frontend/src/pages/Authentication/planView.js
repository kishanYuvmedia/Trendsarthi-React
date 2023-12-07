import React, { useEffect, useState } from "react"
import config from "constants/config"
import { useParams, Link } from "react-router-dom"
import { getUserOne, getPlanId } from "services/api/api-service"
import { Card, ListGroup } from "react-bootstrap"

export default function PlanView() {
  let { username, planId } = useParams()
  const [status, setStatus] = useState(false)
  const [userData, setUserData] = useState([])
  const [userPlan, setPlanDetails] = useState([])
  const [orderDetails, setOrderDetails] = useState()
  const loadRazorpayScript = () => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    document.body.appendChild(script)
    script.onload = () => {
      const options = {
        key: config.RAZORPAY_KEY_ID, // Replace with your actual Key ID
        amount: Number(userPlan.pricing) * 100,
        currency: "INR",
        description: "Plan Buy",
        image: "https://trendsarthi.com/scalping-logo.png",
        prefill: {
          email: userData.username,
          contact: userData.contactNumber,
        },
        theme: {
          color: "#000987", // Replace with your desired background color
        },
        handler: function (response) {
          alert("Payment successful!")
          alert(response.razorpay_payment_id)
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

      const rzp1 = new window.Razorpay(options)
      document.getElementById("rzp-button1").onclick = function (e) {
        rzp1.open()
        e.preventDefault()
      }
    }
  }

  useEffect(() => {
    getUserOne(username).then(resultUser => {
      setUserData(resultUser)
      getPlanId(planId).then(resultPlan => {
        setPlanDetails(resultPlan)
      })
    })
    loadRazorpayScript()
  }, [])
  return (
    <div>
      <Card style={{marginTop:'20%'}}>
        <Card.Body>
          <Card.Title style={{textAlign:'center',fontFamily:"cursive"}}>Buy Plan</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>
            Amount: <strong style={{float:"right"}}>{userPlan.pricing}</strong>
          </ListGroup.Item>
        </ListGroup>
        <button className="btn btn-info w-100 mt-5" id={"rzp-button1"}>
            Pay Now
          </button>
      </Card>
    </div>
  )
}
