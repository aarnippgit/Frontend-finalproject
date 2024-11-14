import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import {  getTrainings } from '../customerapi';

export default function Training() {
    const [trainings, setTrainings] = useState([]);

    const [colDefs, setColDefs] = useState([
        {field: "date", filter: true},
        {field: "duration", filter: true},
        {field: "activity", filter: true},
        {field: "customer", filter: true}
    ]);
    useEffect(() => {
        handleFetch();
    }, []);
    
    const handleFetch = () => {
        getTrainings()
        .then(data => setTrainings(data._embedded.trainings))
        .catch(error => console.error(error))
    }

    return(
        <>
            <div className='ag-theme-material' style={{height: 500}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}  