import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.div
      className='w-full h-[3rem] text-sm bg-gray-200 flex flex-row justify-center items-center shadow-md'
    >
      <p>Copyright 2023 All rights reserved</p>
    </motion.div>
  )
}

export default Footer