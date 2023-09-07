import { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, DialogActions } from '@mui/material';

interface Item {
    title: string;
    subtitle: string;
}

function UserApp6() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const [reservationSuccess, setReservationSuccess] = useState(false);

    const resetStates = () => {
        setSelectedItem(null);

        setReservationSuccess(false);
    };

    const items: Item[] = [
        { title: 'Item 1', subtitle: 'data 22.05.2023 17:30' },
        { title: 'Item 2', subtitle: 'data 26.05.2023 18:30' }
    ];

    if (selectedItem) {
        return (
            <Box padding={3}>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h5">Reserve {selectedItem.title}</Typography>
                <Typography variant="body2" color="textSecondary">{selectedItem.subtitle}</Typography>
                <Typography variant="h5">Pozostało miejsc: 5</Typography>

                <Button style={{ margin: '5px' }} variant="contained" color="primary" onClick={() => setReservationSuccess(true)}>
                    Reserve Item
                </Button>
                <Button style={{ margin: '5px', backgroundColor: 'gray' }} variant="contained" onClick={resetStates}>Back</Button>

                <Dialog open={reservationSuccess} onClose={() => setReservationSuccess(false)}>
                    <DialogTitle>Successful reservation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Rezerwacja powiodla sie
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
            <Typography variant="h6">Userapp variant 4 - wielu uzytkownik na jeden przedmiot, konkretna godzina - bez miejsc</Typography>
            <Typography variant="body1" color="orange"> one item, many user simultaneously, specific time. </Typography>
            <Typography variant="h5">Choose item that interests you</Typography>

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

export default UserApp6;
