import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='Nome de Usuário' className='border p-3 rounded-lg' id='username' />
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='Senha' className='border p-3 rounded-lg' id='password' />
        <button className='bg-red-800 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Login
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Já possui uma conta?</p>
        <Link to={"/Login"}>
          <span className='text-blue-700'>Login</span>
        </Link>
      </div>
    </div>
  )
}