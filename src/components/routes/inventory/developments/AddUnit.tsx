import React, { useState } from "react";
import {
  MdBed,
  MdBathtub,
  MdDirectionsCar,
  MdOutlineLayers
} from "react-icons/md";
type Props = {
  onSave: (data: any[]) => void;
  onCancel: () => void;
};
export const AddUnit = ({ onSave, onCancel }: Props) => {

  const emptyRow = ['','','','','',''];
  // const headers = [];
  const initialState = [ [...emptyRow] ];

  const [ isLoading, setLoading ] = useState(false);

  const [ rows, setRows ] = useState(initialState);
  console.log(onSave, rows, setRows);

  const blurFromCell = (i: number) => (e: any) => {
    if (i + 1 === rows.length) {
      // last row so create new row if needed
      if (e.target.value !== '') {
        const next = rows.concat([[...emptyRow]]);
        setRows(next);
      }
    }
  };

  const changeCell = (i: number, j: number) => (e: any) => {
    const updated = [...rows];
    updated[i][j] = e.target.value;
    setRows(updated);
  };

  const arrayToUnits = (arr: string[]) => {
    return {
      ...{ building: arr[0]},
      ...{ interior: arr[1]},
      ...( arr[2] !== '' ? { rooms: Number(arr[2])} : {}),
      ...( arr[3] !== '' ? { bathrooms: Number(arr[3])} : {}),
      ...( arr[4] !== '' ? { parking: Number(arr[4])} : {}),
      ...( arr[5] !== '' ? { sqft: Number(arr[5])} : {})
    }
  }

  const filterEmpty = (arr: string[]) => {
    return arr.some((e) => e!=='') && arr.length === 6;
  };

  const handleSave = () => {
    setLoading(true);
    const units = rows.filter(filterEmpty).map(arrayToUnits);
    console.log(units);
    onSave(units);
  };

  return (<>
    <div className="addunit-container">
      <h3>Agregar Unidades</h3>
      <div className="units-table">
        <table>
          <thead>
            <tr>
              <th>Edificio</th>
              <th>Unidad</th>
              <th><MdBed /></th>
              <th><MdBathtub /></th>
              <th><MdDirectionsCar /></th>
              <th><MdOutlineLayers /></th>
            </tr>
          </thead>
          <tbody>
            { rows.map((row, i) => {
              return (<tr key={i}>{ row.map((cell, j) => {
                return (<td key={i+','+j}>
                  <input autoFocus={i === 0 && j === 0} type={j > 1 ? 'number':'text'} onChange={changeCell(i,j)} onBlur={blurFromCell(i)} value={cell}/>
                </td>)
              }) }</tr>);
            }) }
          </tbody>
        </table>
      </div>
      <div className="form-controls">
        <button disabled={isLoading} onClick={() => handleSave()} className="main">{ isLoading ? <img src='/loading-gif.gif' alt='loading...' /> : 'Guardar'}</button>
        <button onClick={() => onCancel()} >Cancelar</button>
      </div>
    </div>
  </>);
};