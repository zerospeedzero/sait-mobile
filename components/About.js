import React from 'react'
import { motion } from 'framer-motion'
import { GiAbstract100,GiAbstract099, GiAbstract102,  GiAbstract108,GiAbstract115 } from 'react-icons/gi'
import Link from 'next/link'
const About = () => {
  return (
    <motion.div
      className="w-full bg-[url('/images/background-yellow.svg')] mt-[6rem] p-8 flex flex-col justify-start items-center shadow-md"
    >
      <motion.div>
        <h3
          className='text-3xl font-bold text-center mb-2'
        >
          Team
        </h3>
        <ul>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract100/>Jimmy - Graphic Designer</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract099/>Ryan - Content Creator</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract102/>Jake - Project Manager</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract108/>Yan Lok - UX/UI Designer</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract115/>George - Web developer</li>
        </ul>
      </motion.div>
      <Link href='/'
        className='bg-p1 text-white p-2 mt-8 rounded-lg shadow-md hover:bg-p1/20 duration-200'
      >
        Go to Home
      </Link>
    </motion.div>
  )
}

export default About