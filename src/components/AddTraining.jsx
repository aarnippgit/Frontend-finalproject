import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { saveTraining } from '../customerapi';

export default function Addtraining(props) {
    const [training, setTraining] = useState({
        date:dayjs(),
        duration:"",
        activity:"",
        customer:props.data._links.customer.href
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave= () => {
        saveTraining(training)
        .then(() => {
            props.handleFetch(); 
            handleClose();
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle>New Training</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fi">
                    <DateTimePicker
                        ampm={false}
                        value= {training.date}
                        onChange={(newValue) => setTraining({...training, date: newValue})}
                    />
                </LocalizationProvider>
                <TextField
                    margin="dense"
                    name="duration"
                    value={training.duration}
                    onChange={event => setTraining({...training, duration: event.target.value})}
                    label="Duration"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    name="activity"
                    value={training.activity}
                    onChange={event => setTraining({...training, activity: event.target.value})}
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
