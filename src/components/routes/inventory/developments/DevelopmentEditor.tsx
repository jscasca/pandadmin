import React, { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../../../AxiosContext";

type Props = {
  developmentId: string|undefined;
};

export const DevelopmentEditor = ({ developmentId }: Props) => {

  const { authAxios } = useContext(AxiosContext);

  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ development, setDevelopment ] = useState();

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
      setFetching(false);
    };
    fetch(developmentId);
  }, [authAxios, developmentId]);

  return (<>
    <div className="main-development">
      { fetching ? <img src='/loading-gif.gif' alt='loading...' /> : (<div></div>)}
    </div>
  </>);
};