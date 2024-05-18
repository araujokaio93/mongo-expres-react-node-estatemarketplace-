import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
 

  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Perfil</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='Profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-500'>Erro no Upload da Imagem (imagem deve ser menor que 2 MB)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-blue-500'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-500'>O Upload da Imagem foi um sucesso</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='Nome de Usuário' id='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type='text' placeholder='Email' id='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' onChange={handleChange}/>
        <input type='password' placeholder='Senha' id='password' className='border p-3 rounded-lg' onChange={handleChange}/>  
        <button
          disabled={loading}
          className={`bg-red-800 shadow-md text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 flex items-center justify-center ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? (
            <>
              <svg xmlns='http://www.w3.org/2000/svg' className='animate-spin h-5 w-5 mr-3 text-white' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.568 0-4.846-1.164-6.396-3.009l2.396-2.396zm16-2.582A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4c2.568 0 4.846 1.164 6.396 3.009l-2.396 2.396z'></path>
              </svg>
              <span className='text-sm'>Carregando, espere um pouco ...</span>
            </>
          ) : (
            'Atualizar'
          )}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-800 cursor-pointer'>Deletar conta</span>
        <span onClick={handleSignOut} className='text-blue-800 cursor-pointer'>Deslogar</span>
      </div>
      <p className='text-red-500'>{error ? error : ''}</p>
      <p className='text-green-500'>{updateSuccess ? 'Informações de Usuário atualizadas com sucesso': ''}</p>
    </div>
  );
}