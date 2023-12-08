import { use, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { parse } from 'cookie';
import { motion } from 'framer-motion';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  

  const handleLogin = async () => {
    document.getElementById('email').disabled = false; 
    try {
      // Simulate authentication logic
      if (email === 'george.cheng@edu.sait.ca' && password === 'Abcd1234') {
        // Successful login
        console.log('Login successful!');
        // Set a cookie to indicate successful login
        document.cookie = 'userLoggedIn=true; max-age=3600'; // expires in 1 hour
        setLoading(true)
        router.push('/categories')
        // setTimeout(() => {
        //   setLoading(false)
        // }, 500)
        // You can redirect the user or perform other actions here
      } else {
        // Invalid credentials
        toast.error('Login failed')
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  useEffect(() => {
    const cookies = parse(document.cookie);
    if (cookies.userLoggedIn === 'true') {
      // router.push('/categories');
    }
  }, [router]);
  const addSaitEmail = (e) => {
    // to check the last character of the email input field is '@'
    if (e.target.value.slice(-1) === '@') {
      setEmail(e.target.value + 'edu.sait.ca')
      document.getElementById('email').disabled = true;
      document.getElementById('password').focus();
    } else {
      setEmail(e.target.value)
    } 
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.1 }}
      className='w-full'
    >
      <motion.img src="/images/sait-logo.png" alt="SAIT logo" className='w-[80%] mt-[2rem] mb-[2rem] flex flex-col justify-center items-center mx-auto' 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <div className="bg-[url('/images/background-blue.svg')] pt-[03rem] pb-[20rem] flex flex-col justify-center items-center space-y-4 rounded-tl-[8%] rounded-tr-[8%]" >
        <motion.input
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className='p-3 text-xl bg-white w-full max-w-xs z-10 rounded-md'
          type="text"
          id="email"
          placeholder='Your SAIT email address'
          value={email}
          // onChange={(e) => {addSaitEmail(e)}}
          onChange={(e) => {setEmail(e.target.value); addSaitEmail(e)}}
        />
        <motion.input
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}        
          className='p-3 bg-white w-full max-w-xs rounded-md'
          type="password"
          id="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='h-4'></div>
        <motion.button onClick={handleLogin}
          initial={{ x: -400 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}    
          className=' btn  bg-s2 text-white text-lg  w-full max-w-xs'
        > 
          Login
        </motion.button>
        <motion.p className='text-sm text-white py-'
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Copyright 2023. All rights reserved
        </motion.p>
      </div>
      {loading && <Spinner/>}
      <ToastContainer className='mt-[10rem]' position="center-right" />
    </motion.div>
  );
};

export default LoginForm;
