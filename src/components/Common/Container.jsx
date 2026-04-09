import React from 'react'

export default function Container({children, className}) {
  return (
    <div className={`w-11/12 sm:w-5/6 xl:max-w-490 mx-auto p-4 ${className}`}>
        {children}
    </div>
  )
}
