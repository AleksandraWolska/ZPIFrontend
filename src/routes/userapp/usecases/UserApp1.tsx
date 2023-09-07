import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Item {
    title: string;
    subtitle: string;
}

function UserApp1() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [startDateTime, setStartDateTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | null>(dayjs());
    const [showSuggestedDialog, setShowSuggestedDialog] = useState(false);
    const [availabilityChecked, setAvailabilityChecked] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState(false);

    const resetStates = () => {
        setSelectedItem(null);
        setStartDateTime(dayjs());
        setEndDateTime(dayjs());
        setShowSuggestedDialog(false);
        setAvailabilityChecked(false);
        setReservationSuccess(false);
    };

    const handleDateTimeChange = () => {
        setAvailabilityChecked(false);
    }

    const items: Item[] = [
        { title: 'Item 1', subtitle: 'Subtitle 1' },
        { title: 'Item 2', subtitle: 'Subtitle 2' }
    ];

    const suggestedDateRanges = [
        { startOffset: 0.5, endOffset: 0.5 },
        { startOffset: 1, endOffset: 1 },
        { startOffset: 2, endOffset: 2 },
    ].map(range => ({
        start: startDateTime?.add(range.startOffset, 'hour') || null,
        end: endDateTime?.add(range.endOffset, 'hour') || null
    }));

    const handleSuggestedDateClick = (index: number) => {
        const suggestedDate = suggestedDateRanges[index];
        setStartDateTime(suggestedDate.start);
        setEndDateTime(suggestedDate.end);
        setShowSuggestedDialog(false);
        setAvailabilityChecked(true);
    }

    if (selectedItem) {
        return (
            <Box padding={3}>
                <Typography variant="body1" color="orange">User chooses start and end date, then checks availability...</Typography>
                <Typography variant="h6">{selectedItem.title}</Typography>
                <Typography variant="body1">{selectedItem.subtitle}</Typography>

                <DateTimePicker value={startDateTime} onChange={(date: dayjs.Dayjs | null) => { setStartDateTime(date); handleDateTimeChange(); }} label="Select Start Date and Time" />
                <DateTimePicker value={endDateTime} onChange={(date: dayjs.Dayjs | null) => { setEndDateTime(date); handleDateTimeChange(); }} label="Select End Date and Time" />

                <Button variant="contained" color="primary" onClick={() => availabilityChecked ? setReservationSuccess(true) : setShowSuggestedDialog(true)}>
                    {availabilityChecked ? 'Reserve Item' : 'Check Availability'}
                </Button>
                <Button variant="contained" onClick={resetStates}>Back</Button>

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

                <Dialog open={showSuggestedDialog} onClose={() => setShowSuggestedDialog(false)}>
                    <DialogTitle>Suggested Times</DialogTitle>
                    <DialogContent>
                        <List>
                            {suggestedDateRanges.map((range, index) => (
                                <ListItem button key={index} onClick={() => handleSuggestedDateClick(index)}>
                                    <ListItemText primary={`Start: ${range.start?.format('YYYY-MM-DD HH:mm')}, End: ${range.end?.format('YYYY-MM-DD HH:mm')}`} />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowSuggestedDialog(false)} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }

    return (
        <Box padding={3}>
            <Typography variant="h6">Userapp variant1</Typography>
            <Typography variant="body1" color="orange">User choses start and end date, clicks CHECK_AVAILABILITY button. A list of suggested dates appear.
                Clicking on one of them sets datepicker for this particular value, and changes button to RESERVE, as it is already checked date. 
                User can still modify the dates, and if he does so, the RESERVE button will be replaced again with CHECK AVAILABILITY BUTTON 
            </Typography>
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

export default UserApp1;
