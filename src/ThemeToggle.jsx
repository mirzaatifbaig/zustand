import useUserStore from "@/store.jsx";

const ThemeToggle = () => {
    const {theme, toggleTheme} = useUserStore()
    return (
        <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded m-8 ${
                theme === 'dark' ? 'bg-black text-white' : 'bg-gray-200 text-black'
            }`}
        >
            {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
    )
}
export default ThemeToggle;