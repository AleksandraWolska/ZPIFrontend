import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const UserHeader = ({ logoText = "COMPANY" }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {logoText}
                    </Typography>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">Contact</Button>
                    <Button color="inherit">Log in</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default UserHeader;