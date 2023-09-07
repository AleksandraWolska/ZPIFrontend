import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import UserApp1 from "./usecases/UserApp1";
import UserApp2 from "./usecases/UserApp2";
import { useState } from 'react';
import UserApp3 from './usecases/UserApp3';
import UserApp4 from './usecases/UserApp4';
import UserApp5 from './usecases/UserApp5';
import UserApp6 from './usecases/UserApp6';
// import UserApp3 from "./usecases/UserApp3";

function UserApp() {

    const [activeApp, setActiveApp] = useState<number>(1);
    return (

         <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            COMPANY
                        </Typography>
                        <Button color="inherit" onClick={() => setActiveApp(1)}>UserApp1</Button>
                        <Button color="inherit" onClick={() => setActiveApp(2)}>UserApp2</Button>
                        <Button color="inherit" onClick={() => setActiveApp(3)}>UserApp3</Button>
                        <Button color="inherit" onClick={() => setActiveApp(4)}>UserApp4</Button>
                        <Button color="inherit" onClick={() => setActiveApp(5)}>UserApp5</Button>
                        <Button color="inherit" onClick={() => setActiveApp(6)}>UserApp6</Button>
                        <Button color="inherit">Log in</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            {activeApp === 1 && <UserApp1 />}
            {activeApp === 2 && <UserApp2 />}
            {activeApp === 3 && <UserApp3 />}
            {activeApp === 4 && <UserApp4 />}
            {activeApp === 5 && <UserApp5 />}
            {activeApp === 6 && <UserApp6 />}
        </>
    );
}

export default UserApp;
