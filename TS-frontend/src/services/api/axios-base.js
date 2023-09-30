import axios from "axios"
import _ from "lodash"
import Config from "../../constants/config"
import { getLocalData } from "../global-storage"

const header = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
}
let apiKit = axios.create({
  baseURL: Config.apiUrl,
  timeout: 20000,
  header,
})
export const setClientToken = token => {
  apiKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}
apiKit.interceptors.response.use(
  function (response) {
    // console.log("=========================")
    // console.log("RESPONSE:")
    // console.log(JSON.stringify(response))
    // console.log("=========================")

    if (response.data.status === false) {
      // Error message is retrived from the JSON body.
      const error = new Error(response.data.message)
      // Attach the response instance, in case we would like to access it.
      error.response = response

      throw error
    }

    return response
  },
  function (error) {
    if (error) {
      console.log("API ERROR !", error)
      // store.dispatch({type: 'API_ERROR', errorMessage: error.message});
    }
    return Promise.reject(error)
  }
)

apiKit.interceptors.request.use(
  function (request) {
    // console.log("=========================")
    // console.log("REQUEST:")
    // console.log(JSON.stringify(request))
    // console.log("=========================")

    return request
  },
  function (error) {
    if (error) {
      console.log("API ERROR !", error.message)
    }
  }
)
export default apiKit

const updateQueryStringParameter = (uri, key, value) => {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i")
  var separator = uri.indexOf("?") !== -1 ? "&" : "?"
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2")
  } else {
    return uri + separator + key + "=" + value
  }
}

export const axiosRequest = async (
  method,
  url,
  filter,
  postBody,
  routeParams,
  skipFilterParam
) => {
  if (!_.isEmpty(routeParams)) {
    Object.keys(routeParams).forEach(key => {
      if (routeParams[key])
        url = updateQueryStringParameter(url, key, routeParams[key])
    })
  }
  let body
  // console.log(routeParams,url)
  let postBodyKeys = typeof postBody === "object" ? Object.keys(postBody) : []
  if (postBodyKeys.length === 1) {
    body = postBody[postBodyKeys.shift()]
  } else {
    body = postBody
  }
  if (!_.isEmpty(filter)) {
    if (skipFilterParam) {
      filter = `?where=${encodeURI(JSON.stringify(filter))}`
    } else {
      filter = `?filter=${encodeURI(JSON.stringify(filter))}`
    }
  }
  console.log(url)
  const queryConfig = {
    headers: header,
    method: method,
    url: `/${url}${filter ? filter : ""}`,
  }

  console.log(queryConfig)

  if (!_.isEmpty(body)) {
    queryConfig["data"] = body ? JSON.stringify(body) : undefined
  }
  let token = await getLocalData("accessToken")
  if (token) queryConfig.headers.Authorization = token
  return apiKit
    .request(queryConfig)
    .then(res => res.data)
    .catch(err => console.error(err))
}
