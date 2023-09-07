import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';

interface SubItem {
    id: number,
    title: string;
    subtitle: string;
    date: string;
    row: number,
    seat: number
}
interface Item {
    id: number,
    title: string;
    subtitle: string;
    date: string;
}

function UserApp2() {
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [selectedSubItemsList, setSelectedSubItemsList] = useState<SubItem[]>([]);

    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const subItems: SubItem[] = [
        { id: 1, title: 'SubItem 1', subtitle: 'Subtitle 1', date: '22.03.2022', row: 1, seat: 1 },
        { id: 2, title: 'SubItem 2', subtitle: 'Subtitle 2', date: '22.03.2022', row: 1, seat: 2 },
        { id: 3, title: 'SubItem 2', subtitle: 'Subtitle 2', date: '22.03.2022', row: 1, seat: 3 },
        // ... Add more items as needed
    ];


    const items: Item[] = [
        { id: 1, title: 'Item 1', subtitle: 'Subtitle 1', date: '22.03.2022' },
        { id: 2, title: 'Item 2', subtitle: 'Subtitle 2', date: '22.03.2022' },
        // ... Add more items as needed
    ];

    const toggleItemSelection = (item: SubItem) => {
        if (selectedSubItemsList.some(selected => selected.id === item.id)) {
            setSelectedSubItemsList(prev => prev.filter(selected => selected.id !== item.id));
        } else {
            setSelectedSubItemsList(prev => [...prev, item]);
        }
    }

    if (selectedItem) {
        return (
            <Box padding={3}>
                <Typography variant="body1" color="orange">User can choose multiple elements from list. In expanded version there should be also free/taken seat shown
                </Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="h6">Movie: {selectedItem.title} | {selectedItem.date}</Typography>
                <Typography variant="h5">{selectedItem.subtitle}  </Typography>
                <List>
                    {subItems.map((item, index) => (
                        <ListItem
                            button
                            key={index}
                            onClick={() => toggleItemSelection(item)}
                            style={{ backgroundColor: selectedSubItemsList.some(i => i.id === item.id) ? '#AACCFF' : 'white' }}
                        >
                            <ListItemText
                                primary={`row ${item.row}, seat: ${item.seat}`}
                                secondary={item.title}
                                style={{ color: selectedSubItemsList.some(i => i.id === item.id) ? 'white' : 'black' }}
                            />
                        </ListItem>
                    ))}
                </List>
                <Box marginTop={2}>
                    <Button variant="contained" color="primary" onClick={() => setShowSuccessDialog(true)}>Submit</Button>
                    <Button style={{ marginLeft: '10px' }} variant="contained" onClick={() => setSelectedItem(null)}>Back</Button>
                </Box>

                <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
                    <DialogTitle>Successful</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            You have selected: {selectedSubItemsList.map(item => `row_${item.row}_seat_${item.seat}`).join(', ')}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            setShowSuccessDialog(false);
                            setSelectedItem(null);
                            setSelectedSubItemsList([]);  // Reset the selected items
                        }} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    }
    return (
        <Box padding={3}>
            <Typography variant="h6">Userapp variant 1</Typography>
            <Typography variant="body1" color="orange"> One item, many users simultanously, exact reservation, specific certain dates</Typography>
            <Typography variant="h5">Choose an item to reserve</Typography>
            <Typography variant="body2" color="textSecondary">Select an item, then pick your seat.</Typography>
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

export default UserApp2;








