import React from 'react'
import { APPCONFIG } from '../../app-config'
import {useNavigate} from 'react-router-dom'
import './styles.scss'

export default function ConditionsAndPolicies() {
  const nav = useNavigate();
  return (
    <div className='conditionsAndPolicies'>
      <p className="text-center">
        <span
          className="text-links"
          onClick={() => nav('/'+APPCONFIG.routes.termsAndConditions)}>
            Terms and Conditions
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span
          className="text-links"
          onClick={() => nav('/'+APPCONFIG.routes.privacyPolicies)}>
            Privacy Policies
        </span>
      </p>
    </div>
  )
}
