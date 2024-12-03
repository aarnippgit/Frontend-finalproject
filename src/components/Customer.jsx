import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { getCustomers, deleteFunction } from '../customerapi';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { resetDB } from '../customerapi';

export default function Customer() {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
            field:"Actions",
            cellRenderer: params => <Button size="small" color = "error" onClick={() => handleDelete(params.data)}>Delete</Button>,
            width: 150
        },
        {
            cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch} />,
            width: 150
        },
        {
            cellRenderer: params => <AddTraining data={params.data} handleFetch={handleFetch} />,
            width: 150
        },
        {field: "firstname", filter: true},
        {field: "lastname", filter: true},
        {field: "streetaddress", filter: true},
        {field: "postcode", filter: true},
        {field: "city", filter: true},
        {field: "email", filter: true},
        {field: "phone", filter: true},
    ]);

    const handleReset = () => {
        resetDB()
            .then(() => {
                alert("Database reset successfully!");
                handleFetch();
            })
            .catch(error => {
                console.error("Error resetting database:", error);
                alert("Failed to reset the database.");
            });
    };
    

    const handleDelete = (params) => {
        if(window.confirm("Are you sure?")){
            setOpen(true);
            deleteFunction(params._links.self.href)
            .then(() => handleFetch())
            .catch(error => console.error(error))
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);
    
    const handleFetch = () => {
        getCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(error => console.error(error))
    }

    const handleClose = () =>{
        setOpen(false);
    }
    return(
        <>
            <AddCustomer handleFetch={handleFetch}/>
            <div className='ag-theme-material' style={{height: 500}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar
                    open={open}
                    message="Customer deleted"
                    autoHideDuration={3000}
                    onClose={handleClose}
                />
                <button onClick= {handleReset}>RESET</button>
            </div>
        </>
    );
}  
