import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { PropertyEditor } from "./PropertyEditor";

export const Property = () => {

  const location = useLocation();
  const state = location.state;
  let { id } = useParams();
  console.log('Development:', id, state);
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
      <div id="sidebar">
        <h1>Property</h1>
      </div>
      <div className="container">
        <PropertyEditor listingId={id} />
      </div>
    </>
  );
}