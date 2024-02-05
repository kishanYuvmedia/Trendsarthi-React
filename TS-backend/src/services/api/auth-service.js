import apiKit from "./axios-base"
import {
  getLocalData,
  removeLocalData,
  storeLocalData,
} from "../global-storage"
const login = (username, password) => {
  return new Promise((resolve, reject) => {
    apiKit
      .post("/TdUsers/login?include=user", { username, password })
      .then(function (response) {
        storeLocalData("accessToken", response.data.id)
        storeLocalData("userId", response.data.userId)
        storeLocalData("authUser", JSON.stringify(response.data.user))
        resolve(response.data.id)
        console.log("login User", response.data)
      })
      .catch(function (error) {
        console.error(`Error:${error}`)
        reject(error)
      })
  })
}
const signup = (
  contactName,
  contactNumber,
  password,
  email,
  username,
  isTermsAgreed,
  userType
) => {
  const data = {
    contactName,
    contactNumber,
    password,
    email,
    username,
    isTermsAgreed,
    userType,
  }
  //console.log(data)
  return new Promise((resolve, reject) => {
    apiKit
      .post("/TdUsers", data)
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        console.error(`Error:${JSON.stringify(error)}`)
        reject(error)
      })
  })
}
const logout = () => {
  return new Promise((resolve, reject) => {
    apiKit
      .post("/TdUsers/logout?access_token=" + getLocalData("accessToken"))
      .then(function (response) {
        console.log("logout")
        removeLocalData("accessToken")
        removeLocalData("authUser")
        removeLocalData("userId")
        removeLocalData("auth_token")
        resolve(response)
      })
      .catch(function (error) {
        console.error(`Error:${error}`)
        reject(error)
      })
  })
}
export const authenticationService = {
  login,
  signup,
  logout,
}
