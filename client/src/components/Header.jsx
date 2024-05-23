import { FaSearch } from 'react-icons/fa';
import { Link,  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const  {currentUser}= useSelector(state=> state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate= useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-red-800 shadow-md rounded-lg'>
    <div className='flex justify-between items-center max-w-6x1 mx-auto p-3'>
      <Link to="/">
        <h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
          <span className='text-white' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            Imobiliária Real - Corretagem e Vendas
          </span>
        </h1>
      </Link>
      <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input 
            type="text" 
            placeholder='Pesquisar ... ' 
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className='text-slate-800'/>
        </form>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline text-white hover:underline'>
            Página Principal
          </li>
        </Link>
        <Link to="About">
          <li className='hidden sm:inline text-white hover:underline'>
            Sobre
          </li>
        </Link>
        <Link to='/Profile'>
          {currentUser ? (
            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='Profile'/>
          ):( <li className='hidden sm:inline text-white hover:underline'>Login</li>
          )}
        </Link>
      </ul>
    </div>
  </header>
  );
}
