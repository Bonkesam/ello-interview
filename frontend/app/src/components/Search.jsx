import React from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  return (
    <div className='border-[1px] w-[100px] md:w-[230px] py-2 rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer items-center flex flex-row px-2 justify-between bg-[#5ACCCC]'>
        <div className='items-center justify-between '>
            Search
        </div>
        <div className='p-2 bg-[#F76434] rounded-full items-center text-white'>
            <BiSearch size={18}/>
        </div>
      
    </div>
  )
}

export default Search;
