import PropTypes from "prop-types"
import React from "react"
import {
  Row,
  Col,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap"
//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"
import { useNavigate, Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"
// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"
// actions
import { registerUser } from "../../store/actions"
import logo from "assets/image/scalping-logo.png"
import CarouselPage from "./CarouselPage"
const Login = props => {
  //meta title
  const navigate = useNavigate()
  document.title = "Registration | Trendsarthi"
  const dispatch = useDispatch()
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
      contactName: "",
      contactNumber: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
      contactName: Yup.string().required("Please Enter Your Full Name"),
      contactNumber: Yup.string().required("Please Enter Your Contact Number"),
      confirmPassword: Yup.string().required(
        "Please Enter Your Confirm Password"
      ),
    }),
    onSubmit: values => {
      console.log(values)
      const data = {
        contactName: values.contactName,
        contactNumber: values.contactNumber,
        userType: "user",
        verificationCode: "123",
        status: "I",
        realm: values.contactName,
        username: values.username,
        email: values.username,
        password: values.password,
        emailVerified: false,
      }
      dispatch(registerUser(data, props.router.navigate))
      navigate(`/successfully/${values.username}`, {
        replace: true,
      })
    },
  })
  const selectLoginState = state => state.Login
  const LoginProperties = createSelector(selectLoginState, login => ({
    error: login.error,
  }))
  const { error } = useSelector(LoginProperties)
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />
            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/dashboard" className="d-block card-logo">
                        <img
                          src={logo}
                          alt=""
                          height="50"
                          className="logo-dark-element"
                        />
                        <img
                          src={logo}
                          alt=""
                          height="50"
                          className="logo-light-element"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-success">Welcome Back !</h5>
                        <p className="text-danger">
                          Sign Up to continue to trendsarthi.com.
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={e => {
                            e.preventDefault()
                            validation.handleSubmit()
                            return false
                          }}
                        >
                          {error ? <Alert color="danger">{error}</Alert> : null}

                          <div className="mb-3">
                            <Label className="form-label">Email Address</Label>
                            <Input
                              name="username"
                              className="form-control"
                              placeholder="Enter Email Address"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username &&
                                validation.errors.username
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.username &&
                            validation.errors.username ? (
                              <FormFeedback type="invalid">
                                {validation.errors.username}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Full Name</Label>
                            <Input
                              name="contactName"
                              className="form-control"
                              placeholder="Enter Full Name"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.contactName || ""}
                              invalid={
                                validation.touched.contactName &&
                                validation.errors.contactName
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.contactName &&
                            validation.errors.contactName ? (
                              <FormFeedback type="invalid">
                                {validation.errors.contactName}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Mobile Number</Label>
                            <Input
                              name="contactNumber"
                              className="form-control"
                              placeholder="Enter Mobile Number"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.contactNumber || ""}
                              invalid={
                                validation.touched.contactNumber &&
                                validation.errors.contactNumber
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.contactNumber &&
                            validation.errors.contactNumber ? (
                              <FormFeedback type="invalid">
                                {validation.errors.contactNumber}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <FormFeedback type="invalid">
                                {validation.errors.password}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label className="form-label">
                              Confirm Password
                            </Label>
                            <Input
                              name="confirmPassword"
                              value={validation.values.confirmPassword || ""}
                              type="password"
                              placeholder="Enter Confirm Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.confirmPassword &&
                                validation.errors.confirmPassword
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.confirmPassword &&
                            validation.errors.confirmPassword ? (
                              <FormFeedback type="invalid">
                                {validation.errors.confirmPassword}
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-success btn-block"
                              type="submit"
                            >
                              SignUp
                            </button>
                          </div>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Do you have trendsarthi account ?
                            <Link to="/login" className="fw-medium text-danger">
                              Signin
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} trendsarthi.com. Crafted
                        with <i className="mdi mdi-heart text-danger"></i> by
                        Yuvmedia.in
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default withRouter(Login)

Login.propTypes = {
  history: PropTypes.object,
}
