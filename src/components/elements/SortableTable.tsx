import React, { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../AxiosContext";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import './SortableTable.css';
import { useNavigate } from "react-router-dom";

interface Column {
  name: string;
  property: string;
  converter?: (v: any) => any;
};

interface SortableProps {
  fetchUrl: string;
  columns: Column[];
  useProjection?: boolean;
  pageSize?: number;
  fetchSize?: number;
  navigation?: string;
};

const getProjection = (columnMap: Column[]) => {
  console.log(columnMap);
};

const sortObjArray = (arr: any[], property: string, order: boolean) => {
  const sortFn = order ? ((a: any, b: any) => a[property] < b[property] ? 1 : -1) : ((a: any, b: any) => a[property > b[property] ? 1 : -1]);
  return [...arr].sort(sortFn);
}

export const SortableTable = ({
  columns,
  useProjection = false,
  pageSize = 25,
  fetchUrl,
  fetchSize = 500,
  navigation
}: SortableProps) => {

  const navigate = useNavigate();

  console.log(columns);

  const { authAxios } = useContext(AxiosContext);


  const [fetching, setFetching] = useState(true);

  const [values, setValues] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState<any[]>([]);

  const [sortingProp, setSortingProp] = useState<string|undefined>();
  const [sortDirection, setSortDirection] = useState(false); // true asc, false desc

  const [isLocal, setIsLocal] = useState(true);

  const limitDisplay = (values: any) => {
    return values.slice(0, pageSize);
  }

  const handleLocalSorting = (header: string) => {
    // set sorting
    // Property to sort by
    const property = header;
    // Order to sort: true -> asc, false -> desc
    const order = property === sortingProp ? !sortDirection : true;

    if (isLocal) {
      // sort local
      setDisplayed(limitDisplay(sortObjArray(values, property, order)));
      setSortDirection(order);
      setSortingProp(property);
    } else {
      // call backend
    }
  };

  useEffect(() => {
    if (!authAxios) return;
    const fetch = async (endpoint: string) => {
      // remove??
      if (useProjection) {
        getProjection(columns)
      }
      const fetchCall = await authAxios.get(endpoint, {size: fetchSize});
      console.log(fetchCall);
      if (fetchCall.data.total > fetchSize) {
        setIsLocal(false);
      }
      setValues(fetchCall.data.data);
      setDisplayed(fetchCall.data.data);
      setFetching(false);
    };
    fetch(fetchUrl)
  }, [fetchUrl, authAxios, fetchSize, useProjection, columns]);

  const style = { color: 'white', fontSize: '18px' };

  return (<>
    { fetching ? <img src='/loading-gif.gif' alt='loading...' /> : (<table className="sortable-table">
      <thead>
        <tr>
        {columns.map((header, index) => (
          <th key={index} onClick={() => handleLocalSorting(header.property)}>{header.name} {header.property !== sortingProp ? '' : sortDirection ? (<MdKeyboardArrowUp style={style} />) : (<MdKeyboardArrowDown />)}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {displayed.map((row, index) => (
          <tr onClick={() => {console.log('click: ', row['_id']); if (navigation) navigate(navigation + row._id);}} key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
            {columns.map((column, subindex) => (<td key={index + '-' + subindex}>{column.converter ? column.converter(row[column.property]) : row[column.property]}</td>))}
          </tr>
        ))}
      </tbody>
    </table>)}
  </>);

}