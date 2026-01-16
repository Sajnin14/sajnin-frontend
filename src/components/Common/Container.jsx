import React from 'react'

export default function Container({children, className}) {
  return (
    <div className={`w-11/12 sm:w-5/6 lg:w-3/4 px-4 ${className}`}>
        {children}
    </div>
  )
}
