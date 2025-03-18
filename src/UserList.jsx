import useUserStore from "@/store.jsx";
import {useEffect} from "react";

export default function UserList() {
    const {users, fetchUsers, loading, nextPage, previousPage, page, totalPages} = useUserStore();
    useEffect(() => {
        fetchUsers();
    }, [page])

    return (
        <div className="p-4">
            {users.map((user) => (
                <div key={user.id} className="p-4 bg-white rounded shadow mb4">
                    <h2 className="font-semibold text-xl">{user.name}</h2>
                    <p>{user.email}</p>
                </div>
            ))}
            <div className="flex justify-center space-x-4 mt-4">
                <button onClick={previousPage}
                        disabled={page === 1}
                    className={`px-4 py-2 bg-gray-500 text-white rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    ⬅️ Previous
                </button>

                <span className="text-lg font-semibold">Page {page} of {totalPages}</span>

                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                    className={`px-4 py-2 bg-blue-500 text-white rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    Next ➡️
                </button>
            </div>
            {loading && <p className="text-center mt-4">Loading...</p>}
        </div>
    )
}