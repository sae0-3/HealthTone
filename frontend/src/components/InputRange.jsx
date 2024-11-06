import React, { useState } from 'react'

const InputRange = ({now,min=0, max, onClick}) => {
  const progress = (now / max) * 100


  return (
    <div className="relative w-full">
      <input
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-htc-blue focus:outline-none focus:ring-0"
        type="range"
        min={min}
        max={max}
        value={now}
        onClick={onClick}
        style={{
          background: `linear-gradient(to right, #3E5C76 calc(${progress}% + 5px), #e5e7eb ${progress}%)`
        }}
      />
    </div>
  )
}

export default InputRange