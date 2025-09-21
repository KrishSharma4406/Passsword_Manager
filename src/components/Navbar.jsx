import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-700 text-white flex justify-around p-4 mx-auto items-center'>
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            </div>
        <button className="logo cursor-pointer flex gap-2 items-center font-bold text-[18px] bg-green-600 rounded-full p-1 hover:bg-green-500 hover:text-white ring-white ring-1">
          <img src="icons/Github.png" alt="Github Logo" />
          <span>Github</span>
        </button>
    </nav>
  )
}

export default Navbar