import * as yup from 'yup'
import english from './english'

export const registrationSchema = yup.object().shape({
  email: yup.string().email(),
  phone_number: yup.string().when('email',(email) => {
    return (email.toString() === '') ? yup.string().required() : yup.string()
  }),
})