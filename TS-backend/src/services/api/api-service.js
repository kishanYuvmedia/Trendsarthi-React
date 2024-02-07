import {
  create,
  find,
  upsertPatch,
  findOne,
  deleteById,
  count,
} from "./core-service"
import axios from "axios"
import { getLocalData } from "../global-storage"
import { retry } from "redux-saga/effects"
import apiKit, { axiosRequest } from "./axios-base"

// ===================== SCALPING API ==========================

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
export const getAllUser = () => {
  return find("TdUsers", {
    where: {},
  })
}
export const UpdateUser = data => {
  return upsertPatch("TdUsers", data)
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


// ===================== MARBIZ API ==========================

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
export const createPublicList = data => {
  return create("MtPublicLists", data)
}
export const getPublicList = type => {
  return new Promise((resolve, reject) => {
    find("MtPublicLists", {
      where: { listType: type },
      order: "label asc",
    }).then(data => {
      resolve(data)
    })
  })
}

export const createProfileListing = data => {
  return create("MtProfiles", data)
}
export const deletePublicList = id => {
  return deleteById("MtPublicLists", id)
}
export const deleteProfile = id => {
  return deleteById("MtProfiles", id)
}
export const checkPublicName = name => {
  return count("MtProfiles", null, { regName: name })
}
export const getProfileList = () => {
  return new Promise((resolve, reject) => {
    find("MtProfiles", {
      order: "createdAt asc",
    }).then(data => {
      resolve(data)
    })
  })
}
export const getProfile = profileid => {
  return new Promise((resolve, reject) => {
    findOne("MtProfiles", {
      where: { id: profileid },
    }).then(data => {
      resolve(data)
    })
  })
}
export const UpdateProfile = data => {
  return upsertPatch("MtProfiles", data)
}
export const UploadbulkImages = data => {
  return create("Images", data)
}
export const getImagesList = id => {
  return find(`MtProfiles/${id}/Images`, {
    where: { status: "A" },
  })
}
export const deleteImages = id => {
  return deleteById("Images", id)
}