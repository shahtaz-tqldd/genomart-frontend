import React from 'react'

const TableSkeleton = () => {
  return (
    <div className="border w-full">
      <div className="flex justify-between items-center h-14 bg-gray-200 animate-pulse px-10">
        <div className='w-24 bg-gray-300 h-5 animate-pulse'></div>
        <div className='w-20 bg-gray-300 h-5 animate-pulse'></div>
        <div className='w-28 bg-gray-300 h-5 animate-pulse'></div>
        <div className='w-20 bg-gray-300 h-5 animate-pulse'></div>
        <div className='w-32 bg-gray-300 h-5 animate-pulse'></div>
        <div className='w-10 bg-gray-300 h-5 animate-pulse'></div>
      </div>
      {
        Array(5).fill(null).map((_, index) => (
          <div key={index} className="flex justify-between items-center h-[80px] bg-gray-100 animate-pulse px-10 border-b-2 border-gray-300">
            <div className='w-24 bg-gray-300 h-5 animate-pulse'></div>
            <div className='w-20 bg-gray-300 h-5 animate-pulse'></div>
            <div className='w-28 bg-gray-300 h-5 animate-pulse'></div>
            <div className='w-20 bg-gray-300 h-5 animate-pulse'></div>
            <div className='w-32 bg-gray-300 h-5 animate-pulse'></div>
            <div className='w-10 bg-gray-300 h-5 animate-pulse'></div>
          </div>
        ))
      }
    </div>
  )
}

export default TableSkeleton
