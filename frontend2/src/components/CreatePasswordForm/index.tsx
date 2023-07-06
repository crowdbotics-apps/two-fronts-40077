import React from "react"
import { Button, Container } from "react-bootstrap"
import TextInput from "../../customComponents/TextInput"
import AlreadyHaveAccount from "../AlreadyHaveAccount"
import { useFormik } from "formik"
import "./styles.scss"
import { createPassword } from "../../api/request"
import english from "../../utils/english"
import { useNavigate } from "react-router-dom"
import { APPCONFIG } from "../../app-config"
import MastodonInput from "../MastodonInput"

export default function CreatePasswordForm() {
  const nav = useNavigate()
  const {
    resetForm,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting
  } = useFormik({
    initialValues: {
      password: "",
      new_password2: "",
      email: "",
      username: "",
      mastodon_password: "",
      is_signup: false,
    },
    onSubmit: async values => {
      let payloadWithoutMastodon = {
        password : values.password
      }
      console.log(values.is_signup);

      if(values.password === values.new_password2){
        let payload;
        if(values.is_signup) payload = values
        else payload = payloadWithoutMastodon
        
        const data = await createPassword(payload)
        if (data?.success) {
          nav(`/${APPCONFIG.routes.connectYourBank}`)
        }
      }
    }
  })

  return (
    <Container className="w-75 on-mobile-w-100">
      <div className="text-center">
        <h4 className="w-100">Continue registration using your</h4>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">

          <TextInput
            label={'Login Id'}
            type={'email'}
            name={'email'}
            onChange={handleChange}
            onBlur={handleBlur}
            value={"555-456-7890"}
            disabled = {true}
          />

        <TextInput
          label="Password"
          name={"password"}
          type={"password"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
        />

        <TextInput
          label="Confirm Password"
          name={"new_password2"}
          type={"password"}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.new_password2}
        />

        <MastodonInput handleBlur={handleBlur} handleChange={handleChange} values={values} />

        <Button className="rounded-pill w-100 mt-2 register-btn" type="submit">
          Register now
        </Button>
      </form>
      <AlreadyHaveAccount
        text={english.haveAccount}
        target={`/${APPCONFIG.routes.login}`}
      />
    </Container>
  )
}
