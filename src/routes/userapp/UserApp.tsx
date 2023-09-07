import UserHeader from "./UserHeader";
import UserApp1 from "./usecases/UserApp1";


function UserApp() {
    return (
        <>
            <UserHeader logoText={"COMPANY"} />
            <UserApp1 />
        </>
    );
}

export default UserApp;
