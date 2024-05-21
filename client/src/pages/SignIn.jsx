import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Usuário não cadastrado!');
        } else if (res.status === 401) {
          throw new Error('Senha inválida!');
        } else {
          throw new Error('Erro interno do servidor!');
        }
      }
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.error));
        return;
      }
      dispatch(signInSuccess(data));
      setSuccessMessage('O processo de Login foi um sucesso ');
      setTimeout(() => {
        navigate('/');
      }, 1200); // Redirecionamento após 1200ms
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold mb-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Senha'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className={`bg-red-800 shadow-md text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='animate-spin h-5 w-5 mr-3 text-white'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.568 0-4.846-1.164-6.396-3.009l2.396-2.396zm16-2.582A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4c2.568 0 4.846 1.164 6.396 3.009l-2.396 2.396z'
                ></path>
              </svg>
              <span className='text-sm'>Carregando, espere um pouco ...</span>
            </>
          ) : (
            'Login'
          )}
        </button>
        <OAuth/>
      </form>
      <div className='flex justify-center items-center mt-5'>
        <p className='mr-2'>Ainda não possui uma conta?</p>
        <Link to='/signup' className='text-blue-700'>
          Registre-se
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {successMessage && <p className='text-green-500 mt-5'>{successMessage}</p>}
    </div>
  );
}  