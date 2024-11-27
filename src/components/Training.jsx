import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import {  getTrainings, getCustomer } from '../customerapi';
import dayjs from 'dayjs';


export default function Training() {
    const [trainings, setTrainings] = useState([]);

    const [colDefs, setColDefs] = useState([
        {field: "date", filter: true},
        {field: "duration", filter: true},
        {field: "activity", filter: true},
        {field: "customerName", headerName: "Customer", filter: true}, 
    ]);

    useEffect(() => {
        handleFetch();
    }, []);
    
    const handleFetch = () => {
        
        getTrainings()
            .then(data => {
                const trainings = data._embedded.trainings;

                const fetchPromises = trainings.map(training =>
                    getCustomer(training._links.customer.href)
                        .then(customer => ({
                            ...training,
                            date: dayjs(training.date).format('DD.MM.YYYY H:mm'),
                            customerName: customer.firstname + " " + customer.lastname
                        }))
                        .catch(error => {
                            console.error(error);
                            return {
                                ...training,
                                customerName: ""
                            };
                        })
                );
                Promise.all(fetchPromises).then(updatedTrainings => {
                    setTrainings(updatedTrainings);
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

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