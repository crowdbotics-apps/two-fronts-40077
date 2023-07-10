import React from 'react'
import { useNavigate } from 'react-router-dom'
import svg from '../../assets/images/svg'
import './styles.scss'

export default function AlreadyHaveAccount({text, target}: {text: string, target: string}) {
  const nav = useNavigate()
  return (
    <div className='alreadyHaveAccount'>
      <p className='have-account' onClick={() => nav(target)}>{text}</p>
      <p className='text-center'><img src={svg.loginWith} alt='loginWith' className='w-75'/></p>
    </div>
  )
}