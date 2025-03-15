import useUserStore from "@/store.jsx";

const ThemeToggle = () => {
    const {isDarkMode, toggleDarkMode} = useUserStore()
    return (
        <button
            onClick={toggleDarkMode}
            className={`px-4 py-2 rounded m-8 ${
                isDarkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'
            }`}
        >
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    )
}
export default ThemeToggle;