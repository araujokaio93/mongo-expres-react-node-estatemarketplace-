import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };


  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label htmlFor="searchTerm" className="whitespace-nowrap font-semibold">
              Termos para pesquisar :
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Pesquisar..."
              className="border rounded-lg p-3 w-full focus:border-blue-500"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Tipo de Anúncio:</label>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'all'}
                />
                <label htmlFor="all">À Venda e para alugar</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'rent'}
                />
                <label htmlFor="rent">Aluguel</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.type === 'sale'}
                />
                <label htmlFor="sale">À Venda</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <label htmlFor="offer">Ofertas</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-semibold">Comodidades do Imóvel:</label>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <label htmlFor="parking">Com Garagem</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <label htmlFor="furnished">Mobilhado</label>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort_order" className="font-semibold">Ordenar pesquisa por:</label>
            <select
              onChange={handleChange}
              defaultValue="created_at_desc"
              id="sort_order"
              className="border rounded-lg p-3 focus:border-blue-500"
            >
              <option value="regularPrice_desc">Preço: Alto ao Baixo</option>
              <option value="regularPrice_asc">Preço: Baixo ao Alto</option>
              <option value="createdAt_desc">Mais Recentes</option>
              <option value="createdAt_asc">Mais Antigos</option>
            </select>
          </div>
          <button className="bg-red-800 text-white p-3 rounded-lg uppercase hover:opacity-95 transition-opacity">
            Pesquisar
          </button>
        </form>
      </div>
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold border-b-2 pb-3 text-slate-800 mt-5">
          Resultados da Pesquisa:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">Nenhum Anúncio foi Encontrado!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Carregando, Espere um pouco...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Mostrar mais resultados
            </button>
          )}
        </div>
      </div>
    </div>
  );
}