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

  return (
    <motion.div
      className='w-full'
    >
      <img src="/images/sait-logo.png" alt="SAIT logo" className='w-[80%] mt-[2rem] mb-[2rem] flex flex-col justify-center items-center mx-auto' />
      <div className="bg-[url('/images/background-blue.svg')] pt-[03rem] pb-[20rem] flex flex-col justify-center items-center space-y-4 rounded-tl-[8%] rounded-tr-[8%]" >
        <input
          className='p-3 text-xl w-full max-w-xs z-10 rounded-md'
          type="text"
          id="email"
          placeholder='Your SAIT email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='p-3 w-full max-w-xs rounded-md'
          type="password"
          id="password"
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='h-4'></div>
        <button onClick={handleLogin}
          className=' btn  bg-s2 text-white text-lg  w-full max-w-xs'
        > 
          Login
        </button>
        <p className='text-sm text-white py-'>Copyright 2023. All rights reserved</p>
      </div>
      {loading && <Spinner/>}
      <ToastContainer className='mt-[10rem]' position="center-right" />
    </motion.div>
  );
};

export default LoginForm;
