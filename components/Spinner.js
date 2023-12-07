import React from 'react'
export default function Spinner({message}) {
  return (
    <div>
      <div className='bg-black bg-opacity-50 fixed left-0 right-0 top-0 bottom-0 z-50 flex flex-col justify-center items-center'>
        <img className="h-24" src="/spinner.svg" alt="Loading"/>
        <p className="text-white p-4">{message}</p>
      </div>
    </div>
  )
}
