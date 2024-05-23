import { Link } from 'react-router-dom';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white border-4 border-red-800 shadow-md hover:shadow-lg transition-shadow  overflow-hidden rounded-lg w-full sm:w-330px'>
      <Link to={`/listing/${listing._id}`}>
      <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-800'>{listing.className}</p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-800' />
            <p className='text-sm text-gray-800 truncate w-full'>{listing.address}</p>
          </div>
          <p className='text-sm text-gray-800 line-clamp-2'>{listing.description}</p>
          <p className='text-slate-800 mt-2 font-semibold'>R$ {listing.offer ? listing.discountPrice.toLocaleString('pt-BR') : listing.regularPrice.toLocaleString('pt-BR')}
            {listing.type === 'rent' && '/ mês'}
          </p>
          <div className='text-slate-800 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.bedrooms > 1 ? `${listing.bedrooms} quartos` : `${listing.bedrooms} quarto`}
            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} banheiros` : `${listing.bathrooms} banheiro`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
