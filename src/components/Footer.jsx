import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center items-center p-4 bg-slate-700 text-white'>
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            </div>
      Created with <img src="/Heart.gif" alt="heart" style={{height: "20px", verticalAlign: "middle"}} /> By Krish
    </div>
  )
}

export default Footer