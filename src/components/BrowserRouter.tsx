import React from "react";
import { createBrowserRouter, LoaderFunctionArgs, redirect, RouterProvider } from "react-router-dom";

// Routes
import Root from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import { Login } from "./routes/Login";
import { Product } from "./routes/Product";
import { ProductHome } from "./routes/ProductHome";

import { EncasaHome } from "./routes/encasa/Home";
import { EncasaIndex } from "./routes/encasa/Index";

import { IsAuthenticated } from "./AuthContext";
import { AddressRoute } from "./routes/Addresses";
import { InventoryHome } from "./routes/inventory/Base";
import { InventoryIndex } from "./routes/inventory/Index";
import { NewLocation } from "./routes/inventory/NewLocation";
import { EditLocation } from "./routes/inventory/EditLocation";
import { InventoryLocationHome } from "./routes/inventory/location/Index";
// Developments
import { Development } from "./routes/inventory/developments/Development";
import { Developments } from "./routes/inventory/developments/DevelopmentHome";
// Properties
import { Properties } from "./routes/inventory/properties/PropertyHome";
import { Property } from "./routes/inventory/properties/Property";
import { NewDevelopment } from "./routes/inventory/developments/NewDevelopment";
import { EncasaSearch } from "./routes/encasa/EncasaSearch";
import { EncasaMap } from "./routes/encasa/EncasaMap";
import { EncasaProperty } from "./routes/encasa/EncasaProperty";

const productLoader = async ({ params }: {params: any}) => {
  // do something with params eg product/productId would be params.productId
  return { id: params.productId };
};

const protectedLoader = ({ request }: LoaderFunctionArgs) => {
  if (!IsAuthenticated()) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect('/login?' + params.toString());
  }
  return null;
}

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'encasa',
      element: <EncasaHome />,
      children: [
        {
          index: true,
          element: <EncasaIndex />
        },
        {
          path: 'search',
          element: <EncasaSearch />
        },
        {
          path: 'map',
          element: <EncasaMap />
        },{
          path: ':id',
          element: <EncasaProperty />
        }
      ]
    },
    {
      path: 'inventory',
      loader: productLoader,
      element: <InventoryHome />,
      children: [
        {
          index: true,
          element: <InventoryIndex />
        },
        {
          path: 'developments',
          children: [
            { index: true, element: <Developments /> },
            { path: 'new', element: <NewDevelopment /> },
            { path: ':id', element: <Development /> }
          ]
        },
        {
          path: 'properties',
          children: [
            { index: true, element: <Properties /> },
            { path: 'new', element: <NewLocation />}, // TODO: update to new path
            { path: ':id', element: <Property /> }
          ]
        },
        {
          path: 'location', // TODO: Remove this and update to properties
          children: [
            {
              index: true,
              element: <InventoryLocationHome />
            },
            {
              path: 'new',
              element: <NewLocation />
            },
            {
              path: ':id',
              element: <EditLocation />
            }
          ]
        },
        {
          path: 'custom',
          element: <AddressRoute />
        },
        {
          path: ':id',
          element: <InventoryIndex />
        }
      ]
    },
    {
      path: 'addresses',
      loader: productLoader,
      element: <AddressRoute />
    },
    {
      path: 'newaddress',
      loader: protectedLoader,
      element: <ProductHome />
    },
    {
      path: 'products/:id',
      element: <Product />,
      loader: productLoader
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}