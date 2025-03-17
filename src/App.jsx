import UserList from "@/UserList.jsx";
import useUserStore from "@/store.jsx";
import {useEffect} from "react";

function App() {
    const {fetchUsers} = useUserStore();
    useEffect(() => {
        fetchUsers()
    },[])
    return (
        <div className={'flex items-center min-h-screen'}>
            <UserList/>
        </div>
    );
}

export default App;
