import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {  getTrainings, getCustomer, deleteFunction } from '../customerapi';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default function Training() {
    
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const [open, setOpen] = useState(false);
    const [trainings, setTrainings] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            field:"Actions",
            cellRenderer: params => 
            <IconButton size="small" color = "error" onClick={() => handleDelete(params.data)}><DeleteIcon /></IconButton>,
            width: 150,
            sortable:false
        },
        {
            field: "date", 
            filter: true,
            valueFormatter: (params) => dayjs(params.value).format('DD.MM.YYYY H:mm')
        },
        {field: "duration", filter: true},
        {field: "activity", filter: true},
        {field: "customerName", 
            headerName: "Customer", 
            filter: true
        }, 
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
                            date: training.date,
                            customerName: customer.firstname + " " + customer.lastname
                        }))
                        .catch(error => console.error(error))
                );
                Promise.all(fetchPromises).then(updatedTrainings => {
                    setTrainings(updatedTrainings);
                });
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDelete = (params) => {
        if(window.confirm("Delete training?")){
            setOpen(true);
            deleteFunction(params._links.self.href)
            .then(() => handleFetch())
            .catch(error => console.error(error))
        }
    }

    const handleClose = () =>{
        setOpen(false);
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
                <Snackbar
                    open={open}
                    message="Training deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}  