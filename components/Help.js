import React from 'react'
import { motion } from 'framer-motion'
const Help = () => {
  return (
    <motion.div
      className='w-full h-screen bg-gray-100 flex flex-col justify-center items-center'
    >
      <motion.div
        className='w-full ratio-aspect bg-gray-200 flex flex-col justify-between items-center shadow-md mb-4'
      >
        <h3 className='text-3xl font-bold text-center mb-2'>
          Video tutorial
        </h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/0d_OSi_790I?si=HcxfsYY7UqEIB3rp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </motion.div>
      <motion.div
        className='w-full ratio-aspect bg-gray-200 flex flex-col justify-between items-center shadow-md'
      >
        <h3 className='text-3xl font-bold text-center mb-2'>
          Text tutorial
        </h3>
        <motion.div className='w-full flex flex-col justify-between items-start p-3'>
          <p className='p-2'>Step 1. xxxxx</p>
          <p className='p-2'>Step 2. xxxxx</p>
          <p className='p-2'>Step 3. xxxxx</p>
          <p className='p-2'>Step 4. xxxxx</p>
          <p className='p-2'>Step 5. xxxxx</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Help