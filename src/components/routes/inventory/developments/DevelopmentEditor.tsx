import React, { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../AxiosContext";
import { MdHomeWork } from "react-icons/md";
import Modal from 'react-modal';
import { AddUnit } from "./AddUnit";
import { LinkUnits } from "./LinkUnits";
import { DevelopmentUnits } from "./DevelopmentUnits";
import { DevelopmentCard } from "./DevelopmentCard";

type Props = {
  developmentId: string|undefined;
};

interface Development {
  name: string;
}

// const modalStyles = {
//   content: {
//     border: '0',
//     borderRadius: '4px',
//     bottom: 'auto',
//     height: heightPx,  // set height
//     left: '50%',
//     padding: '2rem',
//     position: 'fixed',
//     right: 'auto',
//     top: '50%', // start from center
//     transform: 'translate(-50%,-' + offsetPx + ')', // adjust top "up" based on height
//     width: '40%',
//     maxWidth: '40rem'
//   }
// };

export const DevelopmentEditor = ({ developmentId }: Props) => {
  Modal.setAppElement('#root');

  const modalStyles = {content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }};

  const { authAxios } = useContext(AxiosContext);

  const [ fetching, setFetching ] = useState<boolean>(false);

  const [ development, setDevelopment ] = useState<Development>();
  const [ listings, setListings ] = useState<any[]>([])

  const [modal, setModal] = useState(false);

  console.log(development);

  useEffect(() => {
    if (developmentId === undefined) {
      return;
    }
    const fetch = async (id: string) => {
      setFetching(true);
      const result = await authAxios.get(`/inventory/developments/${id}`);
      console.log(result.data);
      setDevelopment(result.data.data);
      const devListings: any[] = result.data.data.listings;
      if (devListings.some((l) => typeof l === 'string')) {
        // listings need to be fetched
        const toFetch = devListings.filter((l) => typeof l === 'string');
        const params = {
          filters: { '_id': { $in: toFetch } },
          projection: 'street exterior suburb rooms bathrooms parking sqft'
        }
        const fetchListings = await authAxios.get('/inventory/properties', { params });
        const fetched = fetchListings.data.data;
        // merge
        setListings([...devListings.filter((l) => typeof l !== 'string'), fetched]);
      } else {
        setListings(devListings);
      }
      // check for fetching listings
      setFetching(false);
    };
    fetch(developmentId);
  }, [authAxios, developmentId]);

  const saveNewUnits = async (units: any) => {
    console.log('saving: ', units);
    try {
      const data = {data: units};
      const updated = await authAxios.post(`/inventory/developments/${developmentId}/addunits`, data);
      console.log(updated); // array of the recently added units
      const updatedUnits: any[] = updated.data.data;
      console.log(updatedUnits);
      setListings([...listings, updatedUnits]);
      setModal(false);
    } catch(e) {
      console.error(e);
    }
  }

  const linkUnits = async (units: any[]) => {
    try {
      const data = {data: units, opts: {attributes: "address street exterior building interior rooms suburb"}};
      const updated = await authAxios.post(`/inventory/developments/${developmentId}/linkunits`, data);
      setDevelopment(updated.data.data);
      setListings(updated.data.data.listings);
      // refrain from setting updated?
    } catch (e) {
      console.error(e);
    }
  };

  return (<>
    { fetching ? <img src='/loading-gif.gif' alt='loading...' /> : (<div className="development-editor">
      <h2><MdHomeWork /> Desarrollo: {development?.name}</h2>
      
      {/* <button onClick={() => setModal(true)}>Agregar unidades</button> */}
      <Modal
      isOpen={modal}
      onRequestClose={() => setModal(false)}
      contentLabel="Example mod"
      style={modalStyles}
      >
        <AddUnit onSave={saveNewUnits} onCancel={() => setModal(false)} />
      </Modal>
      <DevelopmentCard development={development} />
      <DevelopmentUnits onAdd={() => setModal(true)} listings={listings} />
      <LinkUnits onSave={(units) => linkUnits(units)} development={development} />
    </div>)}
  </>);
};