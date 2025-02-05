import React from 'react'

export default function SubTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className='text-xl font-bold text-center'>{children}</h2>
  )
}
