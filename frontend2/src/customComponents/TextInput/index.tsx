import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'

export default function TextInput({label, type, name, onChange, onBlur, value, disabled = false}) {
  
  const inputFieldRef = useRef<HTMLInputElement>(null)

  return (
    <div className='textInput'>
      <div className={value?'input-container hasValue':"input-container"}>
        <input
          ref={inputFieldRef}
          type={type}
          name={name}
          value = {value}
          onChange={onChange}
          onBlur = {onBlur}
          disabled = {disabled}
        />
        <div className="input-label" onClick={() => inputFieldRef.current?.focus()}>
          <span>{label}</span>
        </div>
      </div>
    </div>
  )
}
