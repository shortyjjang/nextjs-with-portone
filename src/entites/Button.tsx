import React from 'react'

export default function Button({children, onClick}: {children: React.ReactNode, onClick: () => void}) {
  return (
    <button onClick={onClick} className='border-t border-gray-300'>{children}</button>
  )
}
