import axios from "axios"

import { APPCONFIG } from "../app-config"
import { ALLROUTES } from "../routes"

axios.defaults.baseURL = APPCONFIG.baseWebApiUrl

export const Request = axios.create()

const tokenInterceptor = Request.interceptors.request.use(
  req => {
    const authToken = sessionStorage.getItem(
      APPCONFIG.sessionVariables.AUTH_TOKEN
    )
    if (!!authToken) {
      req.headers["Authorization"] = `Token ${authToken}`
    }
    return req
  },
  null,
  { synchronous: true }
)

const catchErrors = err => {
  // if ([400, 500, 403].find(e => e === err?.response?.status)) {
  //   window.customErrorCallback(err.response.data.message)
  // }
  if ([401, 403].find(e => e === err?.response?.status)) {
    if (APPCONFIG.debugGlobal) console.log("Redirect to login")
    window.location = ALLROUTES.login
  }
  throw err
}

window.addEventListener("storage", () => {
  const authToken = sessionStorage.getItem(
    APPCONFIG.sessionVariables.AUTH_TOKEN
  )
  if (!!authToken) {
    Request.interceptors.request.eject(tokenInterceptor)
    Request.interceptors.request.use(tokenInterceptor)
  }
})

export const post = (url, data, config) => {
  return Request.post(url, data, config).catch(catchErrors)
}

export const patch = (url, data, config) => {
  return Request.patch(url, data, config).catch(catchErrors)
}

export const put = (url, data, config) => {
  return Request.put(url, data, config).catch(catchErrors)
}

export const del = (url, data, config) => {
  return Request.delete(url, data, config).catch(catchErrors)
}

export const get = (url, config) => {
  return Request.get(url, config).catch(catchErrors)
}

export const customEvents = {
  API_ERROR: `${APPCONFIG.appNameSlug}-web-api-error`
}
