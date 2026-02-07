import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {children}
    </div>
  )
}

export default layout
