import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

function UserApp() {
  const { userId } = useParams();
  // const [activeApp, setActiveApp] = useState<number>(1);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              COMPANY
            </Typography>
            <Button color="inherit">UserApp {userId}</Button>
            {/* <Button color="inherit" onClick={() => setActiveApp(2)}>UserApp2</Button>
                        <Button color="inherit" onClick={() => setActiveApp(3)}>UserApp3</Button>
                        <Button color="inherit" onClick={() => setActiveApp(4)}>UserApp4</Button>
                        <Button color="inherit" onClick={() => setActiveApp(5)}>UserApp5</Button>
                        <Button color="inherit" onClick={() => setActiveApp(6)}>UserApp6</Button> */}
            <Button color="inherit">Log in</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
      {/* {activeApp === 1 && <UserAppFirstScreen />} */}
      {/* {activeApp === 2 && <UserApp2 />}
            {activeApp === 3 && <UserApp3 />}
            {activeApp === 4 && <UserApp4 />}
            {activeApp === 5 && <UserApp5 />}
            {activeApp === 6 && <UserApp6 />} */}
    </>
  );
}

export default UserApp;
