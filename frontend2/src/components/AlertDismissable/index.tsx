import React, { useEffect, useState } from "react"
import { Alert } from "react-bootstrap"
import './styles.scss'

const AlertDismissible = ({
  // heading,
  // content,
  variant = "danger",
  onCloseCallback = () => {}
}) => {

  const [show, setShow] = useState(false)
  const [heading, setHeading] = useState('Error')
  const [errorMsg, setErrorMsg] = useState()

  useEffect(() => {
    (window as any).customErrorCallback = (errorObject) => {
      setShow(true)
      setErrorMsg(errorObject)
      setTimeout(()=> {setShow(false)},5000)
    }
  }, [show, errorMsg])

  return (
    <Alert
      show={show}
      variant={variant}
      onClose={() => {
        setShow(false)
        onCloseCallback?.()
      }}
      dismissible
      className="alert-dismissible"
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{errorMsg}</p>
    </Alert>
  )
}

export default AlertDismissible
