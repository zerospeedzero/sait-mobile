import React from 'react'
import { motion } from 'framer-motion'
import { GiAbstract100,GiAbstract099, GiAbstract102,  GiAbstract108,GiAbstract115 } from 'react-icons/gi'
const About = () => {
  return (
    <motion.div
      className='w-full  bg-gray-300 flex flex-col justify-between items-center shadow-md'
    >
      <motion.div>
        <h3
          className='text-3xl font-bold text-center mb-2'
        >
          Team
        </h3>
        <ul>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract100/>Jimmy - role1</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract099/>Ryan - role2</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract102/>Jake - role3</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract108/>Yan Lok role4</li>
          <li className='flex flex-row justify-start items-center p-2'><GiAbstract115/>George role5</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default About