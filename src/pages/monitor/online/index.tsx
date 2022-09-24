import React, { useState } from 'react'
import Input from './components/Input'

export default function Online(): any {
  const [c, setC] = useState([1, 2, 3, 412,])

  return (
    <div>Online
      <Input>
        <h1>123</h1>
        <h2>{c}</h2>
      </Input>
    </div>
  )
}
