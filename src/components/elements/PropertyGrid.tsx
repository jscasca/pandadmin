import React, { useState, useEffect, useContext } from "react";

import { AxiosContext } from "../AxiosContext";
import { useNavigate } from "react-router-dom";
// import { Toggle } from "./Toggle";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

// Mock data (replace with API later)
const mockProperties = Array.from({ length: 42 }).map((_, i) => ({
  id: i,
  title: `Property ${i + 1}`,
  price: Math.floor(Math.random() * 1000000),
  status: ["For Sale", "For Rent", "For Share"][i % 3],
  image: "https://iili.io/Kxs6B2V.jpg",
}));

type PaginatedResponse<T> = {
  data: T[];
  order: "asc" | "desc";
  next_cursor?: string;
  previous_cursor?: string;
};

type Property = {
  _id: string;
  development?: string;
  interior?: string;
  street: string;
  exterior: string;
  pictures: any[];
  sale: any;
};

export const PropertyGrid = () => {
  const navigate = useNavigate();
  const { authAxios } = useContext(AxiosContext);
  // const [properties, setProperties] = useState(mockProperties);
  const [ properties, setProperties ] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState(mockProperties);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [ sale, setSale ] = useState('sale');
  const [ order, setOrder ] = useState('_id,up');

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPages = Math.ceil(filtered.length / pageSize);

  const [nextCursor, setNextCursor] = useState<string | null>(null);

  console.log(properties, setFiltered, nextCursor);

  const fetchProperties = async(params: Record<string, any> = {}): Promise<PaginatedResponse<any>> => {
    const queryString = new URLSearchParams(params as any).toString();
    const res = await fetch(`/api/properties?${queryString}`);
    console.log(res);
    if (!res.ok) {
      throw new Error(`Error fetching properties: ${res.statusText}`);
    }
    // return res.json();
    return {
      data:[],
      order:'asc',
    };
  };

  const loadProperties = async (a: any) => {
    console.log(fetchProperties, setProperties, setNextCursor);
    // const result = await fetchProperties({
    //   limit: 20,
    //   field: 'sale.price',
    //   order: 'desc',
    //   next_cursor: undefined,
    //   minPrice: 10000,
    //   maxPrice: 500000000,
    //   // rooms: 2
    // });

    // setProperties((prev) => [...prev, ...result.data]);
    // setNextCursor(result.next_cursor ?? null);
    if (!a) return;
    const fetchOnce = async () => {
      console.log('fetching');
      const params = {
        limit: 20,
        order: 'desc',
        field: '_id'
      };
      const queryString = new URLSearchParams(params as any).toString();
      try {
        console.log('pre-r', queryString);
        const response = await a.get(`/properties?${queryString}`);
        console.log('r', response);
        setProperties(response.data);
      } catch (err) {
        console.log('e:', err);
      }
      console.log('nothing');
    };
    fetchOnce();
  };

  useEffect(() => {
    loadProperties(authAxios);
  }, [authAxios])

  // useEffect(() => {
  //   let results = properties;

  //   if (search.trim() !== "") {
  //     results = results.filter((p) =>
  //       p.title.toLowerCase().includes(search.toLowerCase())
  //     );
  //   }

  //   if (statusFilter !== "all") {
  //     results = results.filter((p) => p.status === statusFilter);
  //   }

  //   setFiltered(results);
  //   setPage(1); // reset to first page on filter change
  // }, [search, statusFilter, properties]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  console.log(paginated);

  return (
    <div className="property-grid">
      {/* Filters */}
      <div className="filters">
        {/* <div className="filter">
          <Toggle label="En Venta" checked={false} onChange={() => {}}/>
        </div>
        <div className="filter">
          <Toggle label="En Renta" checked={false} onChange={() => {}}/>
        </div> */}
        <div className="filter">
          <select value={sale} onChange={(e) => {setSale(e.target.value)}}>
            <option value="sale">Venta</option>
            <option value="rent">Renta</option>
          </select>
        </div>
        <div className="filter">
          <select value={order} onChange={(e) => {setOrder(e.target.value)}} >
            <option value="price,down">Price <MdOutlineArrowDropDown /></option>
            <option value="price,up">Price <MdOutlineArrowDropUp /></option>
            <option value="_id,down">Created <MdOutlineArrowDropDown /></option>
            <option value="_id,up">Created <MdOutlineArrowDropUp /></option>
          </select>
        </div>
        {/* suburb */}
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* sorting: price/created/updated */}

        {/* filtering: sale/rent/share */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
          <option value="For Share">For Share</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid">
        {properties.map((p) => (
          <div key={p._id} className="card">
            <div className="image" style={{'cursor': 'pointer'}} onClick={() => {navigate(`/inventory/properties/${p._id}`)}}>
              <img src={p.pictures.length > 0 ? p.pictures[0].url : '/no_image.jpg'} alt={`${p.street} ${p.exterior} ${p.interior}`} />
            </div>
            <div className="content">
              <h3><a href={`/inventory/properties/${p._id}`}>{p.development} {p.interior}</a></h3>
              <p>{p.street} {p.exterior}</p>
              <p className="price">${p.sale?.price.toLocaleString()}</p>
              <span className={`status forsale`}>
                Venta
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
