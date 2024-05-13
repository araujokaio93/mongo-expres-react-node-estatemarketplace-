import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGoogleClick = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      });

      setLoading(false);

      if (!res.ok) {
        throw new Error('Não foi possível fazer login com o Google');
      }

      const data = await res.json();
      dispatch(signInSuccess(data));

      setError(null);
      setSuccessMessage('O processo de login foi um sucesso');
      setTimeout(() => {
        navigate("/");
      }, 1200); // Redirecionamento após 1200ms
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleClick}
        type='button'
        className={`bg-blue-900 shadow-md text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        style={{ width: '100%' }} // Mantendo o tamanho igual ao botão de login normal
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
          <>
            <FaGoogle className="mr-2" />
            Registro/Login com a Conta Google
          </>
        )}
      </button>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {successMessage && <p className='text-green-500 mt-5'>{successMessage}</p>}
    </div>
  );
}
