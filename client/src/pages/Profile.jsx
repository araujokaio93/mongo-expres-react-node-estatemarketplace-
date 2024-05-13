import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  useEffect(() => {
    if (file) {
      console.log("Arquivo selecionado:", file);
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    console.log("Referência do arquivo:", storageRef);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Perfil</h1>
      <form className='flex flex-col gap-4'>
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
            <span className='text-red-500'>Erro no Upload da Imagem (imagem deve ser menor que 2 MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-blue-500'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-500'>O Upload da Imagem foi um sucesso</span>
          ) : (
            ''
          )}
        </p>
        <input type='text' placeholder='Nome de Usuário' id='username' className='border p-3 rounded-lg' />
        <input type='text' placeholder='Email' id='email' className='border p-3 rounded-lg' />
        <input type='text' placeholder='Senha' id='password' className='border p-3 rounded-lg' />
        <button className='bg-red-800 shadow-md text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          Atualizar
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-800 cursor-pointer'>Deletar conta</span>
        <span className='text-blue-800 cursor-pointer'>Deslogar</span>
      </div>
    </div>
  );
}
