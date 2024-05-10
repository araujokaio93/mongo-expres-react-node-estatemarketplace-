import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result)

    } catch (error) {
      console.log('Não foi possível fazer login com o Google', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-blue-900 shadow-md text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center'
    >
      <FaGoogle className="mr-2" />
      Registro/Login com a Conta Google
    </button>
  );
}