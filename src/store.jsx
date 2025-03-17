import {create} from "zustand";
import {persist} from 'zustand/middleware'

const api = 'https://67d862da00348dd3e2a74f5e.mockapi.io/users/user'
const logMiddleware = (config) => (set, get, api) =>
    config(
        (args) => {
            console.log("🔹 State Update:", args);
            set(args);
        },
        get,
        api
    );

const useUserStore = create(
    logMiddleware(
        persist(
            (set, get) => ({
                users: [], // ✅ Ensure this is always an array
                loading: false,

                fetchUsers: async () => {
                    set({loading: true});

                    const response = await fetch(api);
                    const data = await response.json();

                    set({users: Array.isArray(data) ? data : [], loading: false}); // ✅ Ensure `data` is an array
                },

                addUser: async (newUser) => {
                    const response = await fetch(api, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(newUser),
                    });

                    const createdUser = await response.json();
                    set({users: [...get().users, createdUser]}); // ✅ Fix spreading issue
                },

                updateUser: async (id, updatedData) => {
                    const response = await fetch(`${api}/${id}`, { // ✅ Corrected URL
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(updatedData),
                    });

                    if (response.ok) {
                        const updatedUser = await response.json();
                        set({users: get().users.map(user => user.id === id ? updatedUser : user)});
                    } else {
                        console.error("❌ Error updating user", await response.text());
                    }
                },

                deleteUser: async (id) => {
                    const response = await fetch(`${api}/${id}`, { // ✅ Corrected URL
                        method: "DELETE",
                        headers: {"Content-Type": "application/json"},
                    });

                    if (response.ok) {
                        set({users: get().users.filter(user => user.id !== id)});
                    } else {
                        console.error("❌ Error deleting user", await response.text());
                    }
                }
            })
            , {name: "store"}))
);

export default useUserStore;