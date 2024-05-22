import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md">
          <p>
            Contate o anunciante <span className="font-semibold">{landlord.username}</span>{' '}
            pelo anúncio: <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            value={message}
            onChange={onChange}
            placeholder="Escreva sua mensagem ao Anunciante aqui ..."
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-blue-800 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Envie sua mensagem
          </Link>
        </div>
      )}
    </>
  );
}
