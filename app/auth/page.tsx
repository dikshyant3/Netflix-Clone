'use client'


import { useCallback, useState, Suspense } from 'react';
import axios from 'axios';
import Input from '@/components/Input';
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const AuthPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();


  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/profiles',
      })
      router.push('/profiles')
    }
    catch (error) {
      console.log(error)
    }
  }, [email, password, router])

  const register = useCallback(async () => {
    try {
      await axios.post('api/register', {
        email,
        name,
        password
      },
      )
      login()
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (

    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                id="password"
                label="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex items-center justify-center mt-8 gap-4 cursor-pointer">
              <div onClick={() => signIn('google', {
                callbackUrl: searchParams.get("callbackUrl") || "/profiles",
              })} className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:opacity-70 transition">
                <FcGoogle size={30} />
              </div>
              <div onClick={() => signIn('github', {
                callbackUrl: searchParams.get("callbackUrl") || "/profiles",
              })} className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:opacity-70 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12 text-center">
              {variant === 'login' ? 'New to Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Sign up now' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Auth = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  )
}

export default Auth;
