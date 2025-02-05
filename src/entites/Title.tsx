import React from 'react'

export default function Title({title, className = ''}: {title: string, className?: string}) {
  return (
    <h1 className={`text-2xl font-bold text-center ${className}`}>{title}</h1>
  )
}
