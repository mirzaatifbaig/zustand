import UserList from "@/UserList.jsx";
import ThemeToggle from "@/ThemeToggle.jsx";
import useUserStore from "@/store.jsx";
import {useEffect} from "react";

function App() {

    return (
        <div className={'flex items-center min-h-screen'}>
            <UserList />
        </div>
    );
}

export default App;
