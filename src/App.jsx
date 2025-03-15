import UserList from "@/UserList.jsx";
import ThemeToggle from "@/ThemeToggle.jsx";
import useUserStore from "@/store.jsx";

function App() {
    const {isDarkMode, toggleDarkMode} = useUserStore()
    return (
        <div  className={(`${isDarkMode ? 'dark': ''} flex items-center justify-center min-h-screen dark:bg-black bg-gray-100`)}>


            <ThemeToggle/>
            <UserList />

        </div>
    );
}

export default App;
