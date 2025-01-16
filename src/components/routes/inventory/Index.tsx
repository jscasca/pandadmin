import React from "react";

export const InventoryIndex = () => {
  // const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  return (
    <>
      <div id="sidebar">
        <h1>Index</h1>
      </div>
      <div id="detail">
        <a className="home-link" href="/inventory/location">
          <div className="linked-div">
            Ubicaciones
          </div>
        </a>
      </div>
    </>
  );
}