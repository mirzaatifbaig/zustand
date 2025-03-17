import {create} from 'zustand';

const useUserStore = create((set, get) => ({
    users: [],
    fetchUsers: async () => {
        try {
            const response = await fetch('https://67d862da00348dd3e2a74f5e.mockapi.io/users/user');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            set({ users: data });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    },
    addUser: async (user) => {
        try {
            const response = await fetch('https://67d862da00348dd3e2a74f5e.mockapi.io/users/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            get().fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    },
    updateUser: async (userId, updatedUser) => {
        try {
            const response = await fetch(`https://67d862da00348dd3e2a74f5e.mockapi.io/users/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            get().fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    },
    deleteUser: async (userId) => {
        try {
            const response = await fetch(`https://67d862da00348dd3e2a74f5e.mockapi.io/users/user/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            get().fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    },
    startPolling: (interval) => {
        set({ pollingInterval: interval });
        get().pollUsers();
    },
    stopPolling: () => {
        if (get().pollingInterval) {
            clearInterval(get().pollingInterval);
            set({ pollingInterval: null });
        }
    },
    pollUsers: () => {
        get().fetchUsers();
        if (get().pollingInterval) {
            clearInterval(get().pollingInterval);
        }
        const intervalId = setInterval(get().fetchUsers, get().pollingInterval);
        set({ pollingInterval: intervalId });
    },
}));

export default useUserStore;
