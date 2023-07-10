import React, { useEffect, useRef } from 'react'
import { APPCONFIG } from '../../app-config';

export default function BackToPublisher() {
  const publisherData : string = sessionStorage.getItem('publisherData') ?? '';
  const userToken : string = sessionStorage.getItem(APPCONFIG.sessVars.token) ?? '';
  const publisherDataJsonObject = JSON.parse(publisherData);
  
  const redirectFrom = useRef<HTMLFormElement>(null)

  useEffect(() => {
    redirectFrom?.current?.submit();
  }, [])
  
  return (
    <div>
      <form method='POST' action={publisherDataJsonObject.url} ref= {redirectFrom}>
        <input 
          type = 'hidden' 
          name = 'nbblToken'
          value = {userToken}
        />
        <input 
          type='hidden' 
          name = 'nbblRedirectUri'
          value = {publisherDataJsonObject.redirect_uri}
        />
      </form>
    </div>
  )
}
