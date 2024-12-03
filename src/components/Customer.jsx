import {   useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCustomers, deleteFunction } from '../customerapi';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { resetDB } from '../customerapi';
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { CsvExportModule } from "@ag-grid-community/csv-export";
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    CsvExportModule,
]);
export default function Customer() {
    const gridRef = useRef();
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [colDefs, setColDefs] = useState([
        {
        headerName: "Actions",
        headerClass: 'text-center',
        cellRenderer: params => (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <IconButton size="small" color="error" onClick={() => handleDelete(params.data)}>
                    <DeleteIcon />
                </IconButton>
                <EditCustomer data={params.data} handleFetch={handleFetch} />
                <AddTraining data={params.data} handleFetch={handleFetch} />
            </div>
            ),
            width: 250,
            sortable:false
        },
        {field: "firstname", width: 130, filter: true},
        {field: "lastname", width: 130, filter: true},
        {field: "streetaddress", width: 180, filter: true},
        {field: "postcode", width: 120, filter: true},
        {field: "city", width: 130, filter: true},
        {field: "email", width: 170, filter: true},
        {field: "phone", width: 130, filter: true},
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
        if(window.confirm("Delete customer?")){
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

    const onBtnExport = useCallback(() => {
        var params = {
            columnSeparator: " | ",
            suppressQuotes: true,
            skipColumnHeaders: true,
            columnKeys:[
                "firstname", 
                "lastname",
                "streetaddress",
                "postcode",
                "city", 
                "email",
                "phone"
            ],
        } 
        gridRef.current.api.exportDataAsCsv(params);
    }, []);

    return(
        <>
            <AddCustomer handleFetch={handleFetch}/>
            <div className='ag-theme-material' style={{height: 500}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={colDefs}
                    suppressExcelExport={true}
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
                <button onClick={onBtnExport}>Download CSV export file</button>
                </div>
        </>
    );
}  
