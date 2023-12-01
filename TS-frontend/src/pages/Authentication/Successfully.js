import PropTypes from "prop-types"
import React from "react"
import { Row, Col, Card, CardBody, Container, Input, Label } from "reactstrap"
import withRouter from "components/Common/withRouter"
import { useState } from "react"
import { verifyOtp } from "services/api/api-service"
import { useParams } from "react-router-dom"
import { isEmpty } from "lodash"
const Successfully = () => {
  let { username } = useParams()
  //meta title
  document.title = "Otp Verification | Trendsarthi"
  const [otpnumber, setotpnumber] = useState(null)
  const [error, seterror] = useState("")
  const [status, setStatus] = useState(false)

  const verifyOtpHandler = () => {
    console.log(username, otpnumber)
    verifyOtp(username, otpnumber).then(result => {
      if (isEmpty(result)) {
        seterror("Otp not verify")
      } else {
      }
    })
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            {!status && (
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <CardBody className="pt-6">
                    <p className="text-white text-center">
                      Thank you for register your account please visit your
                      email{" "}
                      <strong style={{ color: "red" }}>{username} </strong>
                      and verify otp Number
                    </p>
                    <div className="mb-3">
                      <Label className="form-label">OTP</Label>
                      <Input
                        name="otp"
                        className="form-control"
                        placeholder="OTP"
                        type="number"
                        onChange={e => setotpnumber(e.target.value)}
                        max={6}
                      />
                      <strong style={{ color: "red" }}>{error}</strong>
                    </div>
                    <Row className="mb-3">
                      <Col className="text-end">
                        <button
                          className="btn btn-primary w-md w-100"
                          type="submit"
                          onClick={verifyOtpHandler}
                        >
                          Verify Otp
                        </button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            )}
            {status && (
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden">
                  <CardBody className="pt-6">
                    <p className="text-white text-center"></p>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Successfully.propTypes = {
  history: PropTypes.object,
}

export default withRouter(Successfully)
