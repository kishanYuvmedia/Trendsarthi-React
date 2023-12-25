import {
  create,
  find,
  upsertPatch,
  findOne,
  deleteById,
  count,
} from "./core-service"
import { getLocalData } from "../global-storage"
import { retry } from "redux-saga/effects"
import apiKit, { axiosRequest } from "./axios-base"
import moment from "moment"
export const getSystemList = type => {
  return new Promise((resolve, reject) => {
    find("MtSystemLists", {
      where: { listType: type },
      order: "label asc",
    }).then(data => {
      resolve(data)
    })
  })
}
export const getStrikePrice = type => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "strikeprice"].join("/")}`,
    undefined,
    undefined,
    { type },
    true
  )
}
export const getExpairDate = type => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "productexpirydate"].join("/")}`,
    undefined,
    undefined,
    { type },
    true
  )
}
export const getOptionDataTable = (type, expairdate, strickPrice) => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "optiondata"].join("/")}`,
    undefined,
    undefined,
    { type, expairdate, strickPrice },
    true
  )
}
export const geIntradayData = type => {
  const currentDate = new Date() // Create a Date object for the current date
  const startOfToday = new Date(currentDate) // Clone the current date
  startOfToday.setHours(9, 0, 0, 0) // Set the time to 00:00:00.000
  console.log("cureent", startOfToday)
  const endOfToday = new Date(currentDate) // Clone the current date
  endOfToday.setHours(15, 59, 59, 999) // Set the time to 23:59:59.999
  console.log("endtime", endOfToday)
  return find("TdDerivatives", {
    where: {
      INSTRUMENTIDENTIFIER: `${type}-I`,
      and: [
        { createdAt: { gte: startOfToday } },
        { createdAt: { lte: endOfToday } },
      ],
    },
    order: "id desc",
  })
}
export const geIntradayDataLimit = (type, limit) => {
  const currentDate = new Date() // Create a Date object for the current date
  const startOfToday = new Date(currentDate) // Clone the current date
  startOfToday.setHours(9, 0, 0, 0) // Set the time to 00:00:00.000
  console.log("cureent", startOfToday)
  const endOfToday = new Date(currentDate) // Clone the current date
  endOfToday.setHours(15, 59, 59, 999) // Set the time to 23:59:59.999
  console.log("endtime", endOfToday)
  return find("TdDerivatives", {
    where: {
      INSTRUMENTIDENTIFIER: `${type}-I`,
      and: [
        { createdAt: { gte: startOfToday } },
        { createdAt: { lte: endOfToday } },
      ],
    },
    limit: limit,
    order: "id desc",
  })
}
export const getProductsList = () => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "getProducts"].join("/")}`,
    undefined,
    undefined,
    undefined,
    true
  )
}
export const getOptionDataList = (type, expairdate) => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "getOptionDataList"].join("/")}`,
    undefined,
    undefined,
    { type, expairdate },
    true
  )
}
export const getDerivativesData = (type, time) => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "getDerivativesData"].join("/")}`,
    undefined,
    undefined,
    { type, time },
    true
  )
}
export const getIndicatorDataList = (type, periodicity, period, max) => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "indicatorTableView"].join("/")}`,
    undefined,
    undefined,
    { type, periodicity, period, max },
    true
  )
}
export const createTdUsers = data => {
  return create("TdUsers", data)
}
export const verifyOtp = (username1, otp) => {
  return find("TdUsers", {
    where: {
      status: "I",
      and: [{ username: username1 }, { verificationCode: otp }],
    },
  })
}
export const checkUser = (username1, password, status = "A") => {
  return find("TdUsers", {
    where: {
      and: [{ username: username1 }, { password: password }],
    },
  })
}
export const getPlan = () => {
  return find("TdPlans", {
    where: {},
  })
}
export const createOrder = data => {
  return create("TdPaymentLists", data)
}
export const getUserOne = username1 => {
  return findOne("TdUsers", {
    where: {
      and: [{ username: username1 }],
    },
  })
}
export const getPlanId = planId => {
  return findOne("TdPlans", {
    where: {
      and: [{ id: planId }],
    },
  })
}
export const updateTdUsers = data => {
  return upsertPatch("TdUsers", data)
}
export const getHistoryList = (periodicity, type, max, period) => {
  return axiosRequest(
    "GET",
    `${["TdDerivatives", "getHistoryData"].join("/")}`,
    undefined,
    undefined,
    { periodicity, type, max, period },
    true
  )
}
export const getNiftyRanking = () => {
  return new Promise((resolve, reject) => {
    axiosRequest(
      "GET",
      `${["TdFnoRankings", "getNiftyRanking"].join("/")}`,
      undefined,
      undefined,
      {},
      true
    )
      .then(response => {
        resolve(response) // Resolve the promise with the response data
      })
      .catch(error => {
        reject(error) // Reject the promise with the error
      })
  })
}
export const shortGraphList = () => {
  return new Promise((resolve, reject) => {
    axiosRequest(
      "GET",
      `${["TdDerivatives", "getProductListOption"].join("/")}`,
      undefined,
      undefined,
      {},
      true
    )
      .then(response => {
        resolve(response) // Resolve the promise with the response data
      })
      .catch(error => {
        reject(error) // Reject the promise with the error
      })
  })
}
export const shortProductListDataList = () => {
  return new Promise((resolve, reject) => {
    axiosRequest(
      "GET",
      `${["TdDerivatives", "getProductListData"].join("/")}`,
      undefined,
      undefined,
      {},
      true
    )
      .then(response => {
        resolve(response) // Resolve the promise with the response data
      })
      .catch(error => {
        reject(error) // Reject the promise with the error
      })
  })
}
