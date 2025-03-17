import useUserStore from "@/store.jsx";

function UserList() {
    const { fetchUsers, users, loading, removeUser } = useUserStore();

    return (
        <div>
            <button onClick={fetchUsers} className="p-2 bg-blue-500 text-white rounded">
                Fetch Users
            </button>

            {loading && <p>Loading...</p>}

            {users.map((user) => (
                <div key={user.id} className="p-2 border-b">
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <button onClick={() => removeUser(user.id)} className="text-red-500 text-sm">
                        ❌ Remove User
                    </button>
                </div>
            ))}
        </div>
    );
}
export default UserList;