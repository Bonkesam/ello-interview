import React from 'react'
import Search from './Search'
import BookSelection from './BookSelection';

const Hero = () => {
  return (
    <div className='p-5 flex flex-col gap-5'>
      <div className='w-full h-full flex flex-row justify-center'>
        <div>
          <h1 className='text-[#335C6E] font-bold text-xl lg:text-2xl uppercase'>
            Student Assignments
          </h1>
        </div>

      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-[#335C6E] rounded-xl">
        <BookSelection/>
      </div>

    </div>
  )
}

export default Hero;
