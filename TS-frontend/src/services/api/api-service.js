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
      // storeCachedData(`${type}List`, data)
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
