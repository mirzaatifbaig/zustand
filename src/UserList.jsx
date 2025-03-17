import React, { useEffect, useState } from 'react';
import useUserStore from './store';

const UserList = () => {
    const { users, fetchUsers, addUser, updateUser, deleteUser, startPolling, stopPolling } = useUserStore();
    const [newUser, setNewUser] = useState('');
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        fetchUsers();
        startPolling(5000); // Poll every 5 seconds
        return () => stopPolling();
    }, []);

    const handleAddUser = () => {
        addUser({ name: newUser });
        setNewUser('');
    };

    const handleUpdateUser = (userId) => {
        updateUser(userId, { name: editingUser });
        setEditingUser(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User List</h1>
            <input
                type="text"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
                placeholder="Add new user"
                className="border p-2 mb-4"
            />
            <button onClick={handleAddUser} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add User
            </button>
            <ul>
                {users.map((user) => (
                    <li key={user.id} className="flex items-center mb-2">
                        {editingUser === user.id ? (
                            <input
                                type="text"
                                value={editingUser}
                                onChange={(e) => setEditingUser(e.target.value)}
                                className="border p-2 mr-2"
                            />
                        ) : (
                            <span className="mr-2">{user.name}</span>
                        )}
                        {editingUser === user.id ? (
                            <button onClick={() => handleUpdateUser(user.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                                Save
                            </button>
                        ) : (
                            <button onClick={() => setEditingUser(user.id)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                                Edit
                            </button>
                        )}
                        <button onClick={() => deleteUser(user.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
