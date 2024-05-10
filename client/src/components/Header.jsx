import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-red-800 shadow-md'>
    <div className='flex justify-between items-center max-w-6x1 mx-auto p-3'>
      <Link to="/">
        <h1 className='font-bold text-lg sm:text-xl flex flex-wrap'>
          <span className='text-white' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            Imobiliária Real - Corretagem e Vendas
          </span>
        </h1>
      </Link>
      <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input 
            type="text" 
            placeholder='Pesquisar:  ... ' 
            className='bg-transparent focus:outline-none w-24 sm:w-64'
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
        <Link to="Profile">
          <li className='hidden sm:inline text-white hover:underline'>
            Perfil
          </li>
        </Link>
      </ul>
    </div>
  </header>
  );
}
