import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      setLoading(false);
  
      // Verifique se a resposta está ok antes de tentar analisá-la como JSON
      if (res.ok) {
        const data = await res.json();
        setSuccessMessage(data.message);
        setError(null);
  
        // Redirecionar após um breve intervalo para permitir que a mensagem de sucesso seja exibida
        setTimeout(() => {
          navigate('/signin');
        }, 1200); // Redirecionar
      } else {
        // Se a resposta não estiver ok, verifique o status code e lance um erro específico
        throw new Error('Não foi possível proceder a solitação de registro!');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Registrar-se</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Nome de Usuário' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="text" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='Senha' className='border p-3 rounded-lg' id='password' onChange={handleChange}  />
        <button disabled={loading} className={`bg-red-800 shadow-md text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {loading ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-5 w-5 mr-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.568 0-4.846-1.164-6.396-3.009l2.396-2.396zm16-2.582A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4c2.568 0 4.846 1.164 6.396 3.009l-2.396 2.396z"
                ></path>
              </svg>
              <span className="text-sm">Carregando, espere um pouco ...</span>
            </>
          ) : (
            'Registrar-se'
          )}
        </button>
        <OAuth />
      </form>
      {successMessage ? (
        <p className='text-green-500 mt-5'>{successMessage}</p>
      ) : (
        <div className="flex gap-2 mt-5">
          <p>Já possui uma conta?</p>
          <Link to={"/signin"}>
            <span className='text-blue-700'>Logar</span>
          </Link>
        </div>
      )}
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}