import useUserStore from "@/store";
import UserList from "@/UserList.jsx";

function App() {
    const {isDarkMode, toggleDarkMode} = useUserStore();
    return (<div
            className={`${isDarkMode ? 'dark   ' : ''} flex flex-col items-center justify-center min-h-screen dark:bg-black dark:text-white`}>
            <UserList/>

            <button onClick={toggleDarkMode} className={'px-3 py-2 bg-yellow-500 text-black rounded mb-4'}>
                {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>);
}

export default App;
    