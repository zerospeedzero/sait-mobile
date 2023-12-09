import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {BiSolidMessageDetail, BiSolidExit} from 'react-icons/bi'
import { parse } from 'cookie'

const Header = () => {
  const router = useRouter()
  const [authed, setAuthed] = React.useState(false) 
  const [receivedNotification, setReceivedNotification] = React.useState(false)
  useEffect(() => {
    const cookies = parse(document.cookie);
    if (cookies.userLoggedIn === 'true') {
      setAuthed(true)
      // router.push('/categories')
    } else {
      setAuthed(false)
      // router.push('/')
    }
  }, [router])
  return (
    <>
        {!authed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.5 }}
            className='w-full h-[6rem] bg-transparent flex flex-row justify-between items-center'
          >          
            <Link href='/about'>
              <motion.span
                className='text-lg font-bold m-6 mt-12 flex flex-col justify-center items-center'
                >
                <motion.img src="/images/About.png" alt="SAIT logo" className='w-[3rem]' />
                About
              </motion.span>
            </Link>
            <Link href='/chat'>
              <motion.span
                className='text-lg font-bold m-6 mt-12 flex flex-col justify-center items-center'
                >
                <img src="/images/icon_questionMark.png" alt="SAIT logo" className='w-[3rem]' />
                Help
              </motion.span>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className='w-full h-[6rem] bg-transparent flex flex-row justify-between items-center'
          >          
            <Link href='/profile'>
              <motion.span
                className='text-lg font-bold m-7 flex flex-col justify-center items-center'
              >
                <motion.img src="/images/profile.png" alt="SAIT logo" className='w-[4rem]' />
              </motion.span>
            </Link>
            <motion.div
              className='flex flex-row justify-between items-center'
            >
              {receivedNotification && (
              <Link href='/'
                onClick={()=>{console.log('logout')}}
              >
                <motion.span
                  className='text-lg font-bold mx-4  mt-5 flex flex-col justify-center items-center'
                >
                  <motion.img src="/images/mail-1.png" alt="SAIT logo" className='w-[4rem]' />
                  Contact
                </motion.span>
              </Link>
              )}
              {router && router.pathname === '/categories' ? (
                <Link href='/calendar'>
                  <motion.span
                    className='text-lg font-bold mx-4 mt-5 flex flex-col justify-center items-center'
                  >
                    <motion.img src="/images/calender-1.png" alt="SAIT logo" className='w-[4rem]' />
                    Calendar
                  </motion.span>
                </Link>
              ) : (
                <Link href='/categories'>
                  <motion.span
                    className='text-lg font-bold mx-4 mt-5 flex flex-col justify-center items-center'
                  >
                    <motion.img src="/images/home2.png" alt="SAIT logo" className='w-[4rem]' />
                    Home
                  </motion.span>
               </Link>
              
              )}
            </motion.div>
          </motion.div>
        )}
    </>
  )
}

export default Header