import React from 'react'

export default function Button({children, onClick}: {children: React.ReactNode, onClick: () => void}) {
  return (
    <button onClick={onClick} className='border border-gray-300 p-3 text-sm whitespace-nowrap py-2'>{children}</button>
  )
}
