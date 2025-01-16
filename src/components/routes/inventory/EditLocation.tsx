import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { EditListing } from "../../elements/EditListing";

export const EditLocation = () => {

  const location = useLocation();
  const state = location.state;
  let { id } = useParams();
  console.log(id);

  const fetching = false;

  // useEffect(() => {
  //   const fetch = async () => {
  //     console.log('fetching...');
  //     const result = await authAxios.get(`/listings/${id}`);
  //     setData(result.data);
  //   };
  //   console.log('passed state: ', state);
  //   if (state) {
  //     setData(state);
  //   } else {
  //     fetch();
  //   }
  // }, [ state, id, authAxios ]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     setFetching(false);
  //   }
  // }, [data]);
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
    { fetching ? (<div>Loading...</div>) : (<div>
      <EditListing listingId={id} listingData={state} />
    </div>) }
    </>
  );
}