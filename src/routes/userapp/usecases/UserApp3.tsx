import { useRef, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, InputLabel, FormControl, Input, DialogActions } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Item {
    title: string;
    subtitle: string;
}

function UserApp3() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [startDateTime, setStartDateTime] = useState<dayjs.Dayjs | null>(null);
    const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | null>(null);
    const [peopleCount, setPeopleCount] = useState<number>(1);
    const [reservationSuccess, setReservationSuccess] = useState(false);
    const [showPromptDialog, setShowPromptDialog] = useState(false);
    const prevPeopleCount = useRef(peopleCount);
    const [reserveEnabled, setReserveEnabled] = useState(false)
    
    const resetStates = () => {
        setSelectedItem(null);
        setStartDateTime(null);
        setEndDateTime(null);
        setPeopleCount(1);
        setShowPromptDialog(false);
        setReservationSuccess(false);
        setReserveEnabled(false)
    };

    const items: Item[] = [
        { title: 'Item 1', subtitle: 'Subtitle 1' },
        { title: 'Item 2', subtitle: 'Subtitle 2' }
    ];

    const handlePeopleSubmit = () => {
        setStartDateTime(null);
        setEndDateTime(null);
        setReserveEnabled(false)
        setShowPromptDialog(true);
    }

    const handlePeopleChange = (value: number) => {
        if (value > prevPeopleCount.current) {
setReserveEnabled(false)
        }
        setPeopleCount(value);
        prevPeopleCount.current = value;
    };

    if (selectedItem) {
        return (
            <Box padding={3}>
                <Typography variant="body1" color="orange">User chooses the amount of people and a date range. Once both are selected, the user can reserve.
                When user have date rande chosen and modifies amount of people to bigger amount, RESERVE button becomes disabled</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h5">Reserve {selectedItem.title}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedItem.subtitle}</Typography>

                <FormControl margin="normal">
                    <InputLabel htmlFor="people-count">Amount of people</InputLabel>
                    <Input id="people-count" type="number" value={peopleCount} onChange={e => handlePeopleChange(+e.target.value)} />
                </FormControl>
                
                <Button variant="contained" color="primary" onClick={handlePeopleSubmit}>Submit</Button>

                <Box margin={3}>
                    <DateTimePicker value={startDateTime} onChange={(date: dayjs.Dayjs | null) => { setStartDateTime(date); }} label="Select Start Date and Time" />
                </Box>
                <Box margin={3}>
                    <DateTimePicker value={endDateTime} onChange={(date: dayjs.Dayjs | null) => { setEndDateTime(date); setReserveEnabled(true)}} label="Select End Date and Time" />
                </Box>
                <Button style={{ margin: '5px' }} variant="contained" color="primary" disabled={!reserveEnabled} onClick={() => setReservationSuccess(true)}>
                    Reserve Item
                </Button>
                <Button style={{ margin: '5px', backgroundColor: 'gray' }} variant="contained"  onClick={resetStates}>Back</Button>

                <Dialog open={reservationSuccess} onClose={() => setReservationSuccess(false)}>
                    <DialogTitle>Successful reservation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Start Date and Time: {startDateTime?.format('YYYY-MM-DD HH:mm')} <br />
                            End Date and Time: {endDateTime?.format('YYYY-MM-DD HH:mm')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={resetStates} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={showPromptDialog} onClose={() => setShowPromptDialog(false)}>
                    <DialogTitle style={{ color: 'orange' }}>Notice</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ color: 'orange' }}>
                            Now the request is sent to the server and new available dates are fetched, calendar resets.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowPromptDialog(false)} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h6">Userapp variant 4 - wielu użytkowników na jeden przedmiot, elastyczny czas</Typography>
            <Typography variant="body1" color="orange"> one item, many users simultaneously, continuous time</Typography>
            <Typography variant="h5">Choose an item to reserve</Typography>
            <Typography variant="body2" color="textSecondary">Select an item, then specify the number of people and pick your desired date and time.</Typography>
            <Divider style={{ margin: '20px 0' }} />

            <List>
                {items.map((item) => (
                    <ListItem button key={item.title} onClick={() => setSelectedItem(item)}>
                        <Box width={40} height={40} borderRadius="50%" bgcolor="blue" marginRight={2}></Box>
                        <ListItemText primary={item.title} secondary={item.subtitle} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default UserApp3;
