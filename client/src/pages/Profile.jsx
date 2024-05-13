import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector((state)=> state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Perfil</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='Profile' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
        <input type="text" placeholder='Nome de Usuário' id='username' className='border p-3 rounded-lg' />
        <input type="text" placeholder='Email' id='email' className='border p-3 rounded-lg' />
        <input type="text" placeholder='Senha' id='password' className='border p-3 rounded-lg' />
        <button className='bg-red-800 shadow-md text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Atualizar</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-800 cursor-pointer'>
          Deletar conta
        </span>
        <span className='text-blue-800 cursor-pointer'>
          Deslogar
        </span>
      </div>
    </div>
  );
}
