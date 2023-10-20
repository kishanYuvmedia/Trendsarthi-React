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
  startOfToday.setHours(0, 0, 0, 0) // Set the time to 00:00:00.000
  const endOfToday = new Date(currentDate) // Clone the current date
  endOfToday.setHours(23, 59, 59, 999) // Set the time to 23:59:59.999
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
