import PropTypes from "prop-types"
import React from "react"
import {
  Row,
  Col,
  CardBody,
  Card,
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
import { Link } from "react-router-dom"
import withRouter from "components/Common/withRouter"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

// actions
import { loginUser } from "../../store/actions"

import logo from "assets/image/scalping-logo.png"
import CarouselPage from "./CarouselPage"
const Login = props => {
  //meta title
  document.title = "Login | Scalping"

  const dispatch = useDispatch()

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(loginUser(values, props.router.navigate))
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
                          Sign in to continue to trendsarthi.com.
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

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>

                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-success btn-block"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                          <div className="mt-4 text-center">
                            <Link
                              to="/forgot-password"
                              className="text-primary"
                            >
                              <i className="mdi mdi-lock me-1" />
                              Forgot your password?
                            </Link>
                          </div>
                        </Form>

                        <div className="mt-5 text-center">
                          <p>
                            Don&apos;t have an account ?
                            <Link
                              to="register"
                              className="fw-medium text-danger"
                            >
                              Signup now
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} http://trendsarthi.com/.
                        Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
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
