import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
    <motion.div
      className='w-screen max-w-[900px] min-h-screen bg-white text-black mx-auto flex flex-col justify-between items-center'

    >
      <Header />
      <Component {...pageProps} />
      {/* <Footer /> */}
    </motion.div> 
  )  
}

// import "../styles/globals.css";
// import Header from "@/components/Header";
// import { useState, useEffect, useRef } from 'react'
// import { motion } from "framer-motion";

// function MyApp({ Component, pageProps }) {
//   return (
//     <>
//       <div className="w-screen max-w-[40rem] h-screen bg-white text-black mx-auto flex flex-col justify-between items-center"></div>
//       <motion.div
//       >
//         <Header/>
//         <Component {...pageProps} />
//       </motion.div>
//     </>
//   );
// }
// export default MyApp;