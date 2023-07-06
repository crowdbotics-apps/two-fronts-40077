import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../api/request'
import { APPCONFIG } from '../../app-config';

export default function Logout() {
  const nav = useNavigate();
  const handleLogout = async() => {
    const data = await logout();
    if(data?.success) 
    {
      sessionStorage.clear();
      nav(`/${APPCONFIG.routes.home}`);
    }
  }
  return (
    <div className='w-100 d-flex justify-content-center align-items-center bg-disable' style={{height: '100vh', backgroundColor: 'snow'}}>
      <Button variant='outline-danger' size='lg' onClick={() => handleLogout()}>Logout</Button>
    </div>
  )
}
