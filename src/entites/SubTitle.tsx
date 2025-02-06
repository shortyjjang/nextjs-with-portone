import React from 'react'

export default function SubTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className='text-xl font-bold text-center pb-4'>{children}</h2>
  )
}
