import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { getCustomers,deleteCustomer } from '../customerapi';
import AddCustomer from './AddCustomer';
import AddTraining from './AddTraining';

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [colDefs, setColDefs] = useState([
        {field: "firstname", filter: true},
        {field: "lastname", filter: true},
        {field: "streetaddress", filter: true},
        {field: "postcode", filter: true},
        {field: "city", filter: true},
        {field: "email", filter: true},
        {field: "phone", filter: true},
        {
            cellRenderer: params => <Button size="small" color = "error" onClick={() => handleDelete(params.data)}>Delete</Button>,
            width: 150
        },
    ]);

    const handleDelete = (params) => {
        if(window.confirm("Are you sure?")){
            setOpen(true);
            deleteCustomer(params._links.self.href)
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
    return(
        <>
            <AddCustomer />
            <div className='ag-theme-material' style={{height: 500}}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}  