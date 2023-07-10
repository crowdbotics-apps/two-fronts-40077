import axios from "axios"
import { APP_JSON_HEADER, BASE_URL, successStatusCode } from "./config"

import EndPoints from "./endPoints"

const GET = "GET"
const POST = "POST"
const PUT = "PUT"
const DELETE = "DELETE"

const catchErrors = (err:any) => {
  // check for 1xx, 3xx, 4xx, 5xx response codes
  const statusType = Math.floor((err?.response?.status || 0) / 100)
  if (statusType !== 2) {
    (window as any)?.customErrorCallback?.(humanReadableErrorMessage(err))
  }
  throw err
}

const humanReadableErrorMessage = (responseData:any) => {
  const responseDataPayload = responseData?.response?.data?.payload
  let guessedErrorMessage: any = []
  for (let item in responseDataPayload) {
    guessedErrorMessage.push(responseDataPayload[item])
  }
  guessedErrorMessage = guessedErrorMessage.join(". ")
  return responseDataPayload?.message || guessedErrorMessage
}

export async function request(endPoint: string, method: any, body?: any) {
  console.log(`[API ${method?.toString()?.toUpperCase()}]`, endPoint)
  const header = await APP_JSON_HEADER()
  return await axios({
    method: method,
    url: BASE_URL + endPoint,
    data: body,
    headers: header,
    timeout: 150000
  })
    .then(function (response: any) {
      console.log("[API SUCCESS]", response?.data)
      if (successStatusCode.includes(response?.status)) return response?.data
    })
    .catch((error: any) => {
      console.error(
        `[API ERR ${error?.response?.status}]`,
        humanReadableErrorMessage(error) || error
      )
      console.log(error);
      
      catchErrors(error)
    })
}

export async function login(params) {
  return request(EndPoints.login, POST, params)
}

export async function logout() {
  return request(EndPoints.logout, POST)
}

export async function registerByEmail(params) {
  return request(EndPoints.registerByEmail, POST, params)
}

export async function registerByPhone(params) {
  return request(EndPoints.registerByPhone, POST, params)
}

export async function registerOtpEmail(params) {
  return request(EndPoints.registerOtpEmail, POST, params)
}

export async function registerOtpPhone(params) {
  return request(EndPoints.registerOtpPhone, POST, params)
}

export async function createPassword(params) {
  return request(EndPoints.createPassword, POST, params)
}

export async function plaidCallToken() {
  return request(EndPoints.plaidCallToken, GET)
}

export async function termsAndConditions() {
  return request(EndPoints.termsAndConditions, GET );
}

export async function privacyPolicies() {
  return request(EndPoints.privacyPolicies, GET );
}

export async function plaidPost(params) {
  return request(EndPoints.plaidPost, POST, params );
}