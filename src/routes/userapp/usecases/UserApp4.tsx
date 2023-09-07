import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, DialogActions } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Item {
    title: string;
    subtitle: string;
}

function UserApp4() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [startDateTime, setStartDateTime] = useState<dayjs.Dayjs | null>(null);
    const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | null>(null);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    const resetStates = () => {
        setSelectedItem(null);
        setStartDateTime(null);
        setEndDateTime(null);
        setReservationSuccess(false);
    };

    const items: Item[] = [
        { title: 'Item 1', subtitle: 'Subtitle 1' },
        { title: 'Item 2', subtitle: 'Subtitle 2' }
    ];

    if (selectedItem) {
        return (
            <Box padding={3}>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h5">Reserve {selectedItem.title}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedItem.subtitle}</Typography>

                <Box margin={3}>
                    <DateTimePicker value={startDateTime} onChange={(date: dayjs.Dayjs | null) => { setStartDateTime(date); }} label="Select Start Date and Time" />
                </Box>
                <Box margin={3}>
                    <DateTimePicker value={endDateTime} onChange={(date: dayjs.Dayjs | null) => { setEndDateTime(date); }} label="Select End Date and Time" />
                </Box>
                <Button style={{ margin: '5px' }} variant="contained" color="primary" disabled={!startDateTime || !endDateTime} onClick={() => setReservationSuccess(true)}>
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
            </Box>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h6">Userapp variant 4 - jeden uzytkownik na jeden przedmiot, elastyczny czas</Typography>
            <Typography variant="body1" color="orange"> one item, one user simultaneously, continuous time</Typography>
            <Typography variant="h5">Choose an item to reserve</Typography>
            <Typography variant="body2" color="textSecondary">Select an item and then pick your desired date and time.</Typography>
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

export default UserApp4;
