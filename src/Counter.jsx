import useUserStore from "@/store.jsx";
import {useState} from "react";
import UserInfo from "@/UserInfo.jsx";

const Counter = () => {
    const {count, increase, decrease, reset, username, setUsername} = useUserStore()
    const [newUserName, setNewUserName] = useState("")
    return (
        <div className="flex flex-col items-center  light:bg-gray-100 p-4">
            <UserInfo username={username} setUsername={setUsername} />
            <input
                type="text"
                placeholder="Enter your name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="px-4 py-2 border rounded mb-4"
            />
            <button
                onClick={() => setUsername(newUserName)}
                className="px-4 py-2 bg-green-500 text-white rounded mb-4"
            >
                Set Username
            </button>
            <h2 className="text-xl font-bold mb-4">Counter: {count}</h2>
            <div className="flex space-x-4">
                <button onClick={increase} className="px-4 py-2 bg-blue-500 text-white rounded">Increase</button>
                <button onClick={decrease} className="px-4 py-2 bg-red-500 text-white rounded">Decrease</button>
                <button onClick={reset} className="px-4 py-2 bg-gray-500 text-white rounded">Reset</button>
            </div>
        </div>
    );
}
export default Counter;