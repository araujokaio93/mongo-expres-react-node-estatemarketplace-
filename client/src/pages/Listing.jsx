import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import {useSelector} from 'react-redux';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare
} from 'react-icons/fa';
import Contact from '../components/Contact';



export default function Listing() {
    SwiperCore.use({ Navigation });
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const params = useParams();
    const {currentUser}= useSelector((state)=>state.user);
    const [contact, setContact] = useState(false);

  

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);

    

    return (
        <main>
          {loading && <p className='text-center my-7 text-2xl'>Carregando os Anúncios, espere um pouco ...</p>}
          {error && (
            <p className='text-center my-7 text-2xl'>Erro ao carregar os Anúncios !</p>
          )}
          {listing && !loading && !error && (
            <div>
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className='h-[500px] border-4 rounded-lg border-red-800 m-6 '
                      style={{
                        background: `url(${url}) center no-repeat`,
                        backgroundSize: 'cover',
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="fixed top-1/4 right-4 z-10">
                <button
                    className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center focus:outline-none"
                    onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => {
                        setCopied(false);
                    }, 2000);
                    }}
                >
                    <FaShare className="text-gray-700" />
                </button>
                {copied && (
                    <p className="absolute top-1/3 right-6 z-20 bg-gray-100 p-2 rounded-md text-gray-700">
                    Link Copiado!
                    </p>
                )}
             </div>
              <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                <p className='text-2xl font-semibold'>
                  {listing.name} - R${' '}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('pt-BR')
                    : listing.regularPrice.toLocaleString('pt-BR')}
                  {listing.type === 'rent' && ' / month'}
                </p>
                <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                  <FaMapMarkerAlt className='text-green-900' />
                  {listing.address}
                </p>
                <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md flex justify-center items-center'>
                  {listing.type === 'rent' ? 'Para á alugar' : 'Para á venda'}
                </p>
                {listing.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md flex justify-center items-center'>
                    R$ {+listing.regularPrice - +listing.discountPrice} - com o Desconto
                  </p>
                )}
                </div>
                <p className='text-slate-800'>
                  <span className='font-semibold text-black'>Descrição do Anunciante - </span>
                  {listing.description}
                </p>
                <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBed className='text-lg' />
                    {listing.bedrooms > 1
                      ? `${listing.bedrooms} quartos `
                      : `${listing.bedrooms} quarto `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaBath className='text-lg' />
                    {listing.bathrooms > 1
                      ? `${listing.bathrooms} banheiros `
                      : `${listing.bathrooms} banheiro `}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaParking className='text-lg' />
                    {listing.parking ? 'Vagas na garagem' : 'Sem garagem'}
                  </li>
                  <li className='flex items-center gap-1 whitespace-nowrap '>
                    <FaChair className='text-lg' />
                    {listing.furnished ? 'Mobilhado' : 'Sem mobília'}
                  </li>
                </ul>
                {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-blue-800 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contate o Anunciante
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
