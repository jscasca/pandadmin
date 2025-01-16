import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { DevelopmentEditor } from "./DevelopmentEditor";

export const Development = () => {

  const location = useLocation();
  const state = location.state;
  let { id } = useParams();
  console.log('Development:', id, state);
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
      <div id="sidebar">
        <h1>Development</h1>
      </div>
      <div className="container">
        <DevelopmentEditor developmentId={id} />
      </div>
    </>
  );
}