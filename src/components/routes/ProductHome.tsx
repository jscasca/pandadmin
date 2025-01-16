import React from "react";
import { Navbar } from "../elements/Navbar";
import { NewAptForm } from "../elements/NewAptForm";

export const ProductHome = () => {

  // const saveNewProduct = () => {
  //   // send data to save and then reopen on that new item
  // };
  return (
  <>
    <Navbar />
    <div>Product home</div>
    <NewAptForm />
  </>);
};