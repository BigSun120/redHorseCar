import React from 'react'

type Props = {
  children: string,
  c: string[]
}

export default function Input({ children }: any) {
  return (
    <div>Input
      {children}
    </div>
  )
}
