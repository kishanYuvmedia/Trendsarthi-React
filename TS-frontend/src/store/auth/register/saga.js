import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"
import { createTdUsers } from "services/api/api-service"
//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user } }) {
  console.log("using the following url for registration: ")
  try {
    console.log("Trying to register user (within try block)")
    createTdUsers(user).then(result=>{
      console.log("successfully register",result);
      return result;
    })
  } catch (error) {
    console.log("There was an error registering: ", error)
    yield put(registerUserFailed(error))
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
