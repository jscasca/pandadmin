import React from "react";
import { useLoaderData, useLocation } from "react-router-dom";

export const Product = () => {
  const { state } = useLocation();
  const { id } = useLoaderData() as { id: string};

  console.log(id, state);

  return (<div className="">
    Producto {id}
  </div>);
};