import { useFormik } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { Container, Form, InputGroup } from 'react-bootstrap'
import TextInput from '../../customComponents/TextInput'


export default function MastodonInput({handleBlur, handleChange, values}) {

  return (
    <div className='MastodonInput'>
      <Container>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name="is_signup"
            checked={values.is_signup}
            onChange={(e) => { handleChange(e)}}/>
          <label className="form-check-label">
            Sign for Mastodon
          </label>
        </div>
        {
          (values.is_signup) ? <>
            <TextInput
              label={'Email'}
              type={'email'}
              name={'email'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <TextInput
              label={'Username'}
              type={'text'}
              name={'username'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            <TextInput
              label={'Mastodon Password'}
              type={'password'}
              name={'mastodon_password'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mastodon_password}
            />
         </>
          : <></>
        }
      </Container>
    </div>
  )
}
