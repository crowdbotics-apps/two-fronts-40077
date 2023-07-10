import { useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import svg from "../../assets/images/svg"
import PlaidContainer from "../PlaidContainer"
import { usePlaidLink } from "react-plaid-link"
import { plaidCallToken, plaidPost } from "../../api/request"
import { useNavigate, useParams } from "react-router-dom"

import "./styles.scss"
import { APPCONFIG } from "../../app-config"

export default function PlaidLink() {
  const { publisherData } = useParams()
  let publisherDataDecoded: string
  var Buffer = require("buffer/").Buffer

  useEffect(() => {
    if (publisherData) {
      publisherDataDecoded = Buffer.from(publisherData, "base64").toString(
        "ascii"
      )
      sessionStorage.setItem("publisherData", publisherDataDecoded)
    }
  }, [publisherData])

  const nav = useNavigate()
  const [plaidToken, setPlaidToken] = useState("")

  const getToken = async () => {
    const data = await plaidCallToken()
    setPlaidToken(data?.payload.link_token)
  }

  useEffect(() => {
    const isToken = sessionStorage.getItem(APPCONFIG.sessVars.token)
    if (!isToken) {
      nav(`/${APPCONFIG.routes.login}`, {
        state: { redirectUri: `/${APPCONFIG.routes.connectYourBank}` }
      })
      return
    }
    getToken()
  }, [])

  const { open, ready } = usePlaidLink({
    token: plaidToken,
    onSuccess: (public_token, metadata: any) => {
      console.log(public_token)
      console.log(metadata)
      plaidPost({ account_id: metadata.account_id, public_key: public_token })
      nav(`/${APPCONFIG.routes.backToPublisher}`)
    }
  })

  return (
    <div className="plaid-link">
      <PlaidContainer>
        <Container className="px-95 text-center mt-5">
          <p className="font-medium-24">Connect your bank account with Plaid</p>
          <img src={svg.AppToBank} alt="App to Bank" className="mt-5" />
          <Container className="w-75 mt-5 text-start">
            <p className="m-bottom-11 font-extra-bold-18">
              <img src={svg.Checkmark} alt="" />
              <span className="p-left-12">Secure</span>
            </p>
            <p className="m-bottom-11 font-normal-discription-16 p-left-36">
              All bank communications are encrypted end to end.
            </p>
            <p className="m-bottom-11 font-extra-bold-18">
              <img src={svg.Checkmark} alt="" />
              <span className="p-left-12">Private</span>
            </p>
            <p className="m-bottom-11 font-normal-discription-16 p-left-36">
              We will never see or save your bank account information
            </p>
          </Container>
        </Container>

        <Container className="fix-bottom px-95">
          <Button
            className="rounded-pill font-bold-14 text-white plaid-btn"
            onClick={() => {
              open()
            }}
            disabled={!ready}
          >
            Continue
          </Button>
          <Button
            variant="secondary"
            className="rounded-pill font-bold-14 text-white plaid-btn"
          >
            Add funds later
          </Button>
        </Container>
      </PlaidContainer>
    </div>
  )
}
