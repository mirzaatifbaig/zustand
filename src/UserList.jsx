import useUserStore from "@/store.jsx";

export default function UserList() {
    const { users, addUser, updateUser, deleteUser } = useUserStore();

    return (
        <div className="p-4">
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() =>
                    addUser({ name: `User ${users.length + 1}`, email: "test@gmail.com" })
                }
            >
                ➕ Add User
            </button>

            {Array.isArray(users) && users.length > 0 ? (
                users.map((user) => (
                    <div key={user.id} className="p-4 bg-white shadow rounded mb-4">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p>{user.email}</p>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                onClick={() => updateUser(user.id, { name: "Updated Name" })}>
                            ✏️ Update
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded"
                                onClick={() => deleteUser(user.id)}>
                            🗑 Delete
                        </button>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No users found.</p> // ✅ Safe fallback
            )}

        </div>
    );
}
