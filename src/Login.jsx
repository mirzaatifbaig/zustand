import useUserStore from "@/store.jsx";
import {useEffect, useState} from "react";

export default function Login() {
    const {login, logout, fetchUsers, loggedInUser} = useUserStore();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleLogin = () => {
        if (login(username, password)) {
            alert('login successful');
        } else {
            alert('login failed');
        }
    }
    return (
        <div className="p-6 max-w-sm mx-auto bg-white shadow-md rounded-md">
            {loggedInUser ? (
                <div>
                    <h2 className="text-xl font-bold mb-2">Welcome, {loggedInUser.username}!</h2>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4">Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="border p-2 w-full mb-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border p-2 w-full mb-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Login
                    </button>
                </div>
            )}
        </div>
    )
}