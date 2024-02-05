import { takeEvery, fork, put, all } from "redux-saga/effects"
// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { loginSuccess, logoutUserSuccess, apiError } from "./actions"

import { authenticationService } from "../../../services/api/auth-service"
// const fireBaseBackend = getFirebaseBackend();
function* loginUser({ payload: { user, history } }) {
  try {
    authenticationService.login(user.username, user.password).then(response => {
      localStorage.setItem("authUser", JSON.stringify(response))
      loginSuccess(response)
      history("/dashboard")
    })
  } catch (error) {
    yield put(apiError(error))
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    authenticationService.logout().then(response => {
      logoutUserSuccess(response)
      history("/login")
    })
  } catch (error) {
    yield put(apiError(error))
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)])
}

export default authSaga
